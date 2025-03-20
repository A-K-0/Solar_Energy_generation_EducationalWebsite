import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './Routes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <AppRoutes />
    </>
  )
}

export default App
