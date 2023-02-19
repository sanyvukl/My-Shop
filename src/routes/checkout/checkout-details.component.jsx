import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CheckoutSummary } from "../../components/import.components";
import { CountryDropdown } from "react-country-region-selector";
import { SAVE_SHIPPING_ADDRESS, SAVE_BILLING_ADDRESS } from "../../redux/checkout/checkout.slice";
import "./checkout.styles.scss";

const initialAddressState = {
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
};

const CheckoutDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState({
        ...initialAddressState,
    });
    const [billingAddress, setBillingAddress] = useState({
        ...initialAddressState,
    });
    const [isTheSameAddress, setIsTheSameAddress] = useState(false);

    const handleShipping = (e) => {
        const { name, value } = e.target;

        setShippingAddress({
            ...shippingAddress,
            [name]: value,
        });
    };
    const handleBilling = (e) => {
        const { name, value } = e.target;

        setBillingAddress({
            ...billingAddress,
            [name]: value,
        });
    };
    const handleRadio = (e) => {
        const { value } = e.target;
        if (value === true || value === "true") {
            setBillingAddress(shippingAddress);
            setIsTheSameAddress(true);
        } else {
            setBillingAddress(initialAddressState);
            setIsTheSameAddress(false);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isTheSameAddress) {
            dispatch(SAVE_BILLING_ADDRESS(shippingAddress));
        } else {
            dispatch(SAVE_BILLING_ADDRESS(billingAddress));
        }
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
        navigate("/checkout");
    };

    return (
        <div className="container checkout-details">
            <h2>Checkout Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <Card cardClass={"card"}>
                        <h3>Shipping Address</h3>

                        <label htmlFor="">Recipient Name:</label>
                        <input
                            type="text"
                            placeholder="Recipient Name"
                            name="name"
                            onChange={handleShipping}
                            value={shippingAddress.name}
                            required
                        />

                        <label htmlFor="">Address Line 1:</label>
                        <input
                            type="text"
                            placeholder="Address Line 1"
                            name="line1"
                            onChange={handleShipping}
                            value={shippingAddress.line1}
                            required
                        />
                        <label htmlFor="">Address Line 2:</label>
                        <input
                            type="text"
                            placeholder="Address Line 2"
                            name="line2"
                            onChange={handleShipping}
                            value={shippingAddress.line2}
                            required
                        />
                        <label htmlFor="">City:</label>
                        <input
                            type="text"
                            placeholder="City"
                            name="city"
                            onChange={handleShipping}
                            value={shippingAddress.city}
                            required
                        />
                        <label htmlFor="">State:</label>
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            onChange={handleShipping}
                            value={shippingAddress.state}
                            required
                        />

                        <label htmlFor="">Postal Code:</label>
                        <input
                            type="text"
                            name="postal_code"
                            placeholder="Postal Code"
                            onChange={handleShipping}
                            value={shippingAddress.postal_code}
                            required
                        />
                        <label htmlFor="">Country:</label>

                        <CountryDropdown
                            valueType="short"
                            className="select"
                            value={shippingAddress.country}
                            onChange={(val) =>
                                handleShipping({ target: { name: "country", value: val } })
                            }
                        />
                        <label htmlFor="">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            onChange={handleShipping}
                            value={shippingAddress.phone}
                            required
                        />

                        <label>
                            Billing address is the same as shipping address:
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <label>Yes</label>
                                <input
                                    type="radio"
                                    name="chose"
                                    style={{ marginRight: "10px", marginLeft: "2px" }}
                                    value={true}
                                    onClick={handleRadio}

                                />

                                <label>No</label>
                                <input
                                    type="radio"
                                    name="chose"
                                    style={{ marginLeft: "2px" }}
                                    value={false}
                                    onClick={handleRadio}
                                />
                            </div>
                        </label>
                        {
                            isTheSameAddress &&
                            <div style={{ "marginTop": '10px' }}>
                                <button type="submit" className="--btn --btn-primary">
                                    Proceed To Checkout
                                </button>
                            </div>
                        }
                    </Card>

                    {!isTheSameAddress && <Card cardClass={"card"}>
                        <h3>Billing Address</h3>

                        <label htmlFor="">Recipient Name:</label>
                        <input
                            type="text"
                            placeholder="Recipient Name"
                            name="name"
                            onChange={handleBilling}
                            value={billingAddress.name}
                            disabled={isTheSameAddress}
                            required
                        />

                        <label htmlFor="">Address Line 1:</label>
                        <input
                            type="text"
                            placeholder="Address Line 1"
                            name="line1"
                            onChange={handleBilling}
                            value={billingAddress.line1}
                            disabled={isTheSameAddress}
                            required
                        />
                        <label htmlFor="">Address Line 2:</label>
                        <input
                            type="text"
                            placeholder="Address Line 2"
                            name="line2"
                            onChange={handleBilling}
                            value={billingAddress.line2}
                            disabled={isTheSameAddress}
                            required
                        />
                        <label htmlFor="">City:</label>
                        <input
                            type="text"
                            placeholder="City"
                            name="city"
                            onChange={handleBilling}
                            value={billingAddress.city}
                            disabled={isTheSameAddress}
                            required
                        />
                        <label htmlFor="">State:</label>
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            onChange={handleBilling}
                            value={billingAddress.state}
                            disabled={isTheSameAddress}
                            required
                        />
                        <label htmlFor="">Postal Code:</label>
                        <input
                            type="text"
                            name="postal_code"
                            placeholder="Postal Code"
                            onChange={handleBilling}
                            value={billingAddress.postal_code}
                            disabled={isTheSameAddress}
                            required
                        />
                        <label htmlFor="">Country:</label>
                        <CountryDropdown
                            valueType="short"
                            className="select"
                            value={billingAddress.country}
                            disabled={isTheSameAddress}
                            onChange={(val) =>
                                handleBilling({ target: { name: "country", value: val } })
                            }
                        />
                        <label htmlFor="">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            onChange={handleBilling}
                            disabled={isTheSameAddress}
                            value={billingAddress.phone}
                            required
                        />
                        <button type="submit" className="--btn --btn-primary">
                            Proceed To Checkout
                        </button>
                    </Card>}
                </div>
                <CheckoutSummary />
            </form>

        </div>
    );
};

export default CheckoutDetails;
