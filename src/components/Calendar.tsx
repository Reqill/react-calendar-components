import React, { useState, useEffect } from "react";
import cssClasses from '../styles/calendar.module.css';
import { WEEKDAYS, MONTHS, getDaysInMonth, hexToRGB } from './misc';
import { CalendarProps, Color, Event } from './types'
import CalendarCell from "./CalendarCell";


const MonthChangeBtn: React.FC<{ direction: "LEFT" | "RIGHT", callback: (x: any) => void, color: Color }> = ({ direction, callback, color }) => {
    // const [hover, setHover] = useState(false)

    if (direction === "LEFT") {
        return (
            <div
                // onMouseEnter={()=>setHover(true)}
                // onMouseLeave={()=>setHover(false)}
                onClick={() => callback("_PREV_")}
                style={{ color: color }}
                className={cssClasses.monthChangeBtn}
            >
                {"<"}
                {/* <ChevronLeft
                    size={18}
                    color={color}
                    strokeWidth="2.5px"
                    style={{ margin: "auto", marginLeft: "-1px" }}
                /> */}
            </div>
        );
    } else if (direction === "RIGHT") {
        return (
            <div
                // onMouseEnter={()=>setHover(true)}
                // onMouseLeave={()=>setHover(false)}
                onClick={() => callback("_NEXT_")}
                style={{ color: color }}
                className={cssClasses.monthChangeBtn}
            >
                {">"}
                {/* <ChevronRight
                    size={18}
                    color={color}
                    strokeWidth="2.5px"
                    style={{ margin: "auto", marginRight: "-1px" }}
                /> */}
            </div>
        );
    } else return <></>

}

