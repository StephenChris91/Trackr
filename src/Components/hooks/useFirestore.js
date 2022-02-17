import { useReducer, useEffect, useState } from 'react';
import { db } from '../../Components/firebase/Config';
import { timestamp } from '../../Components/firebase/Config'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {
                isPending: true,
                success: null,
                error: null
            }
        case 'ADDED_DOCUMENT':
            return {
                isPending: false,
                document: action.payload,
                error: null,
                success: true
            }
            case 'DELETE_DOCUMENT':
                return {
                    isPending: false,
                    document: null,
                    error: null,
                    success: true
                }
        case 'ERROR':
            return{ response: null, isPending: false, error: action.payload, success: false }
            default: 
            return state;
        }
    }


export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    //collect Ref
    const ref = db.collection(collection);

    //dispatch if not cancelled

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    }

    //add document
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'});
        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({...doc, createdAt});
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
            console.log('added')
        } catch(error){
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
        }
    }

    //delete Document
    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'});
        try {
            await ref.doc(id).delete();
            dispatchIfNotCancelled({ type: 'DELETE_DOCUMENT' });
        } catch(error){
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true);
        }
    }, [])

    return { response, addDocument, deleteDocument };

}