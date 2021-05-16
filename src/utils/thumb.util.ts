import config from "../config";
import InterpolationUtil from "./interpolation.util";

class ThumbUtil {
  static generate(id: string | number): string | null {
    if (!id) return null;
    if (typeof id === "number") {
      id = id.toString();
    }
    return InterpolationUtil.interpolate(config.ThumbUrl, [id]);
  }
  static tc(id: string | number): string | null {
    if (!id) return null;
    if (typeof id === "number") {
      id = id.toString();
    }
    return InterpolationUtil.interpolate(config.TcUrl, [id]);
  }
}

export default ThumbUtil;
