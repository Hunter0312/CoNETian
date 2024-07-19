export const slice = (text: string) => {
    if (text) {
        let str = text.slice(0, 5);
        str += " ... ";
        str += text.slice(text.length - 5, text.length);
        return str;
    }
}