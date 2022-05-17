import React from 'react';
import './App.css';
import { Calendar, Event } from 'react-calendar-component'

const testEvents: Array<Event> = [
  {
    id: "r3289y",
    name: "Primary event one",
    description: "description of primary event one",
    date: "20 May 2022",
    type: "primary",
    hour: "10:20"
  },
  {
    id: "r328frttttt9y",
    name: "Secondary event one",
    description: "description of secondary event one",
    date: "3 May 2022",
    hour: "20:00"
  },
  {
    id: "r32fsdfsd89y",
    name: "Secondary event two",
    description: "description of secondary event two",
    date: "20 May 2022",
    hour: "16:50"
  },
]

function App() {
  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center", paddingTop: "15px" }}>
      <Calendar events={testEvents} size="md" rounded showEventsOnClick />
    </div>
  );
}

export default App;
