import React from 'react'
import PropTypes from 'prop-types'

// use React memo to prevent unnecessary rerender
export const SelectBox = React.memo(({ data, onSelectChange, defaultValue }) => {
  const onSelectBoxChange = (e) => {
    onSelectChange(e.target.value)
  }

  if (!data.length) {
    return <div>No data for the select box</div>
  }

  return (
    <select onChange={(e) => onSelectBoxChange(e)} defaultValue={defaultValue}>
      {data.map((item, key) => (
        <option key={`selectBoxOption${key}`} value={item.key}>
          {item.value}
        </option>
      ))}
    </select>
  )
})

SelectBox.displayName = 'SelectBox'

SelectBox.propTypes = {
  data: PropTypes.array.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
}
