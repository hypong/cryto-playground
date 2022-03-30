import React, { useState } from 'react'
import { SelectBox } from '../ui/SelectBox'
import { wordLengthList, languageList } from '../../data/selectData'
import PropTypes from 'prop-types'

const bip39 = require('bip39')

export const Bip39Mnemonic = ({ setHdSeedHex }) => {
  const [wordLength, setWordLength] = useState(128)
  const [language, setLanguage] = useState('english')
  const [password, setPassword] = useState('')
  const [seedHex, setSeedHex] = useState('')
  const [mnemonicResult, setMnemonicResult] = useState('')

  const generateSeed = () => {
    const rng = null
    const wordList = eval(`bip39.wordlists.${language}`)
    const mnemonic = bip39.generateMnemonic(wordLength, rng, wordList)
    const seed = bip39.mnemonicToSeedSync(mnemonic, password).toString('hex')
    setMnemonicResult(mnemonic)
    setSeedHex(seed)
    setHdSeedHex(seed)
  }

  return (
    <section className="playground">
      <div className="playground__title">Calculate the BIP-39 seed</div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Select entropy length:</div>
        <SelectBox data={wordLengthList} onSelectChange={setWordLength} />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Select language:</div>
        <SelectBox data={languageList} onSelectChange={setLanguage} defaultValue="english" />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Password (Optional):</div>
        <input
          placeholder="password"
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <div className="playground__form-item">
        <button className="action-button" onClick={() => generateSeed()}>
          generate Mnemonic
        </button>
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Mnemonic result:</div>
        <textarea
          placeholder="Mnemonic"
          className="textarea textarea--gray"
          defaultValue={mnemonicResult}
          readOnly
        ></textarea>
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Seed Hex result:</div>
        <textarea
          placeholder="Seed Hex"
          className="textarea textarea--gray"
          defaultValue={seedHex}
          readOnly
        ></textarea>
      </div>
    </section>
  )
}

Bip39Mnemonic.propTypes = {
  setHdSeedHex: PropTypes.func.isRequired
}
