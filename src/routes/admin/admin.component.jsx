import { Outlet } from 'react-router-dom';
import { AdminNavbar } from '../../components/admin/import.admin.components';
import "./admin.styles.scss";

const Admin = () => {
    return (
        <div className="admin">
            <AdminNavbar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default Admin;