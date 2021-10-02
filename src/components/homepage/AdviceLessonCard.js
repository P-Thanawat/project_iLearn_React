import React from 'react'
import { Link } from 'react-router-dom';

function Box(props) {
  const { data: { teacherProfileId, img, lessonName, teacherName, reviewPoint } } = props;
  return (
    <div className="box card">
      <Link to={`/teacherProfile/${teacherProfileId}`}>
        <img src={img} alt="" className="imgForBox" />
        <h4>{lessonName}</h4>
        <p>{teacherName}</p>
        <h4>{reviewPoint}</h4>
        <img src="" alt="" />
      </Link>
    </div>
  )
}

export default Box
