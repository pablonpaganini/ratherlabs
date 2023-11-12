'use client'
import Wallet from "@/classes/wallet"
import { useContext, createContext, Dispatch, SetStateAction, useState } from "react"

interface StoreContextProps {
  wallet: Wallet,
  setWallet: Dispatch<SetStateAction<Wallet>>,
  answers: Array<number | null>
  setAnswers: Dispatch<SetStateAction<Array<number | null>>>
  error: string,
  setError: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<StoreContextProps>({
  wallet: new Wallet(),
  setWallet: (): Wallet => new Wallet(),
  answers: [],
  setAnswers: (): Array<number | null> => [],
  error: '',
  setError: (): string => ''
})
//@ts-ignore
export const GlobalContextProvider = ({children}) => {
  const [wallet, setWallet] = useState(new Wallet())
  const [answers, setAnswers] = useState([] as Array<number | null>)
  const [error, setError] = useState('');

  return (
    <GlobalContext.Provider value={{wallet, setWallet, answers, setAnswers, error, setError}}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);