const key = `__ID__`;
const uri = `https://vuclipi-a.akamaihd.net/p/cloudinary/h_171,w_304,dpr_1.5,f_auto,c_thumb,q_auto:low/${key}/d-1`;
const tc_uri = `https://vuclip-eip-th.akamaized.net/p/ttwebp540x800/d-1/${key}.webp`;

class ThumbUtil {
  static generate(id: string | number): string {
    if (typeof id === "number") {
      id = id.toString();
    }
    return uri.replace(key, id);
  }
  static tc(id: string | number): string {
    if (typeof id === "number") {
      id = id.toString();
    }
    return tc_uri.replace(key, id);
  }
}

export default ThumbUtil;
