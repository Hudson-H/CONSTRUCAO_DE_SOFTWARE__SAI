export const textSizes = {
    "sm": "text-xs",
    "base": "text-base",
    "xl": "text-3xl"
} as const;

export type TextSizeType = keyof typeof textSizes;