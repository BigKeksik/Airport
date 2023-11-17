import { useContext, useEffect } from 'react'
import TableElement from '../Element/TableElement'
import styles from './Table.module.css'
import { loadingContext } from '../../context/isLoadingContext'
import { ColorRing } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setFalseSomeoneFind, setTrueSomeoneFind } from '../../redux/slice/findSlice'

type Props = {
    data: Array<any>,
    secondData: Array<any> | null
}

export default function Table({data, secondData}: Props) {
    const { findValue } = useSelector((state: RootState) => state.find)
    const { isNetworkError, isUnexpectedError } = useSelector((state: RootState) => state.error)
    const { isLoading } = useContext(loadingContext)
    const dispatch = useDispatch()

    useEffect(() => {
        if (data.length > 0) {
            if (data.some((elem) => elem.name.toLowerCase().includes(findValue.toLowerCase()) || elem.iata.toLowerCase().includes(findValue.toLowerCase()))) {
                dispatch(setTrueSomeoneFind())
            } else {
                dispatch(setFalseSomeoneFind())
            }
        }
    
        return () => {
            dispatch(setTrueSomeoneFind())
        }
    }, [findValue])    

    const isFind = (element: any) => {
        if (element.name.toLowerCase().includes(findValue.toLowerCase()) || element.iata.toLowerCase().includes(findValue.toLowerCase())) {
            return true
        }

        return false
    }

    return(
        <div className={styles.container}>
            <div className={styles.tableHead}>
                <div className={[styles.flexBlock, styles.rightBorder].join(' ')}>
                    <p className={styles.text}>
                        <b>{'Name (Code)'}</b>
                    </p>
                </div>

                <div className={styles.flexBlock}>
                    <p className={styles.text}>
                        <b>{'Lat & Lng'}</b>
                    </p>
                </div>
            </div>

            {isLoading &&
                <div className={styles.loadingBlock}>
                    <ColorRing
                        visible={true}
                        colors={['000', '000', '000', '000', '000']}
                    />
                </div>
            }
            
            {!isLoading && !!data && !isNetworkError && !isUnexpectedError && 
                <div className={styles.tableElements}>
                    {data.map((elem: any, index: number) => (
                        <div key={index}>
                            {isFind(elem) &&
                                <TableElement 
                                    name={elem.name}
                                    code={!!elem.iata ? elem.iata : elem.icao}
                                    lat={elem.latitude}
                                    lon={elem.longitude}
                                />
                            }
                        </div>                        
                    ))}
                </div>
            }

            {!isLoading && !!secondData && !isNetworkError && !isUnexpectedError && 
                <div className={styles.tableElements}> 
                    {secondData.map((elem: any, index: number) => (
                        <div key={index}>
                            {isFind(elem) && 
                                <TableElement 
                                    name={elem.name}
                                    code={!!elem.iata ? elem.iata : elem.icao}
                                    lat={elem.latitude}
                                    lon={elem.longitude}
                                />
                            }
                            
                        </div>                        
                    ))}
                </div>
            }
            
        </div>
    )
}