import React from 'react'

function Hamburger() {
  return (
    <div>
      <div className="modal fade" id="hamburger" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="card">menu1</div>
              <div className="card">menu2</div>
              <div className="card">menu3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hamburger
