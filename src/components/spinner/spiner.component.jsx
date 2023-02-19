import spinnerImg from "../../assets/jpg/spinner.jpg";

const Spinner = () => {
    return (
        <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} className="--center-all" />
    )
}

export default Spinner;