import { useState} from 'react';
import  useSignUp from '../../Components/hooks/useSignUp';

//styles
import styles from './SignUp.module.css';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const { signup, error, isPending } = useSignUp();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName);
        setEmail('')
        setPassword('')
        setDisplayName('')
    }


    return (
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
            <h2>Signup</h2>
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
            <label>
                <span>Display Name</span>
                <input
                    type="text"
                    placeholder="Display Name"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            {!isPending && <button className='btn'>Signup</button>}
            {isPending && <button className='btn'>Loading...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    )
}
