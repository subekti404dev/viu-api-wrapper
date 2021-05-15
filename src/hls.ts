import HttpUtil from "./utils/http.util";
import TokenUtil from "./utils/token.util";
import Config from "./config";
import InterpolationUtil from "./utils/interpolation.util";
import config from "./config";

interface PlayUrlData {
  playUrl: string;
}

class HLS {
  public static async getPlayUrl(id: string | number): Promise<PlayUrlData> {
    const token = await TokenUtil.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "X-AUTH-TOKEN": Config.XAuthToken,
    };
    const url = InterpolationUtil.interpolate(config.HLSUrl, [id]);
    const data = await HttpUtil.get(url, { headers });
    return { playUrl: data.playUrl };
  }
}

export default HLS;
