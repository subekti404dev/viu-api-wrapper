import HttpUtil from "./utils/http.util";
import TokenUtil from "./utils/token.util";
import ThumbUtil from "./utils/thumb.util";
import _ from "lodash";
import InterpolationUtil from "./utils/interpolation.util";
import config from "./config";

interface Main {
  title: string;
  description: string;
  thumbnail: string | null;
  director: string;
  tags: string;
  year_of_release: number;
  actor?: string;
  actress?: string;
  is_tvshow: boolean;
}

interface Item {
  id: number;
  title: string;
  description: string;
  display_title: string;
  duration: number;
  thumbnail: string | null;
}

interface DetailData {
  main: Main;
  item: Item[];
}

class Detail {
  private static url(id: string | number, start = 0, limit = 100) {
    if (typeof id === "number") {
      id = id.toString();
    }
    let type = "clip";
    if (id.startsWith("playlist")) {
      type = "container";
    }
    return InterpolationUtil.interpolate(config.DetailUrl, [
      type,
      id,
      start,
      limit,
    ]);
  }

  public static async getData(
    id: string | number,
    start = 0,
    limit = 100
  ): Promise<DetailData> {
    try {
      if (typeof id === "number") {
        id = id.toString();
      }
      const isPlaylist = id.startsWith("playlist");
      const token = await TokenUtil.getToken();
      const response = await HttpUtil.get(this.url(id, start, limit), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = isPlaylist
        ? _.get(response, "response.container")
        : _.get(response, "response.item[0]");
      const tmpItem = isPlaylist
        ? _.get(response, "response.container.item")
        : _.get(response, "response.item");
      const main = {
        title: data["title"],
        description: data["description"],
        thumbnail: isPlaylist
          ? ThumbUtil.generate(_.get(tmpItem, "[0].id"))
          : ThumbUtil.generate(_.get(data, "id")),
        director: _.get(tmpItem, "[0].director"),
        tags: _.get(tmpItem, "[0].tags"),
        year_of_release: _.get(tmpItem, "[0].year_of_release"),
        actor: _.get(tmpItem, "[0].actor"),
        actress: _.get(tmpItem, "[0].actress"),
        is_tvshow: isPlaylist,
      };
      const item = [];
      for (const it of tmpItem) {
        if (it.id) {
          item.push({
            id: it["id"],
            title: it["title"],
            description: it["description"],
            display_title: it["display_title"],
            duration: it["duration"],
            thumbnail: ThumbUtil.generate(it["id"]),
          });
        }
      }
      return { main, item };
    } catch (error) {
      throw error;
    }
  }
}

export default Detail;
