export const textColors = {
    "black": "text-black",
    "white": "text-white",
    "red": "text-red-600"
} as const;

export type TextColorType = keyof typeof textColors;