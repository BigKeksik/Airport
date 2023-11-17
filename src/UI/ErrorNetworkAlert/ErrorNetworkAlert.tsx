import styles from './ErrorNetworkAlert.module.css'
import { RiSignalWifiErrorLine } from "react-icons/ri";

export default function ErrorNetworkAlert() {
    return(
        <div className={styles.container}>
            <RiSignalWifiErrorLine color='rgb(255,0,0)'/>

            <p className={styles.text}>
                Ошибка соединения
            </p>
        </div>
    )
}