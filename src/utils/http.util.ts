import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";

class HttpUtil {
  static async get(uri: string, config: AxiosRequestConfig = {}): Promise<any> {
    try {
      const response = await axios.get(uri, config);
      return response.data;
    } catch (error) {
      return this.catchError(error);
    }
  }

  static async post(
    uri: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<any> {
    try {
      const response = await axios.post(uri, data, config);
      return response.data;
    } catch (error) {
      return this.catchError(error);
    }
  }

  static catchError(err: any) {
    const errResp = _.get(err, "response.data");
    const apiError = _.get(errResp, "apierror.debugMessage");
    const errMsg = errResp
      ? `${_.get(errResp, "errorMessage")}. ${_.get(errResp, "requiredAction")}`
      : _.get(err, "message");
    throw new Error(apiError || errMsg);
  }
}

export default HttpUtil;
