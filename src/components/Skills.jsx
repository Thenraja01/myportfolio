import { FaHtml5 } from 'react-icons/fa6';
import { FaCss3Alt } from 'react-icons/fa';
import { FaJs} from 'react-icons/fa';
import styles from '../../public/style/Skills.module.css'
import { FaReact } from 'react-icons/fa';
import { RiTailwindCssLine, } from 'react-icons/ri';
import { SiPostman } from "react-icons/si";
import {DiMongodb} from "react-icons/di"
export default function Skills( ) {
    
    const icons=[<FaHtml5 size={40} color="orange" />,<FaCss3Alt size={30} color="#264de4" />,<FaJs size={30} color="#f7df1e" />,<FaReact size={30} color="#61DBFB" />,<RiTailwindCssLine size={30} color="#38bdf8" /> ,<SiPostman color='orange' size={19}/> ,<DiMongodb color='green' size={19}/>]
    return(
        <div className={styles.section} id='skills'>
            <h3>My Skills</h3>
            <div className={styles.skills}>
                 { icons.map((icon, index) => (
                  <li style={{listStyle:"none"} }className={styles.list} >
                        {icon}     
                  </li>
          ))}
        </div>
            </div>
       
    )
}