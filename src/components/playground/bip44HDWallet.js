import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as bitcoin from 'bitcoinjs-lib'

const HDKey = require('hdkey')

const getAddress = (publicKey, network) => {
  return bitcoin.payments.p2pkh({ pubkey: publicKey, network }).address
}

export const Bip44HDWallet = ({ setHdSeedHex, hdSeedHex }) => {
  const [account, setAccount] = useState(0)
  const [change, setChange] = useState(0)
  const [index, setIndex] = useState(0)
  const [derivationPath, setDerivationPath] = useState('')
  const [accountPrivateExtendedKey, setAccountPrivateExtendedKey] = useState('')
  const [accountPublicExtendedKey, setAccountPublicExtendedKey] = useState('')
  const [changePrivateExtendedKey, setChangePrivateExtendedKey] = useState('')
  const [changePublicExtendedKey, setChangePublicExtendedKey] = useState('')
  const [indexPrivateKey, setIndexPrivateKey] = useState('')
  const [indexPublicKey, setIndexPublicKey] = useState('')
  const [bitcoinAddress, setBitcoinAddress] = useState('')

  const isGenerateHDAddressDisable =
    hdSeedHex === '' ||
    !(
      Number.isInteger(parseInt(account)) &&
      Number.isInteger(parseInt(change)) &&
      Number.isInteger(parseInt(index))
    )

  useEffect(() => {
    const value = `m/44'/0'/${account}'/${change}/${index}`
    setDerivationPath(value)
  }, [account, change, index])

  const generateHDAddress = () => {
    const uint8ArrayPrivateKey = Buffer.from(hdSeedHex, 'hex')
    const root = HDKey.fromMasterSeed(uint8ArrayPrivateKey)
    const accountrnode = root.derive(`m/44'/0'/${account}'`)
    setAccountPrivateExtendedKey(accountrnode.privateExtendedKey)
    setAccountPublicExtendedKey(accountrnode.publicExtendedKey)

    const changernode = root.derive(`m/44'/0'/${account}'/${change}`)
    setChangePrivateExtendedKey(changernode.privateExtendedKey)
    setChangePublicExtendedKey(changernode.publicExtendedKey)

    const indexrnode = root.derive(derivationPath)
    setIndexPrivateKey(indexrnode._privateKey.toString('hex'))
    setIndexPublicKey(indexrnode._publicKey.toString('hex'))
    setBitcoinAddress(getAddress(indexrnode._publicKey))
  }

  return (
    <section className="playground">
      <div className="playground__title">Generate the HD Bitcoin addresses</div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">BIP-39 seed:</div>
        <textarea
          className="textarea"
          defaultValue={hdSeedHex}
          onChange={(e) => {
            setHdSeedHex(e.target.value)
          }}
        />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Coin Type: Bitcoin</div>
        <input value={0} disabled={true} />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Account:</div>
        <input
          placeholder="Account"
          value={account}
          onChange={(e) => {
            setAccount(e.target.value)
          }}
        />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Change: </div>
        <input
          placeholder="Change"
          value={change}
          onChange={(e) => {
            setChange(e.target.value)
          }}
        />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Index: </div>
        <input
          placeholder="Index"
          value={index}
          onChange={(e) => {
            setIndex(e.target.value)
          }}
        />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">
          Derivation path (m / purpose' / coin_type' / account' / change / index): (Read Only)
        </div>
        <input className="input input--gray" value={derivationPath} readOnly />
      </div>
      <div className="playground__form-item">
        <button
          className="action-button"
          onClick={() => generateHDAddress()}
          disabled={isGenerateHDAddressDisable}
        >
          generate HD Address
        </button>
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Derivation path: m/44'/60'/{account}'</div>
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Account Extended private key:</div>
        <textarea
          className="textarea textarea--gray"
          placeholder="Account Extended private key"
          defaultValue={accountPrivateExtendedKey}
          readOnly
        />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Account Extended public key:</div>
        <textarea
          className="textarea textarea--gray"
          placeholder="Account Extended public key"
          defaultValue={accountPublicExtendedKey}
          readOnly
        />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">
          Derivation path: m/44'/60'/{account}'/{change}
        </div>
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Change Extended private key:</div>
        <textarea
          className="textarea textarea--gray"
          placeholder="Change Extended private key"
          defaultValue={changePrivateExtendedKey}
          readOnly
        />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Change Extended public key:</div>
        <textarea
          className="textarea textarea--gray"
          placeholder="Change Extended public key"
          defaultValue={changePublicExtendedKey}
          readOnly
        />
      </div>

      <div className="playground__form-item">
        <div className="playground__form-item-label">
          Derivation path: m/44'/60'/{account}'/{change}/{index}
        </div>
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Index private key:</div>
        <textarea
          className="textarea textarea--gray"
          placeholder="Index private key"
          defaultValue={indexPrivateKey}
          readOnly
        />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Index public key:</div>
        <textarea
          className="textarea textarea--gray"
          placeholder="Index public key"
          defaultValue={indexPublicKey}
          readOnly
        />
      </div>
      <div className="playground__form-item">
        <div className="playground__form-item-label">Bitcoin address:</div>
        <textarea
          className="textarea textarea--gray"
          placeholder="Bitcoin address"
          defaultValue={bitcoinAddress}
          readOnly
        />
      </div>
    </section>
  )
}

Bip44HDWallet.propTypes = {
  setHdSeedHex: PropTypes.func.isRequired,
  hdSeedHex: PropTypes.string.isRequired
}
