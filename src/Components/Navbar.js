import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//style
import styles from './Navbar.module.css';

//hooks
import { useLogout } from './hooks/useLogout';



export default function Navbar() {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <div className={styles.navbar}>
            <nav className="navbar-logo">
                <ul>

                    <li className={styles.title}><Link to='/'>TRACKr</Link></li>
                    {!user &&
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">SignUp</Link></li>
                        </>
                    }

                    {user && 
                        <>
                            <li>Hello, {user.displayName}</li>
                            <li><button className='btn' onClick={logout}>Logout</button></li>
                        </>
                    }
                </ul>
            </nav>
        </div>
    )
}
