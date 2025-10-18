import Navbar from "../tools/Navbar"
import { useState } from "react"
import Footer from "../tools/Footer"
import BodyContent from "./BodyContent"
import { ThemeProvider } from "../../dataprovider/ThemeContext"
export default function Layouts() {
     const goBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    

    return (
        <div className="">
                    <ThemeProvider>
            <div className="">
                <Navbar />
                <div>
                  <BodyContent />
                {/* <button onClick={goBack} style={{"backgroundColor":"green","padding":"12px","borderRadius":"12px","justifyself":"end","width":"auto"}}>Back to top ↑</button> */}
                </div>
                    <Footer />
            </div>
                        </ThemeProvider>
        </div>
    )
};
