import styles from './UnexpectedErrorMessage.module.css'
import { MdOutlineErrorOutline } from "react-icons/md";

export default function UnexpectedErrorMessage() {
    return(
        <div className={styles.container}>
            <MdOutlineErrorOutline color='rgb(255,0,0)'/>

            <p className={styles.text}>
                Непредвиденная ошибка
            </p>
        </div>
    )
}