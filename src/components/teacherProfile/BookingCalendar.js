// import React from 'react'
// import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'
import events from '../../services/events'
// // import ExampleControlSlot from '../../services/ExampleControlSlot'
// import format from 'date-fns/format'
// import parse from 'date-fns/parse'
// import startOfWeek from 'date-fns/startOfWeek'
// import getDay from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US'

// const locales = {
//   'en-US': enUS,
// }

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })


// const propTypes = {}

// class Selectable extends React.Component {
//   constructor(...args) {
//     super(...args)

//     this.state = { events }
//   }

//   handleSelect = ({ start, end }) => {
//     const title = window.prompt('New Event name')
//     if (title)
//       this.setState({
//         events: [
//           ...this.state.events,
//           {
//             start,
//             end,
//             title,
//           },
//         ],
//       })
//   }

//   render() {
//     const { localizer } = this.props
//     return (
//       <>
//         {/* <ExampleControlSlot.Entry waitForOutlet>
//           <strong>
//             Click an event to see more info, or drag the mouse over the calendar
//             to select a date/time range.
//           </strong>
//         </ExampleControlSlot.Entry> */}
//         <Calendar
//           selectable
//           localizer={localizer}
//           events={this.state.events}
//           defaultView={Views.WEEK}
//           scrollToTime={new Date(1970, 1, 1, 6)}
//           defaultDate={new Date(2015, 3, 12)}
//           onSelectEvent={event => alert(event.title)}
//           onSelectSlot={this.handleSelect}
//         />
//       </>
//     )
//   }
// }

// Selectable.propTypes = propTypes

// export default Selectable

// import * as BigCalendar from 'react-big-calendar'
// import moment from 'moment'
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// function MyCalendar(props) {

//   const Event = {
//     id: 0,
//     title: 'All Day Event very long title',
//     allDay: true,
//     start: new Date(2015, 3, 0),
//     end: new Date(2015, 3, 1),
//   }

//   moment.locale('en-GB');
//   BigCalendar.momentLocalizer(moment);

//   return (

//     <BigCalendar
//       // localizer={localizer}
//       events={[
//         {
//           'title': 'My event',
//           'allDay': false,
//           'start': new Date(2018, 0, 1, 10, 0), // 10.00 AM
//           'end': new Date(2018, 0, 1, 14, 0), // 2.00 PM 
//         }
//       ]}
//       step={60}
//       view='week'
//       views={['week']}
//       min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
//       max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
//       date={new Date(2018, 0, 1)}
//       startAccessor="start"
//       endAccessor="end"
//     />)

// }

// export default MyCalendar

import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class App extends Component {
  state = {
    events: [
      {
        start: moment().toDate([2021, 9, 10]),
        end: moment()
          .add(1, "days")
          .toDate(),
        title: "Some title"
        // start: new Date(2021, 10, 9),
        // end: new Date(2021, 10, 10),
        // title: 'All Day Event very long title',

      }
    ]
  };

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    console.log(`start`, start)
    console.log(`end`, end)
    console.log(`title`, title)
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  render() {
    console.log(this.state.events)
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
          selectable
          onSelectSlot={this.handleSelect}
        />
      </div>
    );
  }
}

export default App;
