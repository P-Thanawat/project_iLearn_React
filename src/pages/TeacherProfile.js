import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function TeacherProfile() {
  useEffect(() => {
    const run = async () => {
      const teacherProfileId = window.location.href.split('/')[window.location.href.split('/').length - 1]
      await axios.get(`/teacherProfile/${teacherProfileId}`)//? get teacherProfile from teacherProfileId
    }
    run();

  }, [])
  return (
    <div>
      <div className="leftContainer">
        <img src="" alt="" />
        <div className="teacherPersonal">
          <div className="leftTeacherPersonal">
            <img src="" alt="" />
          </div>
          <div className="rightTeacherPersonal">
            <h3></h3>
          </div>
        </div>
      </div>


    </div>
  )
}

export default TeacherProfile
