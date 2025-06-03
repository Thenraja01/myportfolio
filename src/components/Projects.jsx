import styles from '../../public/style/projects.module.css'
export default function Projects() {
    const project=[{name:"Youtube-Static Website" ,
        status:"completed",
        id:1,
        projectdesc:"hiLorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente sequi magni quasi illo error alias. Vel, vero nemo delectus consectetur optio molestiae, consequatur iste, mollitia dignissimos beatae voluptates cum maiores!",
        usedskill:['HTML',"CSS","JS"]
    },{name:"Personal-Portfolio wesite",
        status:"progerss",
        id:2,

        projectdesc:"heloo",
        usedskill:["HTML","CSS","JS",'React-Js']
    },{name:"Single-page Website" ,
        status:"completed",
        id:3,
        projectdesc:"prodec",
        usedskill:['HTML',"CSS",'JS']
    }]
    return(
        <div className={styles.projects}  id="projects">
            <h1>My Projects</h1>
            <div className={styles.youtube}>
            <aside>{project.map((id)=>
                (<div key={id}>
                    <h3>{id.name}</h3>
                    <h4>{id.status}</h4>
                    <p>{id.projectdesc}</p>
                    <ol>{id.usedskill.map((id)=><li><h5>{id}</h5></li>)}</ol>
                </div>))}</aside>
             
            </div>   
        </div>
    )
}