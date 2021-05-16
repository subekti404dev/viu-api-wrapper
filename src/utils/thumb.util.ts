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
  static tc(id: string | number, type: '2x3' | '16x9' = '2x3'): string | null {
    const height = 450;
    let width = 0;
    if (type === '2x3') {
      width = 2/3 * height;
    }
    if (type === '16x9') {
      width = 16/9 * height;
    }
    if (!id) return null;
    if (typeof id === "number") {
      id = id.toString();
    }
    return InterpolationUtil.interpolate(config.TcUrl, [id, width, height]);
  }
}

export default ThumbUtil;
