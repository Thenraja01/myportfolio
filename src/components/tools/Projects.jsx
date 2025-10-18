import styles from '../../../public/style/projects.module.css'
import { ThemeContext } from '../../dataprovider/ThemeContext'
import { useContext } from 'react'
export default function Projects() {
  const {project}=useContext(ThemeContext)
  const data=project
const perfectdiv=[]
for (let i=0;i<data.length;i+=3){
perfectdiv.push(data.slice(i,i+3))
}
console.log(perfectdiv)
    return(
        <div className={styles.projects}  id="projects">
            <h1>My Projects</h1>
            <div className={styles.perfectproject}>
            <aside>{data.map((id)=>
                (<div key={id.id}>
                    <h3>{id.name}</h3>
                    <h4>{id.status}</h4>
                    <p>{id.projectdesc}</p>
                    <ol>{id.usedSkills.map((id)=><li><h5>{id}</h5></li>)}</ol>
                </div>))}</aside>
               </div>
            <button className={styles.buttons}>read more</button>
        </div>
    )
}