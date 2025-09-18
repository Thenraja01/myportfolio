import { useState } from "react"
import Styles from "../../../public/style/Footer.module.css"
export default function Footer() {
    const [contact,setContact]=useState(false)
    const HandleContact=()=>{
        setContact(!contact)
    }
 
    return(
        <div className={Styles.footer}>
            <div className={Styles.name}>
                <h1>Then Raja</h1>
            </div>
            <div className={Styles.owner}>
            <p>DEVELOPED BY THENRAJA</p>
            </div>
            <div className="">
            <button onClick={HandleContact}>contact me</button>
            </div>
        </div>
    )
    
};
