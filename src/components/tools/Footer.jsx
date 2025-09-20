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
                <h1>Then Raja</h1>
            </div>
            <div className={Styles.owner}>
            <p>DEVELOPED BY THENRAJA</p>
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
