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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./calendar.css");
var misc_1 = require("./misc");
var CalendarCell = function (_a) {
    var _b, _c;
    var daysInPrevMonth = _a.daysInPrevMonth, daysInMonth = _a.daysInMonth, onPress = _a.onPress, idx = _a.idx, type = _a.type, daysBefore = _a.daysBefore, daysCurrent = _a.daysCurrent, length = _a.length, events = _a.events, currentMonth = _a.currentMonth, changeMonth = _a.changeMonth, labelColor = _a.labelColor, bgColor = _a.bgColor, 
    // size,
    showEventsOnClick = _a.showEventsOnClick
    //TODO: integrate category and legend colors
    //TODO: integrate event range
    ;
    var _d = (0, react_1.useState)(false), hover = _d[0], setHover = _d[1];
    var isSunday = ((_b = daysInMonth[idx - daysBefore]) === null || _b === void 0 ? void 0 : _b.getDay()) === 0;
    // const isMonday = daysInMonth[idx - daysBefore]?.getDay() === 1;
    var isSaturday = ((_c = daysInMonth[idx - daysBefore]) === null || _c === void 0 ? void 0 : _c.getDay()) === 6;
    // const beginningOfTheWeek = isMonday || idx === 0;
    var endOfTheWeek = isSunday || idx === length - 1;
    var newPrimEvents = [];
    var newSecEvents = [];
    var eventsInfo = [];
    var d = new Date();
    var isToday = idx - daysBefore + 1 === d.getDate() && currentMonth === d.getMonth()
        ? true
        : false;
    var primTitles = [];
    var secTitles = [];
    events.forEach(function (el) {
        // const _year = el.date.getFullYear();
        var month = new Date(el.date).getMonth();
        var day = new Date(el.date).getDate();
        if (month !== currentMonth)
            return;
        if (day === idx + 1 - daysBefore) {
            if (el.type === "primary") {
                newPrimEvents.push(el);
                primTitles.push(el.name);
            }
            else {
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
    return (react_1.default.createElement("div", { onMouseEnter: function () { return setHover(true); }, onMouseLeave: function () { return setHover(false); }, onClick: function () {
            return type === "_BEFORE_"
                ? changeMonth("_PREV_")
                : type === "_AFTER_"
                    ? changeMonth("_NEXT_")
                    : onPress(idx - daysBefore + 1, eventsInfo);
        }, title: __spreadArray(__spreadArray([], primTitles, true), secTitles, true).join("\n"), className: "calendarCell", style: {
            backgroundColor: isToday ? hover ? (0, misc_1.hexToRGB)(labelColor, .35) : (0, misc_1.hexToRGB)(labelColor, .2) : hover ? "rgba(0,0,0,.065)" : "white",
            cursor: ((newPrimEvents[0] !== undefined || newSecEvents[0] !== undefined) && showEventsOnClick) ? "pointer" : "default",
            borderRight: endOfTheWeek ? "solid ".concat(bgColor, " 1px") : "solid #eaeaea 1px",
            borderTop: idx < 7 ? "none" : "solid #eaeaea 1px",
        } },
        newPrimEvents[0] && (react_1.default.createElement("div", { style: { backgroundColor: newPrimEvents[0].color || labelColor }, className: "primaryIndex" })),
        type === "_BEFORE_" ? (react_1.default.createElement("p", { className: "irrelevantDate" }, idx + 1 - daysBefore + daysInPrevMonth)) : type === "_CURRENT_" ? (react_1.default.createElement("p", { style: { color: newPrimEvents.length > 0 ? bgColor : isSunday ? "#FF1818" : isSaturday ? "#6e6e6e" : "#222222" }, className: "calendarDate" }, idx + 1 - daysBefore)) : (type === "_AFTER_" && (react_1.default.createElement("p", { className: "irrelevantDate" }, idx + 1 - daysBefore - daysCurrent))),
        react_1.default.createElement("div", { className: "secondaryDiv" }, newSecEvents.map(function (secEvent, i) { return (react_1.default.createElement("div", { key: String(secEvent) + "_" + String(i), className: "secondaryIndex", style: {
                backgroundColor: secEvent.color || labelColor
            } })); }))));
};
exports.default = CalendarCell;
