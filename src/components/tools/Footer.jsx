import { useState } from "react"
import {CiInstagram,CiLinkedin} from 'react-icons/ci'
import { FaGithubSquare } from 'react-icons/fa';
import Styles from "../../../public/style/Footer.module.css"
export default function Footer() {
    const [contact,setContact]=useState(false)
    const HandleContact=()=>{
    setContact(true)
    }
 
    return(
    

       
        <div className={Styles.footer}>
            <div className={Styles.name}>
                 <p>© 2025 Then Raja. All rights reserved.</p>
                    <button>Back to top ↑</button>

            </div>
            <div className={Styles.owner}>
                <div className={Styles.navupper}>
            <p>DEVELOPED BY THENRAJA</p>
                <p >Tech Stack: React • Node.js • MongoDB • Docker</p>
                </div>

     <div className={Styles.navupper}>
                    <ol>
                        <li><a href="https://www.instagram.com/kingz__nyx_"><CiInstagram size={24} />
                            </a></li>
                        <li><a href="https://github.com/Thenraja01"><FaGithubSquare size={24} /></a></li>
                        <li><a href="https://www.linkedin.com/in/then-raja1205"><CiLinkedin size={24} /></a></li>
                    </ol>
                    
                    </div>
        </div>
            </div>
   
    
           )
};
