import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosDoctor from '../../apiConfigDoctor';
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '../../slices/dateSlice';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import axiosPatient from '../../apiConfigPatient';

let previousevent;

export default function Doctor() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [date, setDate] = useState(null);
  let [times, setTime] = useState([]);
  let [time, setSelectedTime] = useState(null);
  let [docDetail, setDocDetail] = useState(null);
  let [selectedDate, setSelectedDate] = useState(null);
  let dates = useSelector(state => state.date.dates);

  useEffect(() => {
    axiosDoctor.get(`/doc/details/:${id.substring(1)}`).then(resp => {
      let docDetail = resp.data;
      setDocDetail(docDetail);
      let dates = resp.data.daysandtimeslot;
      dispatch(addDate(dates));
    });
  }, [])

  function showTimes() {
    times = []
    setTime(times);
    let selected = date.value
    let month = ("0" + (selected.getMonth() + 1)).slice(-2);
    let day = ("0" + selected.getDate()).slice(-2);
    let year = selected.getFullYear();

    let appointmentdate = year + '-' + month + '-' + day;

    for (let date of dates) {
      if (appointmentdate === date.substring(0, 10)) {
        let copy = [...times];
        copy.push(date.substring(10))
        setTime(copy);
      }
    }
    setSelectedDate(appointmentdate);
  }

  function selectTime(e) {
    if (previousevent !== undefined) {
      e.target.style.backgroundColor = "rgb(1, 155, 167)";
      e.target.style.color = "white";
      previousevent.target.style.backgroundColor = "gainsboro";
      previousevent.target.style.color = "black";
      previousevent = e;
      setSelectedTime(e.target.innerText)
    }
    else {
      e.target.style.backgroundColor = "rgb(1, 155, 167)";
      e.target.style.color = "white";
      previousevent = e
      setSelectedTime(e.target.innerText)
    }
  }

  function confirmBooking() {
    let purpose = document.querySelector('#purpose').value;
    axiosPatient({
      method: 'post',
      url: '/consultation/create',
      data: {
        purpose: purpose,
        price: docDetail.price,
        docname: docDetail.name,
        time: time,
        date: selectedDate
      }
    }).then(response => {
      console.log(response)
      navigate('/patient')
    })
      .catch((error) => console.log(error))
  }

  return (
    <div className='schedule-container'>
      <p>Specify your problem and pick a date and time for consultation with doctor.</p>
      <label htmlFor="purpose">Please define your problem</label>
      <input type="text" name="purpose" id="purpose" />
      <label htmlFor="date">Choose Date</label>
      <DatePickerComponent id="datetimepicker" onChange={date => setDate(date)} placeholder='Pick a date for consultation' />
      <button onClick={(e) => showTimes()}>View Available Time</button>
      <div className="time-section">
        {times.length !== 0 ?
          <div className='time-section'>
            <p>Select a time to fix the consultation</p>
            <div className="times">
              {times.map((el, index) => <button onClick={(e) => selectTime(e)} className='time' key={index}>{el}</button>)}
            </div>
          </div> :
          <div><p>Select a date to view the available times.</p></div>
        }
      </div>
      <button onClick={(e) => confirmBooking()}>Schedule Consultation</button>
    </div>
  )
}
