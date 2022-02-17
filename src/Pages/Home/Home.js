import React from 'react'
import { useAuthContext } from '../../Components/hooks/useAuthContext';
import { useCollection } from '../../Components/hooks/useCollection'


//styles 
import styles from './Home.module.css'
import Transactionform from './TransactionForm'
import TransactionList from './TransactionList'


export default function Home() {

    const { user } = useAuthContext();
    const { error, documents} = useCollection(
        'transactions',
        ['uid', '==', user.uid],
        ['createdAt', 'desc']
    )

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {error && <p>{error}</p>}
                
                {documents && <TransactionList transactions={documents} />}
            </div>
            <div className={styles.sidebar}>
                <Transactionform uid={ user.uid }/>
            </div>
        </div>
    )
}
