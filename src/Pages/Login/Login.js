import { useState } from 'react';
import { useLogin } from '../../Components/hooks/useLogin';


// styles
import styles from './Login.module.css';

export default function Login() {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useLogin()
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        login(email, password);
        setEmail('')
        setPassword('')
    }

    return (
        <form className={styles['login-form']} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                <span>Email</span>
                <input 
                type="email" 
                placeholder="Email" 
                
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
            </label>
            <label>
                <span>Password</span>
                <input 
                type="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            </label>
            {!isPending && <button className='btn'>Login</button>}
            {isPending && <button className='btn' disabled>Loading...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    )
}
