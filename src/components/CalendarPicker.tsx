import React, { useState } from 'react'

const CalendarPicker: React.FC = () => {
    const [count, setCount] = useState<number>(0)
    return (
        <div onClick={() => setCount(count + 1)}>
            CalendarPicker {count}
        </div>
    );
}

export default CalendarPicker;