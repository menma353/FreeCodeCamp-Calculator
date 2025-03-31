import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Keys from './Keys'
import Screen from './Screen'
import { Analytics } from "@vercel/analytics/react"


function App() {

    

  return (
    <>
      <div class='body'>
        <Screen/>
        <Keys/>
        <Analytics />
      </div>
    </>
  )
}

export default App
