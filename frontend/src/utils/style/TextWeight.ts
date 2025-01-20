export const textWeights = {
    "extra-light": "font-extralight",
    "light": "font-light",
    "normal": "font-normal",
    "medium": "font-medium",
    "semi-bold": "font-semibold",
    "bold": "font-bold",
    "extra-bold": "font-extrabold",
    "black": "font-black",
} as const;

export type TextWeightType = keyof typeof textWeights;