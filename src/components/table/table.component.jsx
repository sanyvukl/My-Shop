import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import loaderImg from "../../assets/gif/loader.gif";
import "./table.styles.scss";

const Table = ({ products, onDelete, edit }) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>s/n</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => {
                    const {
                        id,
                        data: { name, price, imageUrls, category },
                    } = product;
                    return (
                        <tr key={id}>
                            <td>{index + 1}</td>
                            <td>
                                <img
                                    src={imageUrls[0]}
                                    alt={name}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        background: `url(${loaderImg}) center no-repeat`,
                                    }}
                                />
                            </td>
                            <td>{name}</td>
                            <td>{category}</td>
                            <td>${price}</td>
                            <td>
                                {
                                    edit ?
                                        <>
                                            <Link to={`/admin/edit-product/${id}`}>
                                                <FaEdit color="green" size={20} />
                                            </Link>
                                            &nbsp;
                                        </>
                                        :
                                        <></>
                                }


                                <FaTrashAlt
                                    color="red"
                                    size={18}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => { edit ? onDelete(id, imageUrls) : onDelete() }}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
