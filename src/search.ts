import HttpUtil from "./utils/http.util";
import TokenUtil from "./utils/token.util";
import _ from "lodash";
import ThumbUtil from "./utils/thumb.util";
const XmlParser = require("xml2js").parseString;
const Xml2Json = async (xml: string) => {
  return new Promise((resolve, reject) => {
    XmlParser(
      xml,
      { mergeAttrs: true, explicitArray: false },
      (err: any, result: any) => {
        if (err) reject(err);
        if (!err) resolve(result);
      }
    );
  });
};

interface Item {
  id: string;
  title: string;
  description: string;
  type: string;
  subgenrename: string;
  language: string;
  thumbnail: string;
  total: string;
  year_of_release: string;
  tagtext: string;
}

interface Container {
  id: number;
  containertype: string;
  slug: string;
  title: string;
  description?: string;
  contenttype: string;
  total: number;
  item: Item[];
}
interface SearchData {
  container: Container[];
}

class Search {
  private static url(keyword: string, start: number = 0, limit: number = 50) {
    keyword = encodeURIComponent(keyword);
    return `https://prod-in.viu.com/api/search/extsearch?keyword=${keyword}&start=${start}&limit=${limit}&carrierid=0&appid=viu_android&appver=1.1.2&auto_populate=false&ccode=ID&compressed=true&contentPrivilege=PREMIUM_GRANTED&countryCode=ID&devicecountry=&devicetimezone=&geo=10&iid=a6ef4f72d9bae72c&languageid=id&platform=app&regionid=all&userid=5a4b6e86-17d7-430c-8c8d-8115b8e44f3c&ver=1.0&vuserid=5a4b6e86-17d7-430c-8c8d-8115b8e44f3c`;
  }

  public static async getData(keyword: string): Promise<SearchData> {
    const token = await TokenUtil.getToken();
    const xml = await HttpUtil.get(this.url(keyword), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await Xml2Json(xml);
    let container = _.get(json, "response.container");
    if (!Array.isArray(container)) container = [container];

    for (const c of container) {
      c.id = parseInt(c.id);
      c.total = parseInt(c.total);

      delete c.n;
      delete c.start;

      if (!Array.isArray(c.item)) c.item = [c.item];
      const item: Item[] = [];
      for (const it of c.item) {
        const tcid_2x3 = it.tcid_2x3 || it["tcid_1x1.5"];
        item.push({
          id: it.id,
          title: it.title,
          description: it.description,
          type: it.type,
          subgenrename: it.subgenrename,
          language: it.language,
          thumbnail: ThumbUtil.tc(tcid_2x3),
          total: it.total,
          year_of_release: it.year_of_release,
          tagtext: it.tagtext,
        });
      }
      c.item = item;
    }

    return { container };
  }
}

// Search.getData("taxi driver").then((data) => console.log(data.container[0].item));

export default Search;
