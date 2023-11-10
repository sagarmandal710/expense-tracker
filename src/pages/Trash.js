import { useState, useEffect } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
// import context
import useAppState from '../context/AppState';
// import components
import Navbar from '../components/Navbar';
import MenuItem from '../components/MenuItem';
import TrashItem from '../components/TrashItem';

const Trash = () => {

    const [binList, setBinList] = useState([]);
    const [binLoad, setBinLoad] = useState(false);
    const { data } = useAppState();
    useEffect(() => {
        (async () => {
            const mail = data.mail;  // needed to change with user mail
            try {
                const { data } = await axios.get('https://et-backend.vercel.app/trash', {
                    params: { mail }
                });
                setBinList([...data]);
                setBinLoad(true);
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
                    <div className="trash-container">
                        <div className="trash-header">Trash</div>
                        {
                            !binLoad && <div className="trash-image"><HashLoader color="#3590e1" /></div>
                        }
                        {
                            (binList.length === 0 && binLoad) ? <div className="trash-image">
                                <div className="image"></div>
                                <div className="text">Nothing to delete</div>
                            </div>
                                : binList.map(item => <TrashItem key={item._id} expense={item} />)
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Trash;