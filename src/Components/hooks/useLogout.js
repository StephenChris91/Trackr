 import { useState, useEffect } from 'react';
 import { dbAuth } from '../firebase/Config';
 import { useAuthContext } from '../hooks/useAuthContext';
 
 export const useLogout = () => {
        const [isCancelled, setIsCancelled] = useState(false);
        const [error, setError] = useState(null);
        const [isPending, setIsPending] = useState(false);
        const { dispatch } = useAuthContext();
    
        const logout = async () => {
            setError(null);
            setIsPending(true);
            try {
                await dbAuth.signOut();
    
                //dispatch logout action
                dispatch({
                    type: 'LOGOUT'});
                    
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
    
        return { logout, error, isPending };

 }

