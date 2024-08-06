import { RefObject } from "react";

export const slice = (text: string) => {
    if (text) {
        let str = text.slice(0, 5);
        str += " ... ";
        str += text.slice(text.length - 5, text.length);
        return str;
    }
}

export const LeaderSlice = (text: string) => {
    if (text) {
        let str = text.slice(0, 8);
        str += "...";
        str += text.slice(text.length - 6, text.length);
        return str;
    }
}

export const playAudio = (audioElementRef: RefObject<HTMLAudioElement>) => {
    if (audioElementRef && audioElementRef.current) {
        audioElementRef.current.play().catch((error) => {
            console.error("Error playing sound:", error);
        });
    }
};

export const stopAudio = (audioElementRef: RefObject<HTMLAudioElement>) => {
    if (audioElementRef && audioElementRef.current) {
        audioElementRef.current.pause();
    }
};