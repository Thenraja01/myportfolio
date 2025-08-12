import Styles from '../../public/style/Navbar.module.css'
import { useState } from 'react'
import { FiSun } from 'react-icons/fi';
import { FiMoon } from 'react-icons/fi';
import { FaGithubSquare } from 'react-icons/fa';
import {CiInstagram,CiLinkedin} from 'react-icons/ci'

export default function Navbar({setTheme}) {
    const [color, setColor] = useState("black")
    const [isPlay, setIsplay] = useState(false)
   const links = ["About", "Skills", "Projects", "Education"]
    function ChangeTheme(){
        setTheme()
        setColor(prev=>prev=="black"?'white':'black')
          setIsplay(!isPlay)
        }
    return(
        <div className={Styles.navbar}>
            <div className="navupper">
                <ol>
                    <li><a href="https://www.instagram.com/kingz__nyx_"><CiInstagram size={24} style={{color}}/>
                        </a></li>
                    <li><a href="https://github.com/Thenraja01"><FaGithubSquare size={24} style={{color}}/></a></li>
                    <li><a href="https://www.linkedin.com/in/then-raja1205"><CiLinkedin size={24}style={{color}}/></a></li>
                </ol>
                
                </div>
            <div className="navlower" >       
            <ol>
                <li className={Styles.navigation}>{links.map((items,id)=>{
                    return <a href={`#${items.toLowerCase()}`} key={id} style={{color}}>{items}</a>     
                })}</li>
               <button type="button" onClick={ChangeTheme}>{isPlay?<FiMoon style={{color}} size={18}/>:<FiSun style={{color}} size={18}/>}
                </button>

            </ol>
            </div>
        </div>
    )
}
