import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosDoctor from '../../apiConfigDoctor';
import { addUpcomingConsultation } from '../../slices/upcomingSlice';

export default function UpConDoctor() {
  let dispatch = useDispatch();
  let upcomingConsultations = useSelector(state => state.upcoming.upcomingconsultations);
  console.log(upcomingConsultations);

  let [id, setid] = useState(null)

  useEffect(() => {
    axiosDoctor.get('/consultation/doctor/upcoming/list').then(resp => {
      let consultation = resp.data;
      dispatch(addUpcomingConsultation(consultation));
    });
  }, [])

  function displayDocNotes(id) {
    setid(id);
    let docNoteEl = document.querySelector('.docnotes');
    let myappointmentsEl = document.querySelector('.myappointments')
    let consultationsEl = document.querySelector('.consultations');
    myappointmentsEl.style.filter = "blur(10px)"
    consultationsEl.style.filter = 'blur(10px)'
    docNoteEl.style.display = "flex"
  }

  function addDocNotes(e) {
    console.log(id);
    let data = new FormData(e.target);

    axiosDoctor({
      method: "post",
      url: `/consultation/markdone/:${id}`,
      data: {
        notes: data.get('note'),
        prescribtions: data.get('prescribtion')
      },
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        console.log(response);
        let docNoteEl = document.querySelector('.docnotes');
        let myappointmentsEl = document.querySelector('.myappointments')
        let consultationsEl = document.querySelector('.consultations');
        myappointmentsEl.style.filter = "none"
        consultationsEl.style.filter = 'none'
        docNoteEl.style.display = "none"
      })
      .catch(function (response) {
        console.log(response);
      });

  }

  return (
    <div className='consultations-container'>
      {upcomingConsultations.length !== 0 ?
        <div className='consultations'>
          <h1>Upcoming Consultations</h1>
          {upcomingConsultations.map((el, index) => {
            return <div key={index} className="consultation">
              <p>Consultation With: {el.patientname}</p>
              <p>Consultation Time: {el.date}({el.time})</p>
              <p>Consultation Cost: {el.price}</p>
              <button onClick={(e) => displayDocNotes(el.id)}>Start Consultation</button>
            </div>
          })}
        </div> :
        <p>No consultations.</p>
      }
      <div className="docnotes">
        <form className='profileeditform' onSubmit={(e) => {
          e.preventDefault();
          addDocNotes(e)
        }}>
          <div className="formsection">
            <div className="label"><label htmlFor="note">Notes:</label></div>
            <input type="text" name='note' />
          </div>
          <div className="formsection">
            <div className="label"><label htmlFor="prescribtion">Prescribtions:</label></div>
            <input type="text" name='prescribtion' />
          </div>
          <button>Add</button>
        </form>
      </div>
    </div>
  )
}
