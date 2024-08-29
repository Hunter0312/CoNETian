export const slice = (text: string) => {
  if (text) {
    let str = text.slice(0, 8);
    str += "...";
    str += text.slice(text.length - 5, text.length);
    return str;
  }
};

export const formatToken = (token: number) => {
  return (token * Math.pow(10, -18)).toFixed(6);
};
