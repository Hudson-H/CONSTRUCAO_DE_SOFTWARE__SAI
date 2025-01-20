export const textColors = {
    "black": "text-black",
    "white": "text-white"
} as const;

export type TextColorType = keyof typeof textColors;