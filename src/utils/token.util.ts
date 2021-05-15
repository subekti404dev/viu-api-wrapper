import HttpUtil from "./http.util";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import config from "../config";

class TokenUtil {
  static async getToken(): Promise<String> {
    const response = await HttpUtil.post(
      config.TokenUrl,
      { deviceId: "ebf11fa4-bbbb-4441-b462-4d74efd5ab1d" },
      { headers: { "x-client": "browser", "x-session-id": uuid() } }
    );
    return _.get(response, "token");
  }
}

export default TokenUtil;
