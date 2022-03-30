import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Bip44HDWallet } from './Bip44HDWallet'

const setHdSeedHex = jest.fn()
const hdSeedHex =
  '628c7bb593ea0693af0967d585fcf82a97b3b258720ac36bd8e2c7568fcb0363501bc0375f7c71ab2db46271e49ccf9df95eb016f2f0cfc915083faa414bce85'

const result = {
  accountExtendedPrivateKey:
    'xprv9yGQz1tiTEvU1ZiNPHVxkQnicbm1wbVgFqH8i6zvenFJjF5TKE9ktFdN6pXo32Hbf9hYCypEGcViqMF6PxMTuxJEANW87BdWk9zzrdidX1g',
  accountExtendedPublicKey:
    'xpub6CFmPXRcHcUmE3nqVK2y7YjTAdbWM4DXd4CjWVQYD7nHc3QbrmU1S3wqx77exepe3GxU9VTuvzoaN22TJYKbApL5Meoib5MdLc91zk51TCU',
  changeExtendedPrivateKey:
    'xprvA2QbLW3pnu1kFH3ZoxgLsgKi49jqSuc4JhPhFvjuspKJ8vzYk1DKqXgNpNtT4ZhPArNRNsCuZQT1738fmsjqXuVrjBV4heWkUTGPwqzNM5Q',
  changeExtendedPublicKey:
    'xpub6FPwk1aidGa3Tm82uzDMEpGScBaKrNKufvKJ4K9XS9rH1jKhHYXaPKzrfdq2ttxffZTNJTwdZtUMutk9XVSPrjk92wcSPituBp7aTbqV3XC',
  indexPrivateKey: 'e3ef256fc77ba125945921d73910778a1dfb849b90b33bb71841dab614657cf1',
  indexPublicKey: '02617f8153827d35711f45ebd1a52a6bcc4dda9e212ee618106e440de11a009c41',
  bitcoinAddress: '1MYY4khLnJPYhaPRqA2JgLn15ToqZeTbMH'
}

describe.only('bip44 HD Wallet', () => {
  it('render the componenet successfully', () => {
    render(<Bip44HDWallet setHdSeedHex={setHdSeedHex} hdSeedHex={hdSeedHex} />)
    expect(screen.getByText('Generate the HD Bitcoin addresses'))
    expect(screen.getByText('Bitcoin address:'))
  })

  it('generate bitcoin Address successfully', () => {
    render(<Bip44HDWallet setHdSeedHex={setHdSeedHex} hdSeedHex={hdSeedHex} />)
    const button = screen.getByText('generate HD Address')
    fireEvent.click(button)

    const accountExtendedPrivateKey = screen.getByPlaceholderText('Account Extended private key')
    const accountExtendedPublicKey = screen.getByPlaceholderText('Account Extended public key')
    const changeExtendedPrivateKey = screen.getByPlaceholderText('Change Extended private key')
    const changeExtendedPublicKey = screen.getByPlaceholderText('Change Extended public key')

    const indexPrivateKey = screen.getByPlaceholderText('Index private key')
    const indexPublicKey = screen.getByPlaceholderText('Index public key')
    const bitcoinAddress = screen.getByPlaceholderText('Bitcoin address')

    expect(accountExtendedPrivateKey.value).toEqual(result.accountExtendedPrivateKey)
    expect(accountExtendedPublicKey.value).toEqual(result.accountExtendedPublicKey)
    expect(changeExtendedPrivateKey.value).toEqual(result.changeExtendedPrivateKey)
    expect(changeExtendedPublicKey.value).toEqual(result.changeExtendedPublicKey)
    expect(indexPrivateKey.value).toEqual(result.indexPrivateKey)
    expect(indexPublicKey.value).toEqual(result.indexPublicKey)
    expect(bitcoinAddress.value).toEqual(result.bitcoinAddress)
  })
})
