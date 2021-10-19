import axios from '../../config/axios'
import React, { useEffect, useState } from 'react'
import Box from './AdviceLessonCard'

function Advice() {
  const [lessons, setLessons] = useState([])
  const [reviews, setReviews] = useState([])
  const [averageReview, setAverageReview] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    const run = async () => {
      const { data: { data: lessons } } = await axios.get('/lessons')
      const { data: { data: reviews } } = await axios.get('/reviews')
      // console.log(`lessons`, lessons)
      // console.log(`reviews`, reviews)

      //* average all review to show 12 top review point
      const averageReview = []
      lessons.forEach(item => {
        const filteredReview = reviews.filter(itemR => itemR.lessonsId === item.id)
        averageReview.push([item.id, filteredReview.reduce((acc, itemR) => (acc + +itemR.reviewPoint), 0) / filteredReview.length])
      })
      averageReview.sort((a, b) => b[1] - a[1])

      // console.log(`averageReview`, averageReview)

      setLessons(lessons)
      setReviews(reviews)
      setAverageReview(averageReview)
    }
    run()
  }, [])

  return (
    <div className="growskill">
      <h1>Grow Your Skill</h1>
      <div className="content flex">
        <i className="fas fa-chevron-left btn" onClick={() => setPage(cur => cur >= 1 ? cur - 1 : cur)}></i>
        {/* {lessons?.filter(itemL => (itemL.id === averageReview?.[4 * page + 0]?.[0] || itemL.id === averageReview?.[4 * page + 1]?.[0] || itemL.id === averageReview?.[4 * page + 2]?.[0] || itemL.id === averageReview?.[4 * page + 3]?.[0])).map(itemL => (
          <Box lessons={itemL} reviews={reviews} key={itemL.id} /> */}

        {lessons?.filter(itemL => (itemL.id === averageReview?.[4 * page + 0]?.[0])).map(itemL => (
          <Box lessons={itemL} reviews={reviews} key={itemL.id} />))}
        {lessons?.filter(itemL => (itemL.id === averageReview?.[4 * page + 1]?.[0])).map(itemL => (
          <Box lessons={itemL} reviews={reviews} key={itemL.id} />))}
        {lessons?.filter(itemL => (itemL.id === averageReview?.[4 * page + 2]?.[0])).map(itemL => (
          <Box lessons={itemL} reviews={reviews} key={itemL.id} />))}
        {lessons?.filter(itemL => (itemL.id === averageReview?.[4 * page + 3]?.[0])).map(itemL => (
          <Box lessons={itemL} reviews={reviews} key={itemL.id} />))}
        <i className="fas fa-chevron-right btn" onClick={() => setPage(cur => cur <= 1 ? cur + 1 : cur)}></i>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <span className={`dot mx-2 ${page === 0 ? 'dotdotdot' : ''}`}></span>
        <span className={`dot mx-2 ${page === 1 ? 'dotdotdot' : ''}`}></span>
        <span className={`dot mx-2 ${page === 2 ? 'dotdotdot' : ''}`}></span>
      </div>
    </div>
  )
}

export default Advice
