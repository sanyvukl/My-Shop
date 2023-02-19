import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader } from "../import.components";
import { currentUserSelector, isLoadingSelector } from "../../redux/user/user.selector";
import Admin from "../../routes/admin/admin.component";

const AdminRoute = () => {
    const currentUser = useSelector(currentUserSelector);
    const isLoading = useSelector(isLoadingSelector);

    if (isLoading) {
        return <Loader />;
    }

    return currentUser?.userID === "jNhhImKK8WaxBMVDbysIMTWK6ds2"
        ? <Admin />
        : <Navigate to={"/"} />
}

export default AdminRoute;