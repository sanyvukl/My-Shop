import { Link } from "react-router-dom";
import "./not-found.styles.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <div>
        <h2>404</h2>
        <p>Ooppsss, page not found</p>
        <button className="--btn">
          <Link to={"/"}>
            &larr; Back To Home
          </Link>
        </button>
      </div>
    </div>
  )
}

export default NotFound;