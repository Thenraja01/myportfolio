import Styles from "../../../public/style/Footer.module.css"
export default function Footer() {
    return(
        <div className={Styles.footer}>
            <div className={Styles.name}>
                <h1>Then Raja</h1>
            </div>
            <div className={Styles.owner}>
            <p>DEVELOPED BY THENRAJA</p>
            </div>
            <div className="">
            <button>contact me</button>
            </div>
        </div>
    )
    
};
