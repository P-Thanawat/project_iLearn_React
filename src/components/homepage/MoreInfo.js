import React from 'react'

function MoreInfo() {
  return (
    <div>
      {/* <!-- Modal --> */}
      <div className="modal fade " id="moreInfo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {/* <div className="modal-header"> */}
            {/* <h5 className="modal-title" id="exampleModalLabel">About Us</h5> */}
            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            {/* </div> */}
            <div className="modal-body card p-0 m-0">
              <img src="https://images.pexels.com/photos/5153985/pexels-photo-5153985.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" />
              <h5 className="text-center my-4">About Us</h5>
              <p className="mx-4 mb-5">
                At iLearn, we’ve seen again and agian a lot of people who need to learn new things, look forward to the like-interested friends or tools that is useful. We appreciate everyone who dedicate to learning new things.
                So we want to help and inspire you. The thing I thought couldn’t be possible a year or two ago, is actually happening.

                iLearn is an online learning community with thousands of classNamees for everyone. On iLearn, millions of members come together to find inspiration and take the next step in their journey.
              </p>
            </div>
            {/* <div className="modal-footer"> */}
            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoreInfo
