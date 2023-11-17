import { useDispatch } from 'react-redux'
import styles from './Find.module.css'
import { changeFind} from '../../redux/slice/findSlice'

export default function Find() {
    const dispatch = useDispatch()
    
    const handleChange = (event: any) => {
        dispatch(changeFind(event.target.value))
    }

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                placeholder='Please enter airport name or code'
                onChange={handleChange}
            />
        </div>
    )
}