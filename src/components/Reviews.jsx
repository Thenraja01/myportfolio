import styles from "../../public/style/Review.module.css"
export default function Reviews() {
    return(
        <div className={styles.reviewform} id="review">
            <form >
            <h1>Review </h1>
                <label htmlFor="image">choose ur profile</label>
                <input type="image" id="image" />
                <input type="text" required placeholder="Enter Your Name" />
                <input type="email" required placeholder="Enter Your Email" />
                <input type="tel" required placeholder="Enter Your Phone-Number" />
                <input type="textarea" required placeholder="Enter Your Feebaxk" />
                <label htmlFor="review">Honest Review </label>
                <input type="checkbox" name="review" id="poor" />
                <input type="checkbox" name="review" id="average" />
                <input type="checkbox" name="review" id="medium" />
                <input type="checkbox" name="review" id="exelent" />
                <input type="checkbox" name="review" id="nice" />

                <button type="submit">Post now</button>

            </form>
        </div>
    )
}