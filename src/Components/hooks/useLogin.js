import { useState, useEffect } from 'react';
import { dbAuth } from '../firebase/Config';
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogin = () => {
       const [isCancelled, setIsCancelled] = useState(false);
       const [error, setError] = useState(null);
       const [isPending, setIsPending] = useState(false);
       const { dispatch, user } = useAuthContext();
   
       const login = async (email, password) => {
           setError(null);
           setIsPending(true);
           try {
               const res = await dbAuth.signInWithEmailAndPassword(email, password);
   
               //dispatch logout action
               if(res.user){
                dispatch({
                    type: 'LOGIN', 
                    payload: res.user
                }); 
               } else{
                   alert('This is not a user')
               }
               
               if(!isCancelled) {
                   setIsPending(false);
                   setError(null);
               }
           } catch (error) {
               if(!isCancelled) {
                   setIsPending(false);
                   setError(null);
               }
           }
           
       }

       useEffect(() => {
           return () => {
               setIsCancelled(true);
           }
       }, [])
   
       return { login, error, isPending };

}

