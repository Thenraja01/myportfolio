import Navbar from "./components/Navbar"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Home from './components/Home'
import { useState } from "react"
function App() {
  const [theme,setTheme]=useState(false)
function Handlechangetheme(){
  setTheme(prev=>!prev)
}
  return (
    <>
  <div className="parentc">

<Navbar setTheme={Handlechangetheme}/>
    <div className={theme?'dark':'light'}>
<Home/>
<Projects/>
<Skills/>

        </div>
  </div>

    </>
  )
}

export default App
