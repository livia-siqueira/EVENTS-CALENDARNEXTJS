import Link from "next/link"
import styles from './Button.module.css'



export const Button = ({ children, link, click }) => {
    if (link) {
        return <Link href={link}>
            <a className={styles.btn}>{children}</a>
        </Link>
    }

    return <button className={styles.btn} onClick={click}>{children}</button>
}