import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const contet = createContext({
  isAuthorized:false
})

const AppWrapper = ()=>{
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [user, setUser] = useState({});
  return (
    <contet.Provider value={{isAuthorized, setIsAuthorized, user, setUser}}>
      <App/>
    </contet.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
