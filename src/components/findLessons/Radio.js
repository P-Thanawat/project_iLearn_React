import React from 'react'

function Radio({ name, state, setState }) {
  return (
    <div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name='sort' value={name} id={name} onChange={e => setState(e.target.value)} />
        <label class="form-check-label" for={name}>
          {name}
        </label>
      </div>
    </div>
  )
}

export default Radio
