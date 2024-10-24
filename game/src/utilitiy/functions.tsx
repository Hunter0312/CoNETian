export const slice = (text: string) => {
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

export const firstLetterUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};