// import context
import useAppState from '../context/AppState';
// import icons
import { IoWallet } from 'react-icons/io5';
import { GiNinjaHead } from 'react-icons/gi';

const Navbar = () => {

    const { data } = useAppState();
    return (
        <div className="header">
            <div className="brand">
                <div>
                    <IoWallet style={{ fontSize: "28px" }} />
                    <span>Expenses</span>
                </div>
            </div>
            <div className="account">
                <div className="notification">
                    <GiNinjaHead style={{ fontSize: "28px" }} />
                    <span>{data.userName}</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;