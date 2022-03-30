import './App.scss'
import React, { useState } from 'react'
import { Bip39Mnemonic } from './playground/bip39Mnemonic'
import { Bip44HDWallet } from './playground/bip44HDWallet'

function App() {
  const [hdSeedHex, setHdSeedHex] = useState('')

  return (
    <div className="App">
      <header className="App-header">Bitcoin wallet playground</header>
      <Bip39Mnemonic setHdSeedHex={setHdSeedHex} />
      <hr />
      <Bip44HDWallet setHdSeedHex={setHdSeedHex} hdSeedHex={hdSeedHex} />
    </div>
  )
}

export default App
