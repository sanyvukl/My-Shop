import { BiSearch } from "react-icons/bi";
import "./search.styles.scss";

const Search = ({ value, handleChange }) => {

    return (
        <div className='search-block'>
            <BiSearch size={18} className="search-icon" />
            <input type="text" name="name" placeholder="Search by name" value={value} onChange={handleChange} />
        </div>
    )
}

export default Search