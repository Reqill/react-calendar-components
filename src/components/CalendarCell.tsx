import React, { useState } from "react";
import scssClasses from '../styles/calendar.module.scss';
import { hexToRGB } from './misc';
import { CellProps, Event } from './types';

const CalendarCell: React.FC<CellProps> = ({
    daysInPrevMonth, daysInMonth, onPress, idx, type, daysBefore, daysCurrent, length, events, currentMonth, changeMonth, labelColor, bgColor,
    // size,
    showEventsOnClick
    //TODO: integrate category and legend colors
    //TODO: integrate event range
}) => {
    const [hover, setHover] = useState(false);
    const isSunday = daysInMonth[idx - daysBefore]?.getDay() === 0;
    // const isMonday = daysInMonth[idx - daysBefore]?.getDay() === 1;
    const isSaturday = daysInMonth[idx - daysBefore]?.getDay() === 6;
    // const beginningOfTheWeek = isMonday || idx === 0;
    const endOfTheWeek = isSunday || idx === length - 1;
    const newPrimEvents: Array<Event> = [];
    const newSecEvents: Array<Event> = [];
    const eventsInfo: Array<Event | null | undefined> = [];
    const d = new Date();
    const isToday = idx - daysBefore + 1 === d.getDate() && currentMonth === d.getMonth()
        ? true
        : false;

    const primTitles: Array<string> = [];
    const secTitles: Array<string> = [];

    events.forEach((el) => {
        // const _year = el.date.getFullYear();
        const month = new Date(el.date).getMonth();
        const day = new Date(el.date).getDate();
        if (month !== currentMonth)
            return;
        if (day === idx + 1 - daysBefore) {
            if (el.type === "primary") {
                newPrimEvents.push(el);
                primTitles.push(el.name);
            } else {
                newSecEvents.push(el);
                secTitles.push(el.name);
            }
            // save all sInfo for current date
            eventsInfo.push(el);
        }
        // console.log(day)
    });

    if (isNaN(daysCurrent) || isNaN(daysInPrevMonth))
        return null;

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
                return type === "_BEFORE_"
                    ? changeMonth("_PREV_")
                    : type === "_AFTER_"
                        ? changeMonth("_NEXT_")
                        : onPress(idx - daysBefore + 1, eventsInfo);
            }}
            title={[...primTitles, ...secTitles].join("\n")}
            className={scssClasses.calendarCell}
            style={{
                backgroundColor: isToday ? hover ? hexToRGB(labelColor, .35) : hexToRGB(labelColor, .2) : hover ? "rgba(0,0,0,.065)" : "white",
                cursor: ((newPrimEvents[0] !== undefined || newSecEvents[0] !== undefined) && showEventsOnClick) ? "pointer" : "default",
                borderRight: endOfTheWeek ? `solid ${bgColor} 1px` : "solid #eaeaea 1px",
                borderTop: idx < 7 ? "none" : "solid #eaeaea 1px",
            }}
        >
            {newPrimEvents[0] && (
                <div
                    style={{ backgroundColor: newPrimEvents[0].color || labelColor }}
                    className={scssClasses.primaryIndex} />
            )}
            {type === "_BEFORE_" ? (
                <p className={scssClasses.irrelevantDate}>
                    {idx + 1 - daysBefore + daysInPrevMonth}
                </p>
            ) : type === "_CURRENT_" ? (
                <p
                    style={{ color: newPrimEvents.length > 0 ? bgColor : isSunday ? "#FF1818" : isSaturday ? "#6e6e6e" : "#222222" }}
                    className={scssClasses.calendarDate}
                >
                    {idx + 1 - daysBefore}
                </p>
            ) : (
                type === "_AFTER_" && (
                    <p className={scssClasses.irrelevantDate}>
                        {idx + 1 - daysBefore - daysCurrent}
                    </p>
                )
            )}
            <div className={scssClasses.secondaryDiv}>
                {newSecEvents.map((secEvent: Event, i) => (
                    <div key={String(secEvent) + "_" + String(i)}
                        className={scssClasses.secondaryIndex}
                        style={{
                            backgroundColor: secEvent.color || labelColor
                        }} />
                ))}
            </div>
        </div>
    );
};

export default CalendarCell;