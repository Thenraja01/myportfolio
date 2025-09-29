import styles from '../../../public/style/Education.module.css';
import { ThemeContext } from '../../dataprovider/ThemeContext';
import { useContext } from 'react';
export default function Education() {
     const tablehead=['Degree','Institution','Year','GPA/Percentage']
      const {Value}=useContext(ThemeContext)
    const edu=Value
    return (
        <div id="education" className={styles.education }>

            <h2>Education</h2>
            <p>Details about my education will show here</p>
            <table>
                <thead>
                    <tr>
                       {tablehead.map((items,id)=>(
                           <th key={id}>{items}</th>
                        ))}    
                    </tr>
                </thead>
                <tbody>
                    {edu.educationData.map((items)=>
                        <tr key={items.id}>
                            <td>{items.degree}</td>
                            <td>{items.institution}</td>
                            <td>{items.year}</td>
                            <td>{items.gpa}</td>
                        </tr>
                    )}
                  </tbody>  
        
            </table>
            <div className="">
                <div >
                       {edu.educationData.map((items)=>
                        <div key={items.id} className={styles.contenthead}>
                            <div className={styles.contentbody}>
                                <div className={styles.contentupper}>
                            <h3>{items.institution}</h3>
                            <h4>{items.degree}</h4>
                                </div>
                            <div className={styles.contentlower}>
                            <p>{items.year}</p>
                            <h3>{items.gpa}%
                            </h3>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
                    </div>
    );
}