
# react-calendar-components

Library containing UI calendar components with devent display. (date w/range picker will be added in future versions) 


### Installation

```bash
  yarn add react-calendar-components
```
or
```bash
  npm i react-calendar-components
```
    
## Usage/Examples

```javascript
import React from 'react';
import { Calendar } from 'react-calendar-components';
 
const App = () => {
  return <Calendar />
};
 
export default App;
```

Calendar can be configured with inline props:

```javascript
<Calendar 
    events={eventsArray}
    shadow={false}
    size="sm"
/>
```
If you want to include events - they have to be passed as array of objects according to scheme below:

```typestript
Array<Event>

interface Event {
    id: string, 
    name: string, 
    date: string, 
    category?: string, 
    endDate?: string,
    hour?: string,
    endHour?: string,
    description?: string,
    type?: "primary" | "secondary",
    color?: `#${string}`,
}
```


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Screenshots

![Component Screenshot](https://i.imgur.com/HFA6IkW.png)



## Parameters
all parameters are optional

| parameter | type | defaultValue | description |
| --- | --- | --- | --- |
| events | `Array<Event> `| `[]` | For more type references see above |
| size | ` "sm" \| "md" \| "lg" ` | `"md"` | change calendar size |
| startDate | `Date` | `new Date()` | set the date that you want calendar to open (displayed month just after load) |
| shadow | `Boolean` | `true` | endable/disable shadow |
| rounded | `Boolean` | `false` | endable/disable rounded corners |
| showEventsOnClick | `Boolean` | `false` | enable/disable showing event info below calendar after date click (does not disable the onClickDate funtion) |
| labelColor | `#{string}` - hex value | `"#009DFF"` | set color of main label (accent color seen on top bar and event indicators when event color is not defined) |
| bgColor | `#{string}` - hex value | `"#FFF"` | set background color of the calendar |
| headerColor | `#{string}` - hex value | `"#FFF"` | set header color of the calendar (month name on the top bar) |
| onMonthChange | `(data: number) => void` | `() => null` | returns index of the month after month change event |
| onYearChange | `(data: number) => void` | `() => null` | returns year after year change event |
| onClickDate | `({day: number, month: number, year: number, eventsInfo: Array<Event>}) => void` | `() => null` | returns year, index of the month, day and array of events on selected date after click |

