import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosPatient from '../../apiConfigPatient';
import { addPastConsultation } from '../../slices/pastSlice';

export default function PastConPatients() {
  let dispatch = useDispatch();
  let pastConsultations = useSelector(state => state.past.pastconsultations)

  useEffect(() => {
    axiosPatient.get('/consultation/patient/past/list').then(resp => {
      let consultation = resp.data;
      console.log(consultation);
      dispatch(addPastConsultation(consultation));
    });
  }, [])

  return (
    <div className='w-5/6'>
      {pastConsultations.length !== 0 ?
        <div className='consultations flex flex-col gap-3'>
          <h1 className='text-3xl font-bold'>Past Consultations</h1>
          {pastConsultations.map((el, index) => {
            return <div key={index} className="consultation border-2 border-black p-3 rounded">
              <p>Consultation With : Dr. {el.docname}</p>
              <p>Time of Consultation: {el.date}({el.time})</p>
              <p>Total Cost: Rs.{el.price}</p>
              <div className="stars flex items-center">
                <p>Rate:</p>
                <div className="star" data-rate="5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                    </polygon>
                  </svg>
                </div>
                <div className="star" data-rate="4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                    </polygon>
                  </svg>
                </div>
                <div className="star" data-rate="3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                    </polygon>
                  </svg>
                </div>
                <div className="star" data-rate="2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                    </polygon>
                  </svg>
                </div>
                <div className="star" data-rate="1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                    </polygon>
                  </svg>
                </div>
              </div>
            </div>
          })}
        </div> :
        <div className='w-5/6 flex justify-center items-center'>
          <p>No consultations.</p>
        </div>
      }
    </div>
  )
}
