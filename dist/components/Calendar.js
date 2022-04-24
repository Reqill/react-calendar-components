"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./calendar.css");
var misc_1 = require("./misc");
var react_feather_1 = require("react-feather");
var CalendarCell_1 = __importDefault(require("./CalendarCell"));
var MonthChangeBtn = function (_a) {
    // const [hover, setHover] = useState(false)
    var direction = _a.direction, callback = _a.callback, color = _a.color;
    if (direction === "LEFT") {
        return (react_1.default.createElement("div", { 
            // onMouseEnter={()=>setHover(true)}
            // onMouseLeave={()=>setHover(false)}
            onClick: function () { return callback("_PREV_"); }, className: "monthChangeBtn" },
            react_1.default.createElement(react_feather_1.ChevronLeft, { size: 18, color: color, strokeWidth: "2.5px", style: { margin: "auto", marginLeft: "-1px" } })));
    }
    else if (direction === "RIGHT") {
        return (react_1.default.createElement("div", { 
            // onMouseEnter={()=>setHover(true)}
            // onMouseLeave={()=>setHover(false)}
            onClick: function () { return callback("_NEXT_"); }, className: "monthChangeBtn" },
            react_1.default.createElement(react_feather_1.ChevronRight, { size: 18, color: color, strokeWidth: "2.5px", style: { margin: "auto", marginRight: "-1px" } })));
    }
    else
        return react_1.default.createElement(react_1.default.Fragment, null);
};
var Calendar = function (_a) {
    var _b = _a.events, events = _b === void 0 ? [] : _b, _c = _a.onMonthChange, onMonthChange = _c === void 0 ? function () { return null; } : _c, _d = _a.onYearChange, onYearChange = _d === void 0 ? function () { return null; } : _d, _e = _a.onClickDate, onClickDate = _e === void 0 ? function () { return null; } : _e, _f = _a.baseColors, baseColors = _f === void 0 ? [] : _f, //TODO
    _g = _a.startDate, //TODO
    startDate = _g === void 0 ? new Date() : _g, _h = _a.shadow, shadow = _h === void 0 ? true : _h, _j = _a.rounded, rounded = _j === void 0 ? false : _j, _k = _a.labelColor, labelColor = _k === void 0 ? "#009dff" : _k, _l = _a.bgColor, bgColor = _l === void 0 ? "#ffffff" : _l, _m = _a.headerColor, headerColor = _m === void 0 ? "#FFF" : _m, _o = _a.showEventsOnClick, showEventsOnClick = _o === void 0 ? false : _o, _p = _a.size // TODO add xs xl
    , size = _p === void 0 ? "md" : _p // TODO add xs xl
    ;
    var _q = (0, react_1.useState)(startDate.getMonth()), currentMonth = _q[0], setCurrMonth = _q[1];
    var _r = (0, react_1.useState)(startDate.getFullYear()), currentYear = _r[0], setCurrYear = _r[1];
    var _s = (0, react_1.useState)([]), daysInMonth = _s[0], setDaysInMonth = _s[1];
    var _t = (0, react_1.useState)([]), daysInPrevMonth = _t[0], setDaysInPrevMonth = _t[1];
    var _u = (0, react_1.useState)([]), previewData = _u[0], setPreviewData = _u[1];
    var FONT_SIZE = size === "sm" ? ".85em" : size === "lg" ? "1.1em" : "1em";
    var MAX_WIDTH = size === "sm" ? "350px" : size === "lg" ? "500px" : "400px";
    (0, react_1.useEffect)(function () {
        // Previous month
        if (currentMonth === 0) {
            setDaysInPrevMonth((0, misc_1.getDaysInMonth)(11, currentYear - 1));
        }
        else {
            setDaysInPrevMonth((0, misc_1.getDaysInMonth)(currentMonth - 1, currentYear));
        }
        // // Next month
        // if (currentMonth === 11) {
        //   setDaysInNextMonth(getDaysInMonth(0, currentYear + 1));
        // } else {
        //   setDaysInNextMonth(getDaysInMonth(currentMonth + 1, currentYear));
        // }
        setPreviewData([]);
        setDaysInMonth((0, misc_1.getDaysInMonth)(currentMonth, currentYear));
        onMonthChange(currentMonth + 1);
    }, [currentMonth]);
    (0, react_1.useEffect)(function () {
        onYearChange(currentYear);
    }, [currentYear]);
    var _clickAction = function (day, eventsInfo) {
        onClickDate({
            day: day,
            month: currentMonth,
            year: currentYear,
            eventsInfo: eventsInfo,
        });
        if (showEventsOnClick) {
            setPreviewData(eventsInfo);
        }
    };
    var _setDateToday = function () {
        var td = new Date();
        setCurrMonth(td.getMonth());
        setCurrYear(td.getFullYear());
    };
    var _generateHeader = function () {
        return misc_1.WEEKDAYS.map(function (el) { return (react_1.default.createElement("div", { key: "".concat(el, "_header"), className: "headerBox" },
            react_1.default.createElement("p", { className: "headerText" }, el.substring(0, 3)))); });
    };
    var _generateDay = function () {
        var _a;
        // Day of the week of the first day of the month
        var daysBefore = (((_a = daysInMonth[0]) === null || _a === void 0 ? void 0 : _a.getDay()) + 6) % 7;
        // 6 - day of the week of the last day of the month
        var shortDays = [];
        misc_1.WEEKDAYS.forEach(function (el, i) { return shortDays[i] = el.substring(0, 3); });
        var daysAfter = 6 - shortDays.indexOf(String(daysInMonth[daysInMonth.length - 1]).substring(0, 3));
        var renderArray = [];
        for (var i = 0; i < daysBefore; i++) {
            renderArray.push("_BEFORE_");
        }
        for (var _i = 0, daysInMonth_1 = daysInMonth; _i < daysInMonth_1.length; _i++) {
            var _ = daysInMonth_1[_i];
            renderArray.push("_CURRENT_");
        }
        for (var i = 0; i < daysAfter; i++) {
            renderArray.push("_AFTER_");
        }
        return renderArray.map(function (el, idx) { return (react_1.default.createElement(CalendarCell_1.default, { baseColors: baseColors, onPress: _clickAction, changeMonth: _changeMonth, events: events, key: "day" + idx, type: el, currentMonth: currentMonth, idx: idx, daysInMonth: daysInMonth, length: renderArray.length, daysBefore: daysBefore, daysCurrent: renderArray.length - (daysBefore + daysAfter), daysInPrevMonth: daysInPrevMonth.length, showEventsOnClick: showEventsOnClick, labelColor: labelColor, bgColor: bgColor, size: size })); });
    };
    var _changeMonth = function (typeOfChange) {
        if (typeOfChange === "_PREV_") {
            if (currentMonth === 0) {
                setCurrMonth(11);
                setCurrYear(currentYear - 1);
            }
            else {
                setCurrMonth(currentMonth - 1);
            }
        }
        else if (typeOfChange === "_NEXT_") {
            if (currentMonth === 11) {
                setCurrMonth(0);
                setCurrYear(currentYear + 1);
            }
            else {
                setCurrMonth(currentMonth + 1);
            }
        }
    };
    var generatePreview = function (data) {
        if (data[0] === undefined)
            return react_1.default.createElement(react_1.default.Fragment, null);
        return data.map(function (el, i) {
            return react_1.default.createElement("div", { key: String(el.name) + "_" + String(i), style: { display: "flex", flexDirection: "column", marginBottom: ".4rem", marginTop: ".5rem" } },
                react_1.default.createElement("div", { style: { display: "inline-flex", justifyContent: "space-between" } },
                    react_1.default.createElement("p", { className: "eventTitle" }, el.name),
                    el.hour &&
                        react_1.default.createElement("p", { style: { margin: "0", padding: "0", fontSize: "1rem", color: "#aaaaaa", fontWeight: 300 } },
                            el.hour,
                            " ",
                            el.endHour && react_1.default.createElement("span", null,
                                "\u00A0\u2013\u00A0",
                                el.endHour))),
                el.description &&
                    react_1.default.createElement("p", { className: "eventDescription" }, el.description));
        });
    };
    return (react_1.default.createElement("div", { style: { margin: ".5rem", maxWidth: MAX_WIDTH, minWidth: "300px", width: "100%", fontSize: FONT_SIZE } },
        react_1.default.createElement("div", { className: "outside", style: { boxShadow: shadow ? "0 7px 15px rgba(0, 0, 0, .05)" : "0 0 0 rgba(141, 113, 0, .0)", borderRadius: rounded ? "1rem" : "0" } },
            react_1.default.createElement("div", { style: { borderTopLeftRadius: rounded ? "1rem" : "0", borderTopRightRadius: rounded ? "1rem" : "0", backgroundColor: labelColor }, className: "topBar" },
                react_1.default.createElement(MonthChangeBtn, { direction: "LEFT", callback: _changeMonth, color: headerColor }),
                react_1.default.createElement("p", { style: { color: headerColor }, className: "monthIndicator", onClick: function () { return _setDateToday(); } },
                    misc_1.MONTHS[currentMonth].toUpperCase(),
                    "\u00A0",
                    currentYear),
                react_1.default.createElement(MonthChangeBtn, { direction: "RIGHT", callback: _changeMonth, color: headerColor })),
            react_1.default.createElement("div", { style: {
                    borderBottomLeftRadius: (rounded && previewData[0] === undefined) ? "1rem" : "0",
                    borderBottomRightRadius: (rounded && previewData[0] === undefined) ? "1rem" : "0",
                    backgroundColor: bgColor,
                    paddingBottom: rounded ? "1.1rem" : ".5rem",
                    paddingLeft: rounded ? "1.1rem" : ".5rem",
                    paddingRight: rounded ? "1.1rem" : ".5rem",
                    paddingTop: "1.1rem"
                } },
                react_1.default.createElement("div", { className: "sevenGrid" }, _generateHeader()),
                react_1.default.createElement("div", { className: "sevenGrid" }, _generateDay())),
            previewData[0] &&
                react_1.default.createElement("div", { style: {
                        backgroundColor: bgColor,
                        padding: rounded ? "1.1rem 1.5rem" : ".5rem .75rem",
                        marginTop: rounded ? "0rem" : ".2rem",
                        paddingTop: rounded ? ".4rem" : ".2rem",
                        paddingBottom: rounded ? ".8em" : ".4rem",
                        borderBottomLeftRadius: rounded ? "1rem" : "0",
                        borderBottomRightRadius: rounded ? "1rem" : "0",
                        width: "auto",
                        borderTop: "dashed ".concat((0, misc_1.hexToRGB)(labelColor, .5), " 1px")
                    } }, generatePreview(previewData)))));
};
exports.default = Calendar;
