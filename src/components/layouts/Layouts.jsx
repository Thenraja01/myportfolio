import Navbar from "../tools/Navbar"
import { useState } from "react"
import Footer from "../tools/Footer"
import BodyContent from "./BodyContent"
import { ThemeProvider } from "../../dataprovider/ThemeContext"
export default function Layouts() {

    return (
        <div className="">
                    <ThemeProvider>
            <div className="">
                <Navbar />
                <div>
                  <BodyContent />
                </div>
                    <Footer />
            </div>
                        </ThemeProvider>
        </div>
    )
};
