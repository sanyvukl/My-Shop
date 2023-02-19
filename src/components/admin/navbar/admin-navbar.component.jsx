import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../redux/user/user.selector';
import "./admin-navbar.styles.scss";

const AdminNavbar = () => {
    const currentUser = useSelector(currentUserSelector);
    // CSS
    const activeLink = (state) => state.isActive ? "active" : '';
    
    // window.location.pathname.includes("/admin/edit-product");

    return (
        <div className='navbar'>
            <div className="user">
                <FaUserCircle size={40} color="#fff" />
                <h4>
                    {currentUser.userName}
                </h4>
            </div>
            <nav>
                <ul>

                    <li>
                        <NavLink to={"/admin/home"} className={activeLink}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/admin/all-products"} className={activeLink}>
                            View products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/admin/create-product"} className={activeLink}>
                            Create product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/admin/orders"} className={activeLink}>
                            View Orders
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default AdminNavbar;