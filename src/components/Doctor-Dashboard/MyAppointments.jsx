import React, { useState } from 'react'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import axiosDoctor from '../../apiConfigDoctor';

export default function MyAppointments() {
  const [date, setDate] = useState(null);

  function addDate() {
    console.log(date.value);

    let selected = date.value
    let month = ("0" + (selected.getMonth() + 1)).slice(-2);
    let day = ("0" + selected.getDate()).slice(-2);
    let year = selected.getFullYear();

    let fixeddate = year + '-' + month + '-' + day;
    let time = date.value.getHours() + ":" + date.value.getMinutes();
    console.log(fixeddate + time);

    axiosDoctor({
      method: 'post',
      url: '/doc/adddate',
      data: {
        date: fixeddate + time
      }
    }).then(response => console.log(response))
      .catch((error) => console.log(error))
  }

  return (
    <div className='schedule-container'>
      <label htmlFor="date">Set your appointment schedule</label>
      <DateTimePickerComponent id="datetimepicker" onChange={date => setDate(date)} placeholder='Pick your available date and time and add it' />
      <button onClick={(e) => {
        addDate()
      }}>Add</button>
    </div>
  )
}
