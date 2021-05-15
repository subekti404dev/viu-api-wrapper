class InterpolationUtil {
  static interpolate(source: string, args: (string | number)[]): string {
    for (let i = 0; i < args.length; i++) {
      let arg = args[i];
      if (typeof(arg) === 'number') arg = arg.toString();
      source = source.replace(`:${i}:`, arg);
    }
    return source;
  }
}

export default InterpolationUtil;
