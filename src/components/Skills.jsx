import { FaHtml5 } from 'react-icons/fa6';
import { FaCss3Alt } from 'react-icons/fa';
import { FaJs } from 'react-icons/fa';
import styles from '../../public/style/Skills.module.css'
import { FaReact } from 'react-icons/fa';
export default function Skills( ) {
    return(
        <div className={styles.section} id='skills'>
        
                <h3>My Skills</h3>
        <ol>
            <li><div className={styles.contentbox}>
            <FaHtml5 size={40} color="orange" />
            <h4>HTML</h4>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, vel dolor, dolore quidem totam impedit expedita excepturi molestias illum, reprehenderit eum nulla quam omnis facere velit porro dignissimos. Sit, impedit!</p>
                </div></li>
                <li><div className={styles.contentbox}>
                <FaCss3Alt size={30} color="#264de4" />
            <h4>CSS</h4>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora enim vitae nemo quod, ad perspiciatis hic pariatur, exercitationem dolorum corrupti nam dolor cumque ea officiis? Tenetur quaerat quae quidem vero?</p>
                </div></li>
                <li><div className={styles.contentbox}>
                <FaJs size={30} color="#f7df1e" />
            <h4>JS</h4>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque fuga recusandae pariatur aspernatur natus? Quia unde adipisci doloribus velit, ad quos dicta hic reiciendis deserunt consectetur dolorum quis incidunt suscipit.</p>
                </div></li>    <li><div className={styles.contentbox}>
                <FaReact size={30} color="#61DBFB" />
            <h4>React J</h4>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde voluptate alias sequi, culpa iste vitae ratione eius laborum explicabo voluptatum pariatur obcaecati labore incidunt, vero sunt aperiam numquam. Deleniti!</p>
                </div></li>
        </ol>
            
        </div>
    )
}