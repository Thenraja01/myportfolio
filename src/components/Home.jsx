import React from 'react'
import person from '../components/download.jpeg'
import styles from '../../public/style/Home.module.css'
export default function Home() {
  data={
  username:"Then Raja",
  joblevel:"Web devoloper",
  jobdesc:"A Web developer who focus on the user interface and user experience side of website and web application .i specialised with JS library likes React JS and freaquently update my skills. ",
  }
  return (
    <div className={styles.content} id='home'>
        <div className={styles.contentmain}>
        <img src={person} alt="personimage" />
        <h1>{data.username}</h1>
        <h3>{data.joblevel}</h3>
            <p>{data.jobdesc}</p>
        </div>
        <div className={styles.aboutcontent} id='about'>
        <h3>About me</h3>
        <img src={person} alt="" />
        <p>
        <h1>HI EVERY ONE</h1>
        {data.jobdesc}
</p>
        </div>
    </div>
  )
}
