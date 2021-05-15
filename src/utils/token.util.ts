import HttpUtil from "./http.util";
import { v4 as uuid } from "uuid";
import _ from "lodash";

class TokenUtil {
  static async getToken(): Promise<String> {
    const url = `https://um.viuapi.io/user/identity?ver=1.0&fmt=json&aver=5.0&appver=2.0&appid=viu_desktop&platform=desktop&iid=ebf11fa4-bbbb-4441-b462-4d74efd5ab1d`;
    const response = await HttpUtil.post(
      url,
      { deviceId: "ebf11fa4-bbbb-4441-b462-4d74efd5ab1d" },
      { headers: { "x-client": "browser", "x-session-id": uuid() } }
    );
    return _.get(response, "token");
  }
}

export default TokenUtil;
