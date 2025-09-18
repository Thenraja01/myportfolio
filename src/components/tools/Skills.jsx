import { FaHtml5 } from 'react-icons/fa6';
import { FaCss3Alt } from 'react-icons/fa';
import { FaJs } from 'react-icons/fa';
import styles from '../../../public/style/Skills.module.css'
import { FaReact } from 'react-icons/fa';
import { RiTailwindCssLine, } from 'react-icons/ri';
import { SiPostman } from "react-icons/si";
import { DiMongodb } from "react-icons/di"
export default function Skills() {
  const percentage = [90, 80, 70, 90, 70, 90]
  const icons = [<FaHtml5 size={40} color="orange" />, <FaCss3Alt size={30} color="#264de4" />, <FaJs size={30} color="#f7df1e" />, <FaReact size={30} color="#61DBFB" />, <RiTailwindCssLine size={30} color="#38bdf8" />, <SiPostman color='orange' size={19} />, <DiMongodb color='green' size={19} />]
  const skills = ["html", "css", "js", "python", "tailwindcss", "mern stack"]
  return (
    <div className={styles.skillset}>

      <h3>My Skills</h3>
      <div className={styles.section} id='skills'>
        <div className={styles.skills}>
          {icons.map((icon, index) => (
            <li key={icon.index} style={{ listStyle: "none" }} className={styles.list} >
              {icon}
            </li>
          ))}
        </div>
        <div className={styles.techskills}>
          <h1>technical skills</h1>
          {skills.map((tech) => <div style={{ "display": "flex", "alignItems": "center" }}><h2>{tech}</h2>
            <div className={styles.percentagecontainer}>
              <div className={styles.percentagebar}>
               <div
                  className={styles.percentagefill}
                  style={{ width:"90%"}}>    
              </div>
              </div>
            </div>
          </div>
          )}
        </div>

      </div>
    </div>

  )
}