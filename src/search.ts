import HttpUtil from "./utils/http.util";
import TokenUtil from "./utils/token.util";
import _ from "lodash";
import ThumbUtil from "./utils/thumb.util";
import InterpolationUtil from "./utils/interpolation.util";
import config from "./config";
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
  thumbnail_2x3: string | null;
  thumbnail_16x9: string | null;
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
  public static async getData(keyword: string): Promise<SearchData> {
    const token = await TokenUtil.getToken();
    const url = InterpolationUtil.interpolate(config.SearchUrl, [
      encodeURIComponent(keyword),
      0,
      50,
    ]);
    const xml = await HttpUtil.get(url, {
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
        const tcid_2x3 = it.tcid_2x3 || it["tcid_1x1.5"] || it.tcid_2x3_t;
        const tcid_16x9 = it.tcid_16x9;

        item.push({
          id: it.id,
          title: it.title,
          description: it.description,
          type: it.type,
          subgenrename: it.subgenrename,
          language: it.language,
          thumbnail_2x3: ThumbUtil.tc(tcid_2x3),
          thumbnail_16x9: ThumbUtil.tc(tcid_16x9),
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

export default Search;
