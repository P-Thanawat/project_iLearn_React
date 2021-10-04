import React, { useEffect } from 'react'

function ReviewCard({ reviews }) {
  const isHalfStar = reviews.reviewPoint - Math.floor(reviews.reviewPoint) > 0;

  return (
    <div>
      <div className="card p-4 m-2">
        <div className="row">
          <div className="col-2 d-flex flex-column align-items-center justify-content-center">
            <img src={reviews.userAccount.profilePicture} alt="profilePicture" className='reviewProfilePicture' />
            <span className='mt-2'>{reviews.userAccount.firstName}</span>
          </div>
          <div className="col-10 d-flex flex-column">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className='me-2 fw-bold'>{(+reviews.reviewPoint).toFixed(1)}</span>
                {reviews.reviewPoint >= 1 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {reviews.reviewPoint >= 2 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {reviews.reviewPoint >= 3 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {reviews.reviewPoint >= 4 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {reviews.reviewPoint >= 5 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {isHalfStar && <img className='star' src="https://cdn-icons-png.flaticon.com/512/2107/2107737.png" alt="" />}
              </div>
              <div className=" d-flex  align-items-center">
                <span className='fs-6'>lesson: {reviews.lesson.lessonName}</span>
              </div>

            </div>
            <span className=''>{reviews.reviewMessage}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ReviewCard
