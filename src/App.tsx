import { useEffect, useState } from 'react';
import styles from './App.module.css'
import Table from './UI/Table/Table';
import { useApiRequest } from './hook/useApiRequest';
import { loadingContext } from './context/isLoadingContext';
import Find from './UI/Find/Find';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import ErrorNetworkAlert from './UI/ErrorNetworkAlert/ErrorNetworkAlert';
import { AnimatePresence, motion } from 'framer-motion';
import UnexpectedErrorMessage from './UI/UnexpectedErrorMessage/UnexpectedErrorMessage';

function App() {
  const [ airport, setAirport ] = useState<Array<any>>([])
  const [ secondAirport, setSecondAirport ] = useState<Array<any>>([])
  const { GET_ALL_AIRPORT, GET_AIRPORT_BY_NAME, GET_AIRPORT_BY_CODE, isLoading } = useApiRequest()
  const { findValue, someoneFind } = useSelector((state: RootState) => state.find)
  const { isNetworkError, isUnexpectedError } = useSelector((state: RootState) => state.error)

  useEffect(() => {
    const query = async () => {
      const data = await GET_ALL_AIRPORT()

      if (isNetworkError || isUnexpectedError) {
        setAirport([])
        return
      }

      setAirport(data)
    }
    
    query()

    return () => {
      console.log('Refresh')
    }
  }, [])

  useEffect(() => {
    if (!someoneFind) {
      const query = async () => {
        let tempArray = new Array<any>

        let firstData = await GET_AIRPORT_BY_NAME(findValue)

        if (isNetworkError || isUnexpectedError || firstData.length === 0) {
          tempArray = []
        } else {
          tempArray.push(...firstData)
        }

        if (findValue.length === 3) {
          let secondData = await GET_AIRPORT_BY_CODE(findValue)

          if (isNetworkError || isUnexpectedError || secondData.length === 0) {
            tempArray = []
          } else {
            tempArray.push(...secondData)
          }
        }       

        setSecondAirport(tempArray)
      }
      
      query()
    }
  }, [someoneFind, findValue])
  
  return (
    <div className={styles.container} >
      <Find />

      <loadingContext.Provider value={{isLoading}} >
        <Table
          data={airport}
          secondData={someoneFind ? null : secondAirport}
        />
      </loadingContext.Provider>  


      <AnimatePresence>
        {(isNetworkError || isUnexpectedError) &&
          <motion.div
            key={'network'}
            className={styles.errorMessage}
            initial={{y: 30, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: 30, opacity: 0}}
            transition={{
              delay: .5,
              duration: .4
            }}
          >
            {isNetworkError &&
              <ErrorNetworkAlert />
            }

            {!isNetworkError &&
              <UnexpectedErrorMessage />
            }
            
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
}

export default App;
