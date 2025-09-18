import styles from '../../../public/style/Education.module.css';
export default function Education() {
    const educationData=[
            {id:1,
            degree:'BE-Computer Science and Engineering',
            institution:'Solamalai College of Engineering',
            year:'2022 - 2026',
            gpa:'7.5'},
            {id:2,
            degree:'Higher Secondary School Certificate (HSC)',
            institution:'Holy Angel Higher Secondary School',
            year:'2021-2022',
            gpa:'76.01'
   },
            {id:3,
            degree:'Secondary School Certificate (SSC)',
            institution:'Holy Angel  Higher Secondary School',
            year:'2019-2020',
            gpa:'77'}]
            const tablehead=['Degree','Institution','Year','GPA/Percentage']
      
    
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
                    {educationData.map((items)=>
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
                       {educationData.map((items)=>
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