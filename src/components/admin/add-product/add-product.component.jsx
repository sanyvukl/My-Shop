import { useState, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "../../import.components";
import { currentUserSelector } from "../../../redux/user/user.selector";
import { getStoreImagesUrl, addProductDocument } from "../../../utils/firebase/firebase.utils";
import { serverTimestamp } from "firebase/firestore";
import { Loader } from "../../import.components"
import { toast } from "react-toastify";
import { ADD_PRODUCT, isLoadingSelector } from "../../../redux/product/product.slice";
import "./add-product.styles.scss";

const categories = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Fashion" },
    { id: 4, name: "Phone" },
]

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(currentUserSelector);
    // const isLoading = useSelector(isLoadingSelector);
    const [product, setProduct] = useState({
        name: "",
        images: "",
        firstImageUrl: "",
        price: "",
        category: "",
        brand: "",
        desc: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [progressLine, setProgressLine] = useState(0);
    const { images } = product;

    const addProductHandler = async (product) => {
        try {
            const { id } = await addProductDocument(product);
            dispatch(ADD_PRODUCT({ id, data: product }));
            toast.success("Product is uploaded");
            resetInputs();
            navigate("/admin/all-products");
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (e.target.files) {
            setProgressLine(0);
            setProduct({ ...product, [name]: e.target.files, });
            setProgressLine(100);
            return;
        }
        setProduct({ ...product, [name]: value });
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setProgressLine(0);
        if (images.length > 6) {
            toast.error("Max is 6 images");
            return setIsLoading(false);
        }
        const imageUrls = await Promise.all(
            [...images].map((image) => getStoreImagesUrl(image))
        ).catch((error) => {
            toast.error(`Images not uploaded ${error}`);
            console.log(error);
            return setIsLoading(false);
        });
        setProgressLine(100);
        setProduct({ ...product, firstImageUrl: imageUrls[0], });

        // Add new Product
        let newProduct = {
            ...product,
            price: Number(product.price),
            imageUrls: imageUrls,
            timestamp: serverTimestamp(),
            userRef: currentUser.userID,
        }
        delete newProduct.firstImageUrl;
        delete newProduct.images;

        await addProductHandler(newProduct);
    }
    const resetInputs = () => {
        setProduct({
            name: "",
            images: "",
            firstImageUrl: "",
            price: "",
            category: "",
            brand: "",
            desc: "",
        });
        setProgressLine(0);
    }

    return (isLoading ? <Loader /> :
        <div className="add-product">
            <h1>AddProduct</h1>
            <Card cardClass="card">
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="">Product name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Product name"
                        required
                    />
                    {/*  */}
                    <label htmlFor="">Product Image:</label>
                    <Card cardClass="group">
                        {progressLine > 0 ?
                            < div className="progress">
                                <div className="progress-bar" style={{ width: `${progressLine}%` }}>
                                    <span>Uploading {progressLine}%</span>
                                </div>
                            </div>
                            : <></>}
                        <input
                            type={"file"}
                            name="images"
                            onChange={handleChange}
                            placeholder="Product Image"
                            max="6"
                            accept=".jpg,.png,.jpeg"
                            multiple
                            required
                        />
                        <input
                            type="text"
                            name="imageURL"
                            placeholder="https://firebase.com/phone-image.jpg"
                            value={product.firstImageUrl}
                            required
                            disabled
                        />
                    </Card>
                    {/*  */}
                    <label htmlFor="">Product price:</label>
                    <input
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="$100"
                        required
                    />
                    {/*  */}
                    <label htmlFor="">Product category:</label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>-- choose product category --</option>
                        {categories.map(item => {
                            return (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            )
                        })}
                    </select>
                    {/*  */}
                    <label htmlFor="">Product Company/Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        placeholder="Product brand"
                        required
                    />
                    {/*  */}
                    <label htmlFor="">Product Description</label>
                    <textarea name="desc" cols="30" rows="10" onChange={handleChange} required></textarea>
                    {/*  */}
                    <button className="--btn --btn-primary">Save Product</button>
                </form>
            </Card >
        </div >
    );
};

export default AddProduct;
