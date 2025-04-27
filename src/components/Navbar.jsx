import Styles from '../../public/style/Navbar.module.css'
import { useState } from 'react'
export default function Navbar({setTheme}) {
    const [color, setColor] = useState("black")
    function ChangeTheme(){
        setTheme()
        setColor(prev=>prev=="black"?'white':'black')
    }

    return(
        <div className={Styles.navbar}>
        
            <div className="navlower" >
            <ol>
                <li><a href="#home" style={{color}}>Home</a></li>
                <li><a href="#about" style={{color}}>about</a></li>
                <li><a href="#skills" style={{color}}>Skills</a></li>
                <li><a href="#projects" style={{color}}>Projects</a></li>
                <li><a href="#review" style={{color}}>Reviews</a></li>
                <button type="button" onClick={ChangeTheme}>Theme</button>
            </ol>
            </div>
        </div>
    )
}