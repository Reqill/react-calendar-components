import { HEX } from "./types";
export declare const WEEKDAYS: string[];
export declare const MONTHS: string[];
export declare const getDaysInMonth: (month: number, year: number) => Date[];
export declare const addAlpha: (color: string, opacity: number) => string;
export declare const hexToRGB: (hex: HEX, alpha: number) => string;
export declare const lightenDarkenColor: (col: string, amt: number) => string;
