export declare type RGB = `rgb(${number}, ${number}, ${number})`;
export declare type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export declare type HEX = `#${string}`;
export declare type Color = HEX;
export interface CalendarProps {
    events?: Array<Event>;
    onMonthChange?: (data: number) => void;
    onYearChange?: (data: number) => void;
    onClickDate?: (data: DateInfo) => void;
    baseColors?: Array<BaseColor>;
    startDate?: Date;
    shadow?: Boolean;
    rounded?: Boolean;
    bgColor?: Color;
    labelColor?: Color;
    headerColor?: Color;
    showEventsOnClick?: Boolean;
    size?: "sm" | "md" | "lg";
}
export interface BaseColor {
    category: string;
    color: Color;
}
export interface DateInfo {
    day: number;
    month: number;
    year: number;
    eventsInfo: Array<Event | null | undefined>;
}
export interface Event {
    id: string;
    name: string;
    date: string;
    category?: string;
    endDate?: string;
    hour?: string;
    endHour?: string;
    description?: string;
    type?: "primary" | "secondary";
    color?: Color;
}
export interface CellProps {
    daysInPrevMonth: number;
    baseColors: Array<BaseColor>;
    daysInMonth: Array<Date>;
    onPress: (day: number, eventsInfo: Array<Event | null | undefined>) => void;
    idx: number;
    type: "_BEFORE_" | "_CURRENT_" | "_AFTER_";
    daysBefore: number;
    daysCurrent: number;
    length: number;
    events: Array<Event>;
    currentMonth: number;
    changeMonth: (typeOfChange: "_PREV_" | "_NEXT_") => void;
    showEventsOnClick: Boolean;
    bgColor: Color;
    labelColor: Color;
    size: "sm" | "md" | "lg";
}
