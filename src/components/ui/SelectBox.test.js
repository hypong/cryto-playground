import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelectBox } from './SelectBox'
import { wordLengthList } from '../../data/selectData'

const setWordLength = jest.fn()

describe('SelectBox', () => {
  it('renders options successfully', () => {
    render(<SelectBox data={wordLengthList} onSelectChange={setWordLength} />)
    expect(screen.getByText(wordLengthList[0].value).selected).toBeTruthy()
  })

  it('renders a message if data is and empty array', () => {
    render(<SelectBox data={[]} onSelectChange={setWordLength} />)
    expect(screen.getByText('No data for the select box'))
  })

  it('will call onSelectChange fucntion on select change', () => {
    render(<SelectBox data={wordLengthList} onSelectChange={setWordLength} />)

    userEvent.selectOptions(
      // Find the select element
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: wordLengthList[1].value })
    )

    expect(setWordLength).toHaveBeenCalledWith('160')
  })
})
