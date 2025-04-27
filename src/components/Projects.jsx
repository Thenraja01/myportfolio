import styles from '../../public/style/projects.module.css'
export default function Projects() {
    return(
        <div className={styles.projects}  id="projects">
            <h1>My Projects</h1>
            <div className={styles.youtube}>
                <h2>Youtube Static Website</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum dolores quasi saepe ipsam accusantium magni beatae, non maiores, vero dolor numquam, ea consequuntur laboriosam aspernatur exercitationem? Totam accusamus quae minus?</p>
                <ol>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JS</li>
                </ol>
            </div>
            <div className={styles.youtube}>
                <h2>Porfolio  Website</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum dolores quasi saepe ipsam accusantium magni beatae, non maiores, vero dolor numquam, ea consequuntur laboriosam aspernatur exercitationem? Totam accusamus quae minus?</p>
                <ol>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JS</li>
                    <li>React JS</li>
                </ol>
            </div>
        </div>
    )
}