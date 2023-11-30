import { atom } from "jotai";

// 아톰 생성

export const canvasAtom = atom<fabric.Canvas | null>(null);

export const activeObjectAtom = atom<fabric.Object | null | undefined>(null);

export const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5n-Caax7oB1_ZxS19FqRIfBvhpEpUjwPC2tN2WspR3g&s",
  "data:image/png;base64,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",
  "data:image/png;base64,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",
];

export const answerListAtom = atom<string[]>([]);

export const canvasSavePointAtom = atom<(fabric.Canvas | null)[]>([]);

export const answer = 2;

// export const answerList = atom<fabric.Canvas
