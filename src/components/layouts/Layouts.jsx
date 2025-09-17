import Navbar from "../tools/Navbar"
import { useState } from "react"
import Footer from "../tools/Footer"
import BodyContent from "./BodyContent"
export default function Layouts() {
    const [theme, setTheme] = useState(false)
    function Handlechangetheme() {
        setTheme(prev => !prev)
    }
    return (
        <div className="">
            <div className="">
                <Navbar setTheme={Handlechangetheme} />
                <div className={theme ? 'dark' : 'light'}>
                  <BodyContent/>
                </div>
                    <Footer />
            </div>
        </div>
    )
};
