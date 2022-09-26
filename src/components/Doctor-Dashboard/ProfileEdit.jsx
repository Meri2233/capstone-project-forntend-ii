import React from 'react'
import { specialities } from '../../speciality'

export default function ProfileEdit({ closeEdit }) {

  return (
    <div className='profileedit'>
      <h3>Add your information to enhance your profile.</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        closeEdit(e)
      }} className='profileeditform'>
        <label htmlFor="image">Upload your Profile Photo</label>
        <div className="profilephoto">
          <input id="image" type="file" name="image" capture />
        </div>
        <div className="formeditsection">
          <div className="label"><label htmlFor="qualification">Qualification</label></div>
          <input type="text" name='qualification' />
        </div>
        <div className="formeditsection">
          <div className="label"><label htmlFor="experience"> Experience</label></div>
          <input type="text" name='experience' />
        </div>
        <div className="formeditsection">
          <div className="label"><label htmlFor="hospital">Hopital</label></div>
          <input type="text" name='hospital' />
        </div>
        <div className="formeditsection">
          <div className="label"><label htmlFor="address">Address</label></div>
          <input type="text" name='address' />
        </div>
        <div className="formeditsection">
          <div className="label"><label htmlFor="cost">Consultation Cost</label></div>
          <input type="text" name='cost' />
        </div>
        <div className="formeditsection">
          <div className="label"><label htmlFor="speciality">Speciality</label></div>
          <select name="specialities">
          <option className='speciality' value={null}></option>
            {specialities.map((el, index) => <option className='speciality' key={index} value={el}>{el}</option>)}
          </select>
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}
