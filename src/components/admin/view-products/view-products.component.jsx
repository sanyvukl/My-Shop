import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PRODUCT, productsSelector, isLoadingSelector } from "../../../redux/product/product.slice";
import { deleteProductDocument } from "../../../utils/firebase/firebase.utils";
import { Loader, Table } from "../../import.components";
import Notiflix from "notiflix";
import { toast } from "react-toastify";
import { Search, Pagination } from "../../import.components";
import "./view-products.styles.scss";

const ViewProducts = () => {
    const dispatch = useDispatch();
    const [products, isLoading] = [useSelector(productsSelector), useSelector(isLoadingSelector)];
    const [filter, setFilter] = useState('');
    const [filtredPrd, setFiltredPrd] = useState(products);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let totalPages = Math.ceil(products.length / itemsPerPage);

    const onDelete = async (id, imageUrls) => {
        Notiflix.Confirm.show(
            'Delete Product!!!',
            'You are in about to delete product',
            'Delete',
            'Cancel',
            async function okCb() {
                try {
                    await deleteProductDocument(id, imageUrls);
                    dispatch(DELETE_PRODUCT(id));
                    toast.success("Product was deleted");
                } catch (error) {
                    toast.error(error);
                }
            },
            function cancelCb() {
                console.log("canceled");
            },
            {
                width: '320px',
                borderRadius: '3px',
                titleColor: "orangered",
                okButtonBackground: "orangered",
                cssAnimationStyle: "zoom",
            },
        );
        // if (window.confirm("Do you really want to delete?")) {
        //     try {
        //         await deleteProductDocument(id, imageUrls);
        //         dispatch(DELETE_PRODUCT(id));
        //         toast.success("Product was deleted");
        //     } catch (error) {
        //         toast.error(error);
        //     }
        // }
    }
    const onSearchProduct = (e) => {
        const { value } = e.target;
        setFilter(value);
        setCurrentPage(1);
        setFiltredPrd(products.filter(({ data }) =>
            data.name.toLowerCase().includes(value.toLowerCase())
            ||
            data.category.toLowerCase().includes(value.toLowerCase())
        ));
    };

    return (isLoading ? <Loader /> :
        <div className="table">
            <h2>All Products</h2>
            <Search handleChange={onSearchProduct} value={filter} />
            {products.length === 0 ? (
                <p>No product found</p>
            ) : (
                <Fragment>
                    <Table products={filtredPrd.slice(indexOfFirstItem, indexOfLastItem)} edit={true} onDelete={onDelete} />
                    <Pagination products={filtredPrd} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
                </Fragment>
            )
            }
        </div>
    )
}

export default ViewProducts;