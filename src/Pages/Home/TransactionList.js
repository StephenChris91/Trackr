import { useState } from 'react';
import { useFirestore } from '../../Components/hooks/useFirestore';

//styles
import styles from './Home.module.css'

export default function TransactionList( { transactions }) {

    const [ isLoading, setIsLoading ] = useState(true);
    const { deleteDocument, response } = useFirestore('transactions')
    console.log(response)
    

    return (
        <ul className={styles.transactions}>
            {transactions.map((transaction) => (
                <li key={transaction.id}>
                    <p className={styles.name}>{transaction.name}</p>
                    <p className={styles.amount}>₦{transaction.amount}</p>
                    <button onClick={() => deleteDocument(transaction.id)}>x</button>
                </li>
            ))}
        </ul>
    )
}
