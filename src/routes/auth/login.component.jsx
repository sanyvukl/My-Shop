import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { currentUserSelector } from "../../redux/user/user.selector.js";
import loginImg from '../../assets/png/login.png';
import { FaGoogle } from "react-icons/fa";
import { Card } from '../../components/import.components';
import { Loader } from '../../components/import.components';
import { toast } from 'react-toastify';
import { signInUserWithEmailAndPassword, logInWithGooglePopUp } from '../../utils/firebase/firebase.utils';
import { selectCartPreviousUrl } from '../../redux/cart/cart.slice.js';
import "./auth.styles.scss";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(currentUserSelector);
    const previousUrl = useSelector(selectCartPreviousUrl);
    console.log(previousUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const resetFormData = () => setFormData({ email: '', password: "" });

    const redirectUser = () => {
        if (previousUrl.includes("cart")) {
            return navigate("/cart");
        }
        navigate("/");
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signInUserWithEmailAndPassword(formData.email, formData.password);
            //    
            resetFormData();
            setIsLoading(false);
            redirectUser();
            toast.success("Log In Succesfull");
        } catch (error) {
            setIsLoading(false);
            toast.error(error);
        }
    }
    const googleLogin = async () => {
        try {
            await logInWithGooglePopUp();
            redirectUser();
        } catch (error) {
            toast.error(error.message);
        }
    }

    if (currentUser) {
        return <Navigate to={"/"} />;
    }
    return (isLoading ? <Loader /> :
        <section className='container auth'>
            <div className="auth-img">
                <img src={loginImg} alt="Login" width={400} />
            </div>
            <Card>
                <div className="form">
                    <h2>Login</h2>
                    <form onSubmit={onSubmitHandler}>
                        <label className='label'>
                            <div>
                                <input type="email" name='email' onChange={handleDataChange} value={formData.email} className='label-input' required />
                                <span className={formData.email ? "active" : ''}>
                                    Email
                                </span>
                            </div>
                        </label>
                        <label className='label'>
                            <div>
                                <input type="password" name='password' onChange={handleDataChange} value={formData.password} className='label-input' required />
                                <span className={formData.password ? "active" : ''}>
                                    Password
                                </span>
                            </div>
                        </label>
                        <button className="--btn --btn-primary --btn-block">Login</button>
                        <div className="links">
                            <Link to="/reset">Reset Password</Link>
                        </div>
                        <p>-- or --</p>
                    </form>
                    <button className="--btn --btn-danger --btn-block" onClick={googleLogin}>
                        <FaGoogle color='#fff' />
                        <span style={{ marginLeft: "5px" }}>Login With Google</span>
                    </button>
                    <span className="register">
                        <p>Don't have an account?</p>
                        &nbsp;
                        <Link to='/register'>Register</Link>
                    </span>
                </div>
            </Card>
        </section >
    )
}

export default Login;