const Calendar: React.FC<CalendarProps> = ({
    events = [],
    onMonthChange = () => null,
    onYearChange = () => null,
    onClickDate = () => null,
    baseColors = [], //TODO
    startDate = new Date(),
    shadow = true,
    rounded = false,
    labelColor = "#009dff",
    bgColor = "#ffffff",
    headerColor = "#FFF",
    showEventsOnClick = false,
    size = "md" // TODO add xs xl
}): JSX.Element => {
    const [currentMonth, setCurrMonth] = useState<number>(startDate.getMonth());
    const [currentYear, setCurrYear] = useState<number>(startDate.getFullYear());
    const [daysInMonth, setDaysInMonth] = useState<Array<Date>>([]);
    const [daysInPrevMonth, setDaysInPrevMonth] = useState<Array<Date>>([]);
    const [previewData, setPreviewData] = useState<Array<Event | null | undefined>>([])
    const FONT_SIZE = size === "sm" ? ".85em" : size === "lg" ? "1.1em" : "1em"
    const MAX_WIDTH = size === "sm" ? "350px" : size === "lg" ? "500px" : "400px"

    useEffect(() => {
        // Previous month
        if (currentMonth === 0) {
            setDaysInPrevMonth(getDaysInMonth(11, currentYear - 1));
        } else {
            setDaysInPrevMonth(getDaysInMonth(currentMonth - 1, currentYear));
        }
        // // Next month
        // if (currentMonth === 11) {
        //   setDaysInNextMonth(getDaysInMonth(0, currentYear + 1));
        // } else {
        //   setDaysInNextMonth(getDaysInMonth(currentMonth + 1, currentYear));
        // }
        setPreviewData([])
        setDaysInMonth(getDaysInMonth(currentMonth, currentYear));
        onMonthChange(currentMonth + 1);
    }, [currentMonth]);

    useEffect(() => {
        onYearChange(currentYear);
    }, [currentYear]);

    const _clickAction = (day: number, eventsInfo: Array<Event | null | undefined>) => {
        onClickDate({
            day: day,
            month: currentMonth,
            year: currentYear,
            eventsInfo,
        });
        if (showEventsOnClick) {
            setPreviewData(eventsInfo)
        }
    };

    const _setDateToday = () => {
        let td: Date = new Date();
        setCurrMonth(td.getMonth());
        setCurrYear(td.getFullYear());
    };

    const _generateHeader = () => {
        return WEEKDAYS.map((el) => (
            <div
                key={`${el}_header`}
                className={cssClasses.headerBox}
            >
                <p className={cssClasses.headerText}>
                    {el.substring(0, 3)}
                </p>
            </div>
        ));
    };

    const _generateDay = () => {
        // Day of the week of the first day of the month
        const daysBefore: number = (daysInMonth[0]?.getDay() + 6) % 7;
        // 6 - day of the week of the last day of the month
        let shortDays: Array<string> = []
        WEEKDAYS.forEach((el, i) => shortDays[i] = el.substring(0, 3))
        const daysAfter: number = 6 - shortDays.indexOf(String(daysInMonth[daysInMonth.length - 1]).substring(0, 3));

        let renderArray: Array<"_BEFORE_" | "_CURRENT_" | "_AFTER_"> = [];

        for (let i = 0; i < daysBefore; i++) {
            renderArray.push("_BEFORE_");
        }
        for (const _ of daysInMonth) {
            renderArray.push("_CURRENT_");
        }
        for (let i = 0; i < daysAfter; i++) {
            renderArray.push("_AFTER_");
        }

        return renderArray.map((el, idx) => (
            <CalendarCell
                baseColors={baseColors}
                onPress={_clickAction}
                changeMonth={_changeMonth}
                events={events}
                key={"day" + idx}
                type={el}
                currentMonth={currentMonth}
                idx={idx}
                daysInMonth={daysInMonth}
                length={renderArray.length}
                daysBefore={daysBefore}
                daysCurrent={renderArray.length - (daysBefore + daysAfter)}
                daysInPrevMonth={daysInPrevMonth.length}
                showEventsOnClick={showEventsOnClick}
                labelColor={labelColor}
                bgColor={bgColor}
                size={size}
            />
        ));
    };

    const _changeMonth = (typeOfChange: "_PREV_" | "_NEXT_") => {
        if (typeOfChange === "_PREV_") {
            if (currentMonth === 0) {
                setCurrMonth(11);
                setCurrYear(currentYear - 1);
            } else {
                setCurrMonth(currentMonth - 1);
            }
        } else if (typeOfChange === "_NEXT_") {
            if (currentMonth === 11) {
                setCurrMonth(0);
                setCurrYear(currentYear + 1);
            } else {
                setCurrMonth(currentMonth + 1);
            }
        }
    };

    const generatePreview = (data: Array<any>) => {
        if (data[0] === undefined) return <></>;
        return data.map((el: Event, i: number) =>
            <div key={String(el.name) + "_" + String(i)} style={{ display: "flex", flexDirection: "column", marginBottom: ".4rem", marginTop: ".5rem" }}>
                <div style={{ display: "inline-flex", justifyContent: "space-between" }}>
                    <p className={cssClasses.eventTitle}>
                        {el.name}
                    </p>
                    {
                        el.hour &&
                        <p style={{ margin: "0", padding: "0", fontSize: "1rem", color: "#aaaaaa", fontWeight: 300 }}>
                            {el.hour} {el.endHour && <span>&nbsp;–&nbsp;{el.endHour}</span>}
                        </p>
                    }
                </div>
                {
                    el.description &&
                    <p className={cssClasses.eventDescription}>
                        {el.description}
                    </p>
                }
            </div>
        );
    }

    return (
        <div style={{ margin: ".5rem", maxWidth: MAX_WIDTH, minWidth: "300px", width: "100%", fontSize: FONT_SIZE }}>
            <div className={cssClasses.outside} style={{ boxShadow: shadow ? "0 7px 15px rgba(0, 0, 0, .05)" : "0 0 0 rgba(141, 113, 0, .0)", borderRadius: rounded ? "1rem" : "0" }}>
                <div style={{ borderTopLeftRadius: rounded ? "1rem" : "0", borderTopRightRadius: rounded ? "1rem" : "0", backgroundColor: labelColor }} className={cssClasses.topBar}>
                    <MonthChangeBtn direction="LEFT" callback={_changeMonth} color={headerColor} />
                    <p
                        style={{ color: headerColor }}
                        className={cssClasses.monthIndicator}
                        onClick={() => _setDateToday()}
                    >
                        {MONTHS[currentMonth].toUpperCase()}&nbsp;{currentYear}
                    </p>
                    <MonthChangeBtn direction="RIGHT" callback={_changeMonth} color={headerColor} />
                </div>
                <div
                    style={{
                        borderBottomLeftRadius: (rounded && previewData[0] === undefined) ? "1rem" : "0",
                        borderBottomRightRadius: (rounded && previewData[0] === undefined) ? "1rem" : "0",
                        backgroundColor: bgColor,
                        paddingBottom: rounded ? "1.1rem" : ".5rem",
                        paddingLeft: rounded ? "1.1rem" : ".5rem",
                        paddingRight: rounded ? "1.1rem" : ".5rem",
                        paddingTop: "1.1rem"
                    }}
                >
                    <div className={cssClasses.sevenGrid}>{_generateHeader()}</div>
                    <div className={cssClasses.sevenGrid}>{_generateDay()}</div>
                </div>
                {
                    previewData[0] &&
                    <div
                        style={{
                            backgroundColor: bgColor,
                            padding: rounded ? "1.1rem 1.5rem" : ".5rem .75rem",
                            marginTop: rounded ? "0rem" : ".2rem",
                            paddingTop: rounded ? ".4rem" : ".2rem",
                            paddingBottom: rounded ? ".8em" : ".4rem",
                            borderBottomLeftRadius: rounded ? "1rem" : "0",
                            borderBottomRightRadius: rounded ? "1rem" : "0",
                            width: "auto",
                            borderTop: `dashed ${hexToRGB(labelColor, .5)} 1px`
                        }}
                    >
                        {generatePreview(previewData)}
                    </div>
                }
            </div>
        </div>

    );
};

export default Calendar;