import { create } from "zustand";

export interface TextRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface LuminousTextItem {
  id: string;
  text: string;
  rect: TextRect;
  fontSize: number;
  fontWeight: number | string;
  letterSpacing: number;
  opacity: number;
  fontFamily: string;
}

interface TypographyState {
  texts: Record<string, LuminousTextItem>;
  registerText: (item: LuminousTextItem) => void;
  updateTextRect: (id: string, rect: TextRect, opacity: number) => void;
  unregisterText: (id: string) => void;
}

export const useTypographyStore = create<TypographyState>((set) => ({
  texts: {},

  registerText: (item) =>
    set((state) => ({
      texts: { ...state.texts, [item.id]: item },
    })),

  updateTextRect: (id, rect, opacity) =>
    set((state) => {
      const existing = state.texts[id];
      if (!existing) return state;
      return {
        texts: {
          ...state.texts,
          [id]: { ...existing, rect, opacity },
        },
      };
    }),

  unregisterText: (id) =>
    set((state) => {
      const newTexts = { ...state.texts };
      delete newTexts[id];
      return { texts: newTexts };
    }),
}));
