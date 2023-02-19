import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from "react-router-dom";
import { Loader } from '../../components/import.components';
import resetImg from '../../assets/png/forgot.png';
import { Card } from '../../components/import.components';
import { sendPasswordReset } from '../../utils/firebase/firebase.utils';
import { currentUserSelector } from "../../redux/user/user.selector.js"; import "./auth.styles.scss";
import "./auth.styles.scss";

const Reset = () => {
    const currentUser = useSelector(currentUserSelector);

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleDataChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await sendPasswordReset(email);
        setIsLoading(false);
    }

    if (currentUser) {
        return <Navigate to={"/"} />
    }

    return (isLoading ? <Loader /> :
        <section className='container auth'>
            <div className="auth-img">
                <img src={resetImg} alt="Reset" width={400} />
            </div>
            <Card>
                <div className="form">
                    <h2>Reset Password</h2>
                    <form onSubmit={onSubmitHandler}>
                        <label className='label'>
                            <div>
                                <input type="email" name='email' onChange={handleDataChange} value={email} className='label-input' required />
                                <span className={email ? "active" : ''}>
                                    Email
                                </span>
                            </div>
                        </label>

                        <button type='submit' className="--btn --btn-primary --btn-block">Reset Password</button>

                        <div className="links">
                            <p>
                                <Link to="/login">- Login</Link>
                            </p>
                            <p>
                                <Link to="/register">- Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </Card>
        </section>
    )
}

export default Reset;