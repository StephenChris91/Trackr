import { useEffect, useState, useRef } from 'react'
import { db } from '../../Components/firebase/Config';



export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null); 


    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = db.collection(collection);

        if(query){
            ref = ref.where(...query)
        }

        if(_orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = [];
            snapshot.docs.forEach( doc => {
                results.push({...doc.data(), id: doc.id})
            })


            //update states
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch data')
        })

        return () => unsubscribe()

    }, [collection, query, orderBy])

    return { documents, error}
}