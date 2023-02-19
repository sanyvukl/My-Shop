import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Loader } from "../../components/import.components";
import { logOutUser } from '../../utils/firebase/firebase.utils';
import { REMOVE_ACTIVE_USER } from '../../redux/user/user.slice';
import { selectCartTotalQuantity } from '../../redux/cart/cart.slice';
import { currentUserSelector } from "../../redux/user/user.selector.js";
import "./header.styles.scss";

const Logo = () => {
    return <div className="logo">
        <Link to={"/"}>
            <h2>a<span>Sop</span>.</h2>
        </Link>
    </div>
}
const Cart = ({ quantity }) => {
    return <span className="cart">
        <Link to={"/cart"}>
            Cart
            <FaShoppingCart size={20} />
            <p>{quantity}</p>
        </Link>
    </span>
}

const Header = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(currentUserSelector);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const [showMenu, setShowMenu] = useState(false);
    const [scrollPage, setScrollPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toggleShowMenu = () => setShowMenu(!showMenu);
    const hideMenu = () => setShowMenu(false);

    const onLogOut = async () => {
        setIsLoading(true);
        try {
            // Log out firebase
            await logOutUser();
            // Log out state
            dispatch(REMOVE_ACTIVE_USER());
            toast.success('Log out succesfully');
        } catch (error) {
            toast.error(error);
        }
        setIsLoading(false);
    }
    const fixNavBar = () => {
        // if (window.scrollY > Number(document.getElementById("header").offsetHeight)) {
        if (window.scrollY > 200) {
            setScrollPage(true);
        } else {
            setScrollPage(false);
        }
    }
    window.addEventListener("scroll", fixNavBar);
    // CSS
    const activeLink = (state) => state.isActive ? "active" : '';

    return (
        isLoading ? <Loader /> :
            <header className={scrollPage ? 'fixed' : null} id="header">
                <div className="header">
                    <Logo />
                    <div className={showMenu ? 'nav-wrapper show-nav-wrapper' : 'nav-wrapper'}>
                    </div>
                    <nav className={showMenu ? 'show-nav' : 'hide-nav'}>
                        <ul onClick={hideMenu}>
                            <li className='logo-mobile'>
                                <Logo />
                                <FaTimes size={22} color='#fff' onClick={hideMenu} />
                            </li>
                            {currentUser?.userID === "jNhhImKK8WaxBMVDbysIMTWK6ds2" &&
                                <li><Link to={"/admin/home"}>
                                    <button className='--btn --btn-primary'>Admin</button>
                                </Link></li>
                            }
                            <li><NavLink to={"/"} className={activeLink}>Home</NavLink></li>
                            <li><NavLink to={"/contact"} className={activeLink}>Contact Us</NavLink></li>
                        </ul>
                        <div className="header-right" onClick={hideMenu}>
                            <span className="links">
                                {/* if user is logged in hide login & register and if not hide log out */}
                                {currentUser ?
                                    <Fragment>
                                        <Link to={"/"} style={{ color: "#ff7722" }}>
                                            <FaUserCircle /> Hi, {currentUser?.userName}
                                        </Link>
                                        <Link to={"/"} onClick={onLogOut}>Log out</Link>
                                        <NavLink to={"/order-history"} className={activeLink}>My Orders</NavLink>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <NavLink to={"/login"} className={activeLink}>Login</NavLink>
                                        <NavLink to={"/register"} className={activeLink}>Register</NavLink>
                                    </Fragment>
                                }
                            </span>
                            <Cart quantity={cartTotalQuantity} />
                        </div>
                    </nav>
                    <div className="menu-icon">
                        <Cart quantity={cartTotalQuantity} />
                        <HiOutlineMenuAlt2 size={28} onClick={toggleShowMenu} />
                    </div>
                </div>
            </header>
    )
}

export default Header