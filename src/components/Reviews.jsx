import styles from "../../public/style/Review.module.css"
export default function Reviews() {
    return(
        <div className={styles.reviewform} id="review">
            <form >
                 <h1>Review </h1>
                <label htmlFor="image">choose ur profile</label>
                <input type="image" id="image" />
                <label htmlFor="content">fill all the info</label>
                <input type="text" required placeholder="Enter Your Name" />
                <input type="email" required placeholder="Enter Your Email" />
                <input type="tel" required placeholder="Enter Your Phone-Number" />
                <input type="textarea" required placeholder="Enter Your Feebaxk" />
                <button type="submit">Post now</button>

            </form>
        </div>
    )
}