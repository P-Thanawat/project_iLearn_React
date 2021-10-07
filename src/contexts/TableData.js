import React, { createContext, useEffect, useState } from 'react'

const TableDataContext = createContext();

function TableDataProvider({ children }) {

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const thisMonth = (new Date().getMonth()) + 1 //oct = 9+1 =10
    const thisYear = new Date().getFullYear() //2021
    const numberOfDays = [daysInMonth(thisMonth - 1, thisYear), daysInMonth(thisMonth, thisYear), daysInMonth(thisMonth + 1, thisYear)]
    const tableInitial = [[], [], []]
    // 15 minutes in day 60*24/15= 96
    const minute = [];
    for (let i = 1; i <= 96; i++) {
      minute.push(0)
    }
    // preMonth
    for (let i = 1; i <= numberOfDays[0]; i++) {
      tableInitial[0].push(minute)
    }
    // thisMonth
    for (let i = 1; i <= numberOfDays[1]; i++) {
      tableInitial[1].push(minute)
    }
    // nextMonth
    for (let i = 1; i <= numberOfDays[2]; i++) {
      tableInitial[2].push(minute)
    }

    // console.log(`tableInitial`, tableInitial)
    setTableData(tableInitial)

  }, [])


  return <TableDataContext.Provider value={{ tableData, setTableData }}>{children}</TableDataContext.Provider>
}

export { TableDataContext, TableDataProvider }

