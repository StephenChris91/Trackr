import { useState } from 'react';
import { useFirestore } from '../../Components/hooks/useFirestore';


export default function Transactionform({ uid }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const {addDocument, response} = useFirestore('transactions');

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid,
            name, 
            amount
        })
        setName('')
        setAmount('')
        console.log(name, amount, uid)
    }

    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}> 
                <label>
                    <span>Transaction Name</span>
                    <input type="text" 
                    placeholder="Transaction Name" 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required />
                </label>
                <label>
                    <span>Amount</span>
                    <input 
                        type="number"
                        placeholder="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        required
                    />
                </label>
                <button>Add Transaction</button>
            </form>
        </>
    )
}
