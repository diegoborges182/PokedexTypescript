import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PokemonProvider from './context/PokemonContext.tsx'

const rootElement = document.getElementById('root')
if(rootElement){
  ReactDOM.createRoot(rootElement).render (

    <PokemonProvider>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
    </PokemonProvider>

  )
} else {
  console.log("Root não existe")
}
