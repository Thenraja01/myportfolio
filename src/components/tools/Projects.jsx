import styles from '../../../public/style/projects.module.css'
export default function Projects() {
    const project=[{name:"Youtube-Static Website" ,
        status:"completed",
        id:1,
        projectdesc:"Developed a static clone of the YouTube homepage using only HTML5 and CSS3, aimed at replicating the structure, layout, and styling of the original platform. This project demonstrates an understanding of responsive web design, layout techniques, and modern UI/UX design principles without using JavaScript or external frameworks.",
                usedskill:['HTML',"CSS","JS"]
    },{name:"Personal-Portfolio wesite",
        status:"progerss",
        id:2,

        projectdesc:"Developed a dynamic and responsive personal portfolio website using React.js to highlight my professional skills, projects, and background. The project showcases a component-based architecture for maintainability and scalability, while offering a smooth, interactive user experience.",
        usedskill:["HTML","CSS","JS",'React-Js']
    },{name:"Single-page Website" ,
        status:"completed",
        id:3,
        projectdesc:"Built a fully responsive Single Page Website (SPA) using vanilla JavaScript, HTML5, and CSS3 to demonstrate core front-end development skills without relying on heavy frameworks. The project emphasizes performance, clean design, and seamless navigation between sections without page reloads.",
        usedskill:['HTML',"CSS",'JS']
    },{name:"Recipe-recommendation-website" ,
        status:"completed",
        id:3,
        projectdesc:"Built a fully responsive Single Page Website (SPA) using vanilla JavaScript, HTML5, and CSS3 to demonstrate core front-end development skills without relying on heavy frameworks. The project emphasizes performance, clean design, and seamless navigation between sections without page reloads.",
        usedskill:['HTML',"CSS",'JS']
    }

]
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