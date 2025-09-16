import React from 'react'
import person from '../components/icon/user1.jpeg'
import person1 from '../components/icon/user3.jpeg'
import { useState } from 'react'
import styles from '../../public/style/Home.module.css'
export default function Home() {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const info ={
    career:"Web Developer",
    jobdesc:"I am a passionate web developer with a focus on creating dynamic and responsive web applications. I have a strong foundation in HTML, CSS, and JavaScript, and I am continuously learning new technologies to enhance my skills. My goal is to build user-friendly websites that provide an excellent user experience.",
    contact:["Email: thenwthen@gmail.com", "Phone: 7418869396"]
  }
  const data={
    username:"Then Raja",
    joblevel:"Web devoloper",
    personnalinfo:"Hi, I'm Then Raja, I’m a passionate and aspiring web developer currently pursuing a Bachelor’s in Computer Science and Engineering (B.E. CSE). I specialize in building dynamic, responsive, and user-friendly websites using modern web technologies. With a solid foundation in computer science and a growing portfolio of web projects, I am focused on continuously improving my skills and contributing to impactful digital experiences." }
  return (
    <div className={styles.content} id='home'>
      <div className={styles.info}>
          <h1>Welcome to My Portfolio</h1 >
        <p className={styles.jobdesc}>{info.jobdesc}</p>
        {visible && <h3 style={{"display":"grid","justifyContent":"center"}}>{info.contact.map((conts)=><p>{conts}</p>)}</h3>}
        <button type="button" onClick={toggleVisibility}>Contact Me</button>
      </div>
        <div className={styles.contentmain}>
        <img src={person} alt="Profile" className={styles.profileImage} />
        <div className={styles.userinfo}>
           <h1>{data.username}</h1>
          <h3>{data.joblevel}</h3>
            <p>{data.personnalinfo}</p>
        </div>
        </div>
       
        <div className={styles.aboutcontent} id='about'>
        <h2>About Me</h2>
        <div className={styles.aboutinfo}>
        <img src={person1} alt="Profile" className={styles.profile2}/>
        <p>{data.personnalinfo}</p>
      <button>Download CV</button>
        </div>
        
        </div>
    </div>
  )
}
