import { atom } from "jotai";

// 아톰 생성
export const canvasAtom = atom<fabric.Canvas | null>(null);
