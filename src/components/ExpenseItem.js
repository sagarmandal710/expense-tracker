import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import icons
import { BsCreditCard } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { GoTrash } from 'react-icons/go';
import { CgNametag } from 'react-icons/cg';
import { LiaMoneyBillSolid } from 'react-icons/lia';

const ExpenseItem = ({ expense }) => {

    // soft delete expense item
    const [trashItem, setTrashItem] = useState(false);
    const headers = {
        "Content-Type": "application/json"
    };
    const handleTrash = async () => {
        setTrashItem(true);
        const id = expense._id;
        try {
            const res = await axios.patch('https://et-backend.vercel.app/trash', { isDeleted: true }, {
                params: { id },
                headers
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    // edit expense item
    const navigate = useNavigate();
    const [editDisplay, setEditDisplay] = useState(false);
    const [editExpense, setEditExpense] = useState({
        expenseName: expense.expenseName,
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
    });
    const [focus, setFocus] = useState({
        expense: false,
        desc: false,
        amount: false,
        date: false
    });
    const editHandle = (e) => {
        let { name, value } = e.target;
        setEditExpense({ ...editExpense, [name]: value });
    };
    const patchData = async (e) => {
        e.preventDefault();
        setEditDisplay(!editDisplay);
        const id = expense._id;
        console.log("here");
        console.log(editExpense);
        try {
            const res = await axios.patch('https://et-backend.vercel.app/expense', editExpense, {
                params: { id },
                headers
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        navigate(0);
    }
    const cancelPatch = (e) => {
        e.preventDefault();
        setEditDisplay(!editDisplay);
    };

    return (
        <div style={{ display: `${trashItem && "none"}` }} className="expense-container">
            <div style={{ backgroundColor: expense.expenseType === "debit" ? "tomato" : "mediumseagreen" }} className="expense-icon"><BsCreditCard /></div>
            <div className="expense-info">
                <div>
                    <div className="expense-name">{expense.expenseName}</div>
                    <div className="expense-date">{expense.date.split("T")[0]}</div>
                </div>
                <div style={{ color: expense.expenseType === "debit" ? "tomato" : "mediumseagreen" }} className="expense-amount">₹{expense.amount.toLocaleString("en-IN")}</div>
                <div className="expense-desc">{expense.description}</div>
            </div>
            <div className="expense-edit" title="Edit expense" onClick={() => setEditDisplay(!editDisplay)}><FaRegEdit /></div>
            <div className="expense-edit" title="Move to trash" onClick={handleTrash}><GoTrash style={{ marginRight: "2px" }} /></div>
            {/* edit container */}
            <div style={{ display: `${editDisplay ? "flex" : "none"}` }} className="edit-container">
                <form method="post">
                    <div style={{ border: `1px solid ${focus.expense ? "#3590e1" : "#333"}` }} className="input-box">
                        <input type="text" minLength="3" name="expenseName" placeholder={expense.expenseName} autoComplete="false" onChange={editHandle} onFocus={() => setFocus({ ...focus, expense: true })} onBlur={() => setFocus({ ...focus, expense: false })} />
                        <span><CgNametag /></span>
                    </div>
                    <div style={{ border: `1px solid ${focus.desc ? "#3590e1" : "#333"}`, paddingRight: "4px" }} className="input-box">
                        <select name="description" className="drop-down" defaultValue={expense.description} onChange={editHandle} onFocus={() => setFocus({ ...focus, desc: true })} onBlur={() => setFocus({ ...focus, desc: false })}>
                            <option value="Meal">Meal</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Salary">Salary</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                    <div style={{ border: `1px solid ${focus.amount ? "#3590e1" : "#333"}` }} className="input-box">
                        <input type="number" min="1" name="amount" placeholder={expense.amount.toLocaleString("en-IN")} onChange={editHandle} onFocus={() => setFocus({ ...focus, amount: true })} onBlur={() => setFocus({ ...focus, amount: false })} />
                        <span><LiaMoneyBillSolid /></span>
                    </div>
                    <div style={{ border: `1px solid ${focus.date ? "#3590e1" : "#333"}` }} className="input-box">
                        <input type="date" name="date" placeholder={expense.date.split("T")[0]} style={{ width: "100%", marginRight: "4px" }} onChange={editHandle} onFocus={() => setFocus({ ...focus, date: true })} onBlur={() => setFocus({ ...focus, date: false })} />
                    </div>
                    <div className="edit-button">
                        <button onClick={patchData} className="save">Save</button>
                        <button onClick={cancelPatch} className="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ExpenseItem;