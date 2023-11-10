import { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
// import context
import useAppState from '../context/AppState';

const Signin = () => {

    // particle js animation
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadSlim(engine);
    }, [])
    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    // sigin data state
    const [signin, setSignin] = useState({
        userName: "",
        mail: "",
        password: "",
    });
    // login data state
    const [login, setLogin] = useState({
        mail: "",
        password: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignin({ ...signin, [name]: value });
        setLogin({ ...login, [name]: value });
    }
    const navigate = useNavigate();
    const headers = {
        "Content-Type": "application/json"
    }
    const { setMail, setUserName } = useAppState();
    // function to handle signin
    const handleSignin = async (e) => {
        e.preventDefault();
        console.log(signin);
        try {
            const res = await axios.post('https://et-backend.vercel.app/signin', signin, {
                headers
            })
            if (res.status === 609) {
                window.alert("Account already exist");
            } else if (res.status === 200) {
                window.alert("Signin successful");
            }
        } catch (error) {
            console.log(error);
        }
        setUserName(signin.userName);
        setMail(signin.mail);
        navigate('/myexpenses');
    }
    // function to handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://et-backend.vercel.app/login', login, {
                headers
            })
            if (res.status === 610) {
                window.alert("Invalid credentials");
            } else if (res.status === 604) {
                window.alert("User not found");
                setDisplay(!display);
            }
            else if (res.status === 200) {
                window.alert("Login successful");
                setUserName(res.data.ok);
                setMail(login.mail);
                navigate('/myexpenses');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [display, setDisplay] = useState(true);
    const changeView = () => {
        setDisplay(!display);
    }

    return (
        <div className="main-container">
            <Particles id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#0d47a1",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 3,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }} />
            <div className="login-menu">
                <div className="form">
                    <form style={{ display: `${display ? "block" : "none"}` }} method="post" className="register-form">
                        <input type="text" placeholder="username" name="userName" onChange={handleChange} />
                        <input type="email" placeholder="email" name="mail" onChange={handleChange} />
                        <input type="password" placeholder="password" name="password" onChange={handleChange} />
                        <button onClick={handleSignin}>SIGN IN</button>
                        <p className="message">Do you have ann account? <span onClick={changeView}>Log In</span></p>
                    </form>
                    <form style={{ display: `${display ? "none" : "block"}` }} method="post" className="login-form">
                        <input type="email" placeholder="email" name="mail" onChange={handleChange} />
                        <input type="password" placeholder="password" name="password" onChange={handleChange} />
                        <button onClick={handleLogin}>LOG IN</button>
                        <p className="message">Don't have an account? <span onClick={changeView}>Create an account</span></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signin;