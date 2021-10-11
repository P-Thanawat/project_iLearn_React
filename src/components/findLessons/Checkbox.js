import React from 'react'

function Checkbox({ name, state, setState }) {


  return (
    <div class="form-check">
      <input class="form-check-input" type="checkbox" onChange={e => setState(cur => ({ ...cur, [name]: e.target.checked }))} id={name} />
      <label class="form-check-label" for={name} >
        {name}
      </label>
    </div>
  )
}

export default Checkbox
