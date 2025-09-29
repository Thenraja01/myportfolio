import axios from 'axios';
import { saveAs } from 'file-saver';
import React from 'react'
import person from '../../components/icon/user1.jpg'
import person1 from '../../components/icon/user3.jpg'
import { useState ,useContext} from 'react'
import styles from '../../../public/style/Home.module.css'
import { ThemeContext } from '../../dataprovider/ThemeContext';
export default function Home() {
  const [visible, setVisible] = useState(false);
  const {user}=useContext(ThemeContext)
  const toggleVisibility = () => {
    setVisible(!visible);
  };


const handleDownload = async () => {
  try {
    const response = await axios.get('/Thenraja.pdf', {
      responseType: 'blob', // 👈 Important: tells Axios to treat it as binary
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Then_Raja_Resume.pdf'); // 👈 Custom filename
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // 👈 Clean up
  } catch (error) {
    console.error('Download failed:', error);
  }
};

    return (
    <div className={styles.content} id='home'>
      <div className={styles.info}>
          <h1>Welcome to My Portfolio</h1 >
        <p className={styles.jobdesc}>{user.info.jobdesc}</p>
        {visible && <h3 style={{"display":"grid","justifyContent":"center"}}>{user.info.contact.map((conts)=><p>{conts}</p>)}</h3>}
        <button type="button" onClick={toggleVisibility}>Contact Me</button>
      </div>
        <div className={styles.contentmain}>
        <img src={person} alt="Profile" className={styles.profileImage} />
        <div className={styles.userinfo}>
           <h1>{user.data.username}</h1>
          <h3>{user.data.joblevel}</h3>
            <p>{user.data.personnalinfo}</p>
        </div>
        </div>
       
        <div className={styles.aboutcontent} id='about'>
        <h2>About Me</h2>
        <div className={styles.aboutinfo}>
        <img src={person1} alt="Profile" className={styles.profile2}/>
        <p>{user.data.personnalinfo}</p>
<button onClick={handleDownload}>Download CV</button>        </div>
        
        </div>
    </div>
  )
}
