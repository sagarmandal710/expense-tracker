import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import icons
import { AiOutlineDashboard } from 'react-icons/ai';
import { TbReportMoney } from 'react-icons/tb';
import { GoTrash } from 'react-icons/go';
import { MdLogout } from 'react-icons/md';
import { FaAngleRight } from 'react-icons/fa6';
import { BsClipboard2Plus, BsReceipt } from 'react-icons/bs';

const MenuItem = () => {

    // style of active navlink for main menu
    const mainStyle = {
        backgroundColor: "#5b6c7c",
        color: "white"
    }
    // style for drop down icon i.e. sub menu items
    const [submenu, setSubmenu] = useState(false);
    const arrowDown = {
        transform: "rotate(90deg)",
        transition: "transform 0.15s linear"
    }
    // style of active navlink for sub menu
    const subStyle = {
        backgroundColor: "#000",
        color: "#3590e1"
    }
    const location = useLocation();
    const path = location.pathname;
    useEffect(() => {
        (path !== "/addexpense" && path !== "/myexpenses")
        ? setSubmenu(false)
        : setSubmenu(true);
    }, [path])
    const navigate = useNavigate();
    const logout = () => {
        navigate("/", {replace: true});
    }


    return (
        <div className="side-drawer">
            {/* Expenses menu */}
            <>
                <div style={submenu ? mainStyle : undefined} className="menu-container" onClick={() => setSubmenu(!submenu)}>
                    <span className="menu-icon"><TbReportMoney /></span>
                    <span className="menu-text">Expenses</span>
                    <span style={submenu ? arrowDown : { transition: "transform 0.15s linear" }} className="drop-down"><FaAngleRight /></span>
                </div>
                {/* Sub menu in expenses */}
                <div style={submenu ? { display: "block" } : { display: "none" }} className="sub-menu-container">
                    <NavLink to="/addexpense" style={({ isActive }) => isActive ? subStyle : undefined} className="sub-menu">
                        <span className="sub-menu-icon"><BsClipboard2Plus /></span>
                        <span className="sub-menu-text">Add Expense</span>
                    </NavLink>
                    <NavLink to="/myexpenses" style={({ isActive }) => isActive ? subStyle : undefined} className="sub-menu">
                        <span className="sub-menu-icon"><BsReceipt /></span>
                        <span className="sub-menu-text">My Expenses</span>
                    </NavLink>
                </div>
            </>

            {/* Bin menu */}
            <NavLink to="/bin" style={({ isActive }) => isActive ? mainStyle : undefined} className="menu-container">
                <span className="menu-icon"><GoTrash /></span>
                <span className="menu-text">Trash</span>
            </NavLink>

            {/* Logout menu */}
            <div className="menu-container" onClick={logout}>
                <span className="menu-icon"><MdLogout /></span>
                <span className="menu-text">Logout</span>
            </div>
        </div>
    );
}

export default MenuItem;