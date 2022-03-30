import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Bip39Mnemonic } from './bip39Mnemonic'

const bip39 = require('bip39')

const setHdSeedHex = jest.fn()
const wordList = eval('bip39.wordlists.english')

describe('bip39 Mnemonic', () => {
  it('render the componenet successfully', () => {
    render(<Bip39Mnemonic setHdSeedHex={setHdSeedHex} />)
    expect(screen.getByText('Calculate the BIP-39 seed'))
  })

  it('generate 12 words Mnemonic successfully', () => {
    render(<Bip39Mnemonic setHdSeedHex={setHdSeedHex} />)

    const button = screen.getByText('generate Mnemonic')
    fireEvent.click(button)

    const mnemonicTextArea = screen.getByPlaceholderText('Mnemonic')
    expect(mnemonicTextArea.value.split(' ').length).toEqual(12)

    expect(bip39.validateMnemonic(mnemonicTextArea.value)).toBeTruthy()
  })

  it('generate 15 words Mnemonic successfully', () => {
    render(<Bip39Mnemonic setHdSeedHex={setHdSeedHex} />)

    userEvent.selectOptions(
      // Find the select element
      within(screen.getByText('Select entropy length:').parentElement).getByRole('combobox'),
      screen.getByRole('option', { name: '160 bits (15 words)' })
    )

    const button = screen.getByText('generate Mnemonic')
    fireEvent.click(button)

    const mnemonicTextArea = screen.getByPlaceholderText('Mnemonic')
    expect(mnemonicTextArea.value.split(' ').length).toEqual(15)

    expect(bip39.validateMnemonic(mnemonicTextArea.value, wordList)).toBeTruthy()
  })

  it('generate 15 words Mnemonic with password successfully', () => {
    render(<Bip39Mnemonic setHdSeedHex={setHdSeedHex} />)

    userEvent.selectOptions(
      // Find the select element
      within(screen.getByText('Select entropy length:').parentElement).getByRole('combobox'),
      screen.getByRole('option', { name: '160 bits (15 words)' })
    )

    const mnemonicTextArea = screen.getByPlaceholderText('Mnemonic')
    const passwordInput = screen.getByPlaceholderText('password')

    fireEvent.change(passwordInput, { target: { value: 'testing' } })

    const button = screen.getByText('generate Mnemonic')
    fireEvent.click(button)

    expect(mnemonicTextArea.value.split(' ').length).toEqual(15)

    expect(bip39.validateMnemonic(mnemonicTextArea.value, wordList)).toBeTruthy()
  })
})
