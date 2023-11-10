import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import context
import useAppState from '../context/AppState';
// import components
import PageHeader from '../components/PageHeader';
import Navbar from '../components/Navbar';
import MenuItem from '../components/MenuItem';
// import assets
import addExpense from '../assets/images/add-expense.jpg'
// import icons
import { CgNametag } from 'react-icons/cg';
import { LiaMoneyBillSolid } from 'react-icons/lia';

const AddExpense = () => {

    // input focus color change states
    const [focus, setFocus] = useState({
        expense: false,
        desc: false,
        amount: false,
        date: false
    });
    // input text and handler
    const { data } = useAppState();
    const [expenseData, setExpenseData] = useState({
        expenseName: "",
        description: "Meal",
        amount: "",
        mail: data.mail, // needed to change with user mail
        date: "",
    });
    const handleInput = (e) => {
        let { name, value } = e.target;
        setExpenseData({ ...expenseData, [name]: value });
    };
    // post data to backend
    const navigate = useNavigate();
    const headers = {
        "Content-Type": "application/json"
    };
    const postData = async (e) => {
        e.preventDefault();
        if (expenseData.description === "Salary" || expenseData.description === "Freelance") {
            expenseData.expenseType = "credit";
        } else {
            expenseData.expenseType = "debit";
        }
        expenseData.expenseName = expenseData.expenseName && expenseData.expenseName[0].toUpperCase() + expenseData.expenseName.slice(1);
        try {
            const res = await axios.post('https://et-backend.vercel.app/expense', expenseData, {
                headers
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        navigate("/myexpenses");
    };
    const disableFutureDate = () => {
        const today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <Navbar />
            <div className="content">
                <MenuItem />
                <div className="page-content">
                    {/* below 24px is padding i.e. 1.5rem */}
                    <div style={{ height: "calc(100vh - 48px - 24px)" }}>
                        <PageHeader title={"Add Expense"} imageUrl={addExpense} />
                        <form method="post">
                            {/* Expense container */}
                            <div className="input-container">
                                <label htmlFor="expenseName">Expense</label>
                                <div style={{ border: `1px solid ${focus.expense ? "#3590e1" : "#333"}` }} className="input-box">
                                    <input type="text" minLength="3" name="expenseName" placeholder="Expense" autoComplete="false" onChange={handleInput} onFocus={() => setFocus({ ...focus, expense: true })} onBlur={() => setFocus({ ...focus, expense: false })} />
                                    <span><CgNametag /></span>
                                </div>
                            </div>
                            {/* Description container */}
                            <div className="input-container">
                                <label htmlFor="description">Description</label>
                                <div style={{ border: `1px solid ${focus.desc ? "#3590e1" : "#333"}`, paddingRight: "4px" }} className="input-box">
                                    <select name="description" className="drop-down" defaultValue="Meal" onChange={handleInput} onFocus={() => setFocus({ ...focus, desc: true })} onBlur={() => setFocus({ ...focus, desc: false })}>
                                        <option value="Meal">Meal</option>
                                        <option value="Transportation">Transportation</option>
                                        <option value="Groceries">Groceries</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Freelance">Freelance</option>
                                    </select>
                                </div>
                            </div>
                            {/* Amount container */}
                            <div className="input-container">
                                <label htmlFor="amount">Amount</label>
                                <div style={{ border: `1px solid ${focus.amount ? "#3590e1" : "#333"}` }} className="input-box">
                                    <input type="number" min="1" name="amount" placeholder="Amount" onChange={handleInput} onFocus={() => setFocus({ ...focus, amount: true })} onBlur={() => setFocus({ ...focus, amount: false })} />
                                    <span><LiaMoneyBillSolid /></span>
                                </div>
                            </div>
                            {/* Spent on container */}
                            <div className="input-container">
                                <label htmlFor="date">Date</label>
                                <div style={{ border: `1px solid ${focus.date ? "#3590e1" : "#333"}` }} className="input-box">
                                    <input type="date" name="date" placeholder="Date" max={disableFutureDate()} style={{ width: "100%", marginRight: "4px" }} onChange={handleInput} onFocus={() => setFocus({ ...focus, date: true })} onBlur={() => setFocus({ ...focus, date: false })} />
                                </div>
                            </div>
                            {/* submit button */}
                            <div className="submit-button">
                                <button onClick={postData}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddExpense;