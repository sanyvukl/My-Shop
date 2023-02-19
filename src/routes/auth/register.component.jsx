import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from "react-router-dom";
import registerImg from '../../assets/png/register.png';
import { Card } from '../../components/import.components';
import { toast } from 'react-toastify';
import { Loader } from '../../components/import.components';
import { registerWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { currentUserSelector } from "../../redux/user/user.selector.js";
import "./auth.styles.scss";

const Register = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(currentUserSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        displayName: "",
        confirmPassword: "",
    });

    const resetFormData = () => setFormData({ email: '', displayName: "", password: "", confirmPassword: "" });
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (formData.password !== formData.confirmPassword) {
            setIsLoading(false);
            return toast.error("Passwords don't match");
        }
        try {
            await registerWithEmailAndPassword(formData.email, formData.password, { displayName: formData.displayName });
            resetFormData();
            setIsLoading(false);
            navigate('/login');
            toast.success("Registred Succesfull");
        } catch (error) {
            setIsLoading(false);
            toast.error(error);
        }
    }

    if (currentUser) {
        return <Navigate to={"/"} />
    }

    return (isLoading ? <Loader /> :
        <section className='container auth'>
            <Card>
                <div className="form">
                    <h2>Register</h2>
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
                                <input type="text" name='displayName' onChange={handleDataChange} value={formData.displayName} className='label-input' required />
                                <span className={formData.displayName ? "active" : ''}>
                                    Name
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
                        <label className='label'>
                            <div>
                                <input type="password" name='confirmPassword' onChange={handleDataChange} value={formData.confirmPassword} className='label-input' required />
                                <span className={formData.confirmPassword ? "active" : ''}>
                                    Confirm Password
                                </span>
                            </div>
                        </label>
                        <button className="--btn --btn-primary --btn-block">Register</button>
                    </form>

                    <span className="register">
                        <p>Already have an account?</p>
                        &nbsp;
                        <Link to='/login'>Login</Link>
                    </span>
                </div>
            </Card>
            <div className="auth-img">
                <img src={registerImg} alt="Register" width={400} />
            </div>
        </section>
    )
}

export default Register;