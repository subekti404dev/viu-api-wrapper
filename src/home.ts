import _ from "lodash";
import HttpUtil from "./utils/http.util";
import ThumbUtil from "./utils/thumb.util";
import TokenUtil from "./utils/token.util";
import Config from "./config";
import InterpolationUtil from "./utils/interpolation.util";

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
  public static async getData(page: number = 1): Promise<HomeData> {
    const token = await TokenUtil.getToken();
    const url = InterpolationUtil.interpolate(Config.HomeUrl, [page]);
    const result = await HttpUtil.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": Config.XAuthToken,
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

export default Home;
