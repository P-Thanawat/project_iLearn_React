import React from 'react'
import { Link } from 'react-router-dom';
// import '../../css/homepage.css'

function Box(props) {
  const { lessons, reviews } = props;

  const review = reviews.filter(item => item.lessonsId === lessons.id)
  const reviewAvg = review.reduce((acc, item) => ((acc + +item.reviewPoint)), 0) / review.length;
  return (
    <div className="box">
      <Link to={`/teacherProfile/${lessons?.teacherProfileId}`} style={{ textDecoration: 'none' }} >
        <img src={lessons?.lessonPicture} alt="" />
        <p className='lessonName'>{lessons?.lessonName}</p>
        <p className='lessonTeacherName'>{lessons?.teacherProfile.userAccount.firstName} {lessons?.teacherProfile.userAccount.lastName}</p>
        <div className="d-flex justify-content-start align-items-start">
          <p className='lessonReviewPoint'>{reviewAvg ? reviewAvg.toFixed(2) : ''}</p>
          <div>
            {reviewAvg >= 1 && <i className="fa fa-star starstarstar"></i>}
            {reviewAvg >= 2 && <i className="fa fa-star starstarstar"></i>}
            {reviewAvg >= 3 && <i className="fa fa-star starstarstar"></i>}
            {reviewAvg >= 4 && <i className="fa fa-star starstarstar"></i>}
            {reviewAvg >= 5 && <i className="fa fa-star starstarstar"></i>}
          </div>
        </div>
      </Link>
    </div >
  )
}

export default Box
