import styles from './TableElement.module.css'

type Props = {
    name: string,
    code: string,
    lat: string,
    lon: string
}

export default function TableElement({name, code, lat, lon}: Props) {
    return(
        <div className={styles.container}>
            <div className={[styles.flexBlock, styles.rightBorder].join(' ')}>
                <p className={styles.text}>
                    {name + ' (' + code + ')'}
                </p>
            </div>

            <div className={styles.flexBlock}>
                <p className={styles.text}>
                    {lat + ','}
                </p>

                <p className={styles.text}>
                    {lon}
                </p>
            </div>
        </div>
    )
}