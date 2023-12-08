import { atom } from "jotai";

/** 로그인 여부 */
export const isLoginAtom = atom<boolean>(false);

/** 선택된 프로젝트 */
export const selectedProjectAtom = atom<string>("");
