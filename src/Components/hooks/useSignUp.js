import { useState, useEffect } from 'react';
import { dbAuth } from '../firebase/Config'
import { useAuthContext } from '../hooks/useAuthContext';

//styles

function useSignUp() {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

   

    const signup = async (email, password, displayName) => {
        setIsPending(true);
        try {
            const res = await dbAuth.createUserWithEmailAndPassword(email, password);
            console.log(res.user)
            if(!res.user) {
                throw new Error('User not found');
            }
            await dbAuth.currentUser.updateProfile({
                displayName
            });

            //dispatch login action
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: res.user
                }
            });

            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
            setIsPending(false);
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

    return { signup, error, isPending };
    
}

export default useSignUp;
