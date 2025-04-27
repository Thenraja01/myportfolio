import React from 'react'
import person from '../components/download.jpeg'
import styles from '../../public/style/Home.module.css'
export default function Home() {
  return (
    <div className={styles.content} id='home'>
        <div className={styles.contentmain}>
        <img src={person} alt="personimage" />
        <h1>Then Raja</h1>
        <h3>Web devoloper</h3>
        </div>
        <div className={styles.paracontent}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, tempore a amet animi fugiat nisi sed explicabo saepe impedit, velit suscipit nam rem excepturi dolore inventore incidunt quisquam natus in?</p>
        <hr />
        <div className={styles.aboutcontent} id='about'>
        <h3>About me</h3>
        <img src={person} alt="" />
        <p>
        <h1>HI EVERY ONE</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quisquam asperiores ducimus possimus aut consequuntur doloremque omnis! Reprehenderit porro ex quidem molestias in dignissimos reiciendis voluptatibus, earum nobis doloribus asperiores!</p>

        </div>
        </div>
    </div>
  )
}
