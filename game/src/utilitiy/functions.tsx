export const hideMiddleOfString = (text: string) => {
  if (text) {
    let str = text.slice(0, 4);
    str += "...";
    str += text.slice(text.length - 4, text.length);
    return str;
  }
};

export const formatToken = (token: number) => {
  return (token * Math.pow(10, -18)).toFixed(6);
};
