import { useState } from 'react';
import axios from 'axios';
// import icons
import { BsCreditCard } from 'react-icons/bs';
import { PiRecycleBold } from 'react-icons/pi';
import { GoTrash } from 'react-icons/go';

const TrashItem = ({ expense }) => {

    // recover expense item
    const [removeItem, setRemoveItem] = useState(false);
    const headers = {
        "Content-Type": "application/json"
    };
    const id = expense._id;
    const handleRecover = async () => {
        setRemoveItem(true);
        try {
            const res = await axios.patch('https://et-backend.vercel.app/recover', { isDeleted: false }, {
                params: { id },
                headers
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    // delete permanently expense item
    const handleDelete = async () => {
        setRemoveItem(true);
        try {
            const res = await axios.delete('https://et-backend.vercel.app/expense', {
                params: { id }
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ display: `${removeItem && "none"}` }} className="expense-container">
            <div style={{ backgroundColor: expense.expenseType === "debit" ? "tomato" : "mediumseagreen" }} className="expense-icon"><BsCreditCard /></div>
            <div className="expense-info">
                <div>
                    <div className="expense-name">{expense.expenseName}</div>
                    <div className="expense-date">{expense.date.split("T")[0]}</div>
                </div>
                <div style={{ color: expense.expenseType === "debit" ? "tomato" : "mediumseagreen" }} className="expense-amount">₹{expense.amount.toLocaleString("en-IN")}</div>
                <div className="expense-desc">{expense.description}</div>
            </div>
            <div className="expense-edit" title="Recover item" onClick={handleRecover}><PiRecycleBold /></div>
            <div className="expense-edit" title="Delete permanently" onClick={handleDelete}><GoTrash style={{ marginRight: "2px" }} /></div>
        </div>
    );
}

export default TrashItem;