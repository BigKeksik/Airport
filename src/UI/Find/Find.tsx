import { useDispatch, useSelector } from 'react-redux'
import styles from './Find.module.css'
import { changeFind} from '../../redux/slice/findSlice'
import { useEffect, useState } from 'react'
import { RootState } from '../../redux/store'

export default function Find() {
    const { findValue } = useSelector((state: RootState) => state.find)
    const [tempFind, setTempFind] = useState(findValue)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(changeFind(tempFind))
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [tempFind])

    const handleChange = (event: any) => {
        setTempFind(event.target.value)
    }

    return (
        <div className={styles.container}>
            <input
                value={tempFind}
                className={styles.input}
                placeholder='Please enter airport name or code'
                onChange={handleChange}
            />
        </div>
    )
}