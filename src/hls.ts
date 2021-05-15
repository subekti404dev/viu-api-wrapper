import HttpUtil from "./utils/http.util";
import TokenUtil from "./utils/token.util";
import XAuthToken from "./x-auth.token";

interface PlayUrlData {
  playUrl: string;
}

class HLS {
  private static url(id: string | number): string {
    return `https://drm-prod.viuing.io/video/v1/token/${id}?platform=app&compress=true&dynamic=true&appVer=1.1.2&carrierId=0`;
  }

  public static async getPlayUrl(id: string | number): Promise<PlayUrlData> {
    const token = await TokenUtil.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "X-AUTH-TOKEN": XAuthToken,
    };
    const data = await HttpUtil.get(this.url(id), { headers });
    return { playUrl: data.playUrl };
  }
}

// HLS.getPlayUrl("1165867599").then((data) => console.log(data));

export default HLS;
