import { useState, useEffect } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
// import context
import useAppState from '../context/AppState';
// import components
import Navbar from '../components/Navbar';
import MenuItem from '../components/MenuItem';
import PageHeader from '../components/PageHeader';
import ExpenseItem from '../components/ExpenseItem';
// import assets
import myExpenses from '../assets/images/my-expenses.jpg';

const MyExpenses = () => {

    // get expense data of user
    const [expenseList, setExpenseList] = useState([]); // state to store data
    const [expenseLoad, setExpenseLoad] = useState(false);    // load list after data is fetched
    const { data } = useAppState();
    useEffect(() => {
        (async () => {
            const mail = data.mail;  // needed to change with user mail
            try {
                const { data } = await axios.get('https://et-backend.vercel.app/expense', {
                    params: { mail }
                });
                setExpenseList([...data]);
                setExpenseLoad(true);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <Navbar />
            <div className="content">
                <MenuItem />
                <div className="page-content">
                    <PageHeader title={"My Expenses"} imageUrl={myExpenses} />
                    {
                        expenseLoad ? expenseList.map(item => <ExpenseItem expense={item} key={item._id} />)
                            : <div className="loading"><HashLoader color="#3590e1" /></div>
                    }
                </div>
            </div>
        </>
    );
}

export default MyExpenses;