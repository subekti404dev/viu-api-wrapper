import _ from "lodash";
import HttpUtil from "./utils/http.util";
import ThumbUtil from "./utils/thumb.util";
import TokenUtil from "./utils/token.util";
import XAuthToken from "./x-auth.token";

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
  containertype: string;
  item: Item[];
  title: string;
  description?: string;
  type: string;
  slug: string;
  contenttype: string;
}

export interface HomeData {
  container: Container[];
  total: number;
  pageNo: number;
  totalPages: number;
}

class Home {
  private static url(page: number = 1) {
    return `https://homepage.viuing.io/homepage/v1/pages/${page}?pageId=a721169792a48d58fdef2c1dd46d4d1c.id.default&pageKey=id.app.all&versionName=1.1.2&appid=viu_android&platform=app&format=json&user_new=false&user_geo=10&user_ccode=ID&user_content_preference=all&user_segment=10&app_lang=id&url=https%3A%2F%2Fd2405b0jymm2dk.cloudfront.net%2Fprogram%2Fprod%2Fa721169792a48d58fdef2c1dd46d4d1c%2F1621012386628%2Fid%2Fdefault%2F`;
  }

  public static async getData(page: number = 1): Promise<HomeData> {
    const token = await TokenUtil.getToken();
    const result = await HttpUtil.get(this.url(page), {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": XAuthToken,
      },
    });
    for (const container of _.get(result, "container", [])) {
      const item: Item[] = [];
      for (const it of _.get(container, "item", [])) {
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
      container.item = item;
      delete container.original_row_pos;
      delete container.logic;
      delete container.slug;
      delete container.id;
    }
    result["total"] = parseInt(result["total"]);
    result["pageNo"] = parseInt(result["pageNo"]);
    result["totalPages"] = parseInt(result["totalPages"]);
    delete result.pageKey;
    delete result.pageId;
    delete result.fallback;

    return result;
  }
}

// Home.getData()
//   .then((data) => {
//     console.log(data.container[0].item);
//   })
//   .catch(console.log);

export default Home;
