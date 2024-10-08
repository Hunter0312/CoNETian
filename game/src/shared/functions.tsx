import { RefObject } from "react";
import { Partners } from "./earnTasks";

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
        let str = text.slice(0, 4);
        str += "...";
        str += text.slice(text.length - 4, text.length);
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

export const formatToken = (token: number) => {
    return (token * Math.pow(10, -18)).toFixed(6);
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const selectPartner = (categoryId: string) => {
    switch (categoryId) {
        case "mhaya":
            return Partners.mhaya;
        case "stability-world-ai":
            return Partners.stabilityAi;
        case "bearfi":
            return Partners.bearfi;
        case "tap-gear":
            return Partners.tapGear;
        default:
            return 1000;
    }
}