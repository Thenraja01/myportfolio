import React from 'react'
import person from '../components/download.jpeg'
import styles from '../../public/style/Home.module.css'
export default function Home() {
  const data={
  username:"Then Raja",
  joblevel:"Web devoloper",
  personnalinfo:"Hi, I'm Then Raja, a passionate front-end developer with a strong foundation in HTML, CSS, JavaScript, and React.js. I love building clean, responsive, and user-friendly websites that not only look great but also deliver seamless user experiences. My journey in web development has been hands-on, project-driven, and focused on mastering both the fundamentals and modern tools.",
jobdesc:"Designed and developed a fully responsive personal portfolio website to showcase my professional work, technical skills, and personal projects. The site serves as a digital resume and portfolio, aimed at enhancing my online presence and providing a central hub for potential employers, collaborators, and clients to learn more about me." }
  return (
    <div className={styles.content} id='home'>
        <div className={styles.contentmain}>
        <img src={person} alt="personimage" />
        <h1>{data.username}</h1>
        <h3>{data.joblevel}</h3>
            <p>{data.jobdesc}</p>
        </div>
        <div className={styles.aboutcontent} id='about'>
        <h2>About Me</h2>
        <img src={person} alt="" />
        <p>
        {data.personnalinfo}
</p>
        </div>
    </div>
  )
}
