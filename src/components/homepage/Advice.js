import React from 'react'
import Box from './AdviceLessonCard'

function Advice() {
  const tempData = [
    {
      teacherProfileId: 1,
      img: 'https://images.pexels.com/photos/4145037/pexels-photo-4145037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      lessonName: 'The Art of Sculpture',
      teacherName: 'Jeff Dixon',
      reviewPoint: 4.5
    },
    {
      teacherProfileId: 2,
      img: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      lessonName: 'The Web Developer Bootcamp',
      teacherName: 'Colt Steele',
      reviewPoint: 4.7
    },
    {
      teacherProfileId: 3,
      img: 'https://images.pexels.com/photos/5693000/pexels-photo-5693000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      lessonName: 'Knitting 101 for Beginner',
      teacherName: 'Melissa Warren',
      reviewPoint: 4.8
    },
    {
      teacherProfileId: 4,
      img: 'https://images.pexels.com/photos/8520100/pexels-photo-8520100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      lessonName: 'Learn to play Piano Accordion',
      teacherName: 'Gerry Nulty',
      reviewPoint: 4.6
    },

  ]

  return (
    <div className="growskill">
      <h1>Grow Your Skill</h1>
      <div className="content flex">
        <i className="fas fa-chevron-left"></i>
        <Box data={tempData[0]} />
        <Box data={tempData[1]} />
        <Box data={tempData[2]} />
        <Box data={tempData[3]} />
        <i className="fas fa-chevron-right"></i>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <span className="dot mx-2"></span>
        <span className="dot mx-2"></span>
        <span className="dot mx-2"></span>
      </div>
    </div>
  )
}

export default Advice
