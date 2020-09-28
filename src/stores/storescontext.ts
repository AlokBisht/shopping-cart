import React from "react"
import { RootStore } from "./rootstore"


export const storesContext = React.createContext({
    rootStore: new RootStore(),
  })

  export const useStores = () => React.useContext(storesContext)