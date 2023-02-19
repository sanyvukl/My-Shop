import { useState, useEffect } from "react";
import "./pagination.styles.scss";

const Pagination = ({ products, totalPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [];
    for (let index = 1; index <= totalPages; index++) {
        pageNumbers.push(index);
    }

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    // Set to default
    useEffect(() => {
        setPageNumberLimit(5);
        setMaxPageNumberLimit(5);
        setMinPageNumberLimit(0);
        setCurrentPage(1);
    }, [products]);
    // 
    
    const goToPreviousPage = () => {
        let prevPage = currentPage - 1;
        setCurrentPage(prevPage > 0 ? prevPage : currentPage);

        if (prevPage === minPageNumberLimit && prevPage > 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };
    const goToNextPage = () => {
        let nextPage = currentPage + 1;
        // 
        if (nextPage > maxPageNumberLimit && nextPage < totalPages) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            // setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(currentPage);
        }
        setCurrentPage(currentPage < totalPages ? nextPage : currentPage)
    };


    return (
        <ul className="pagination">
            <li onClick={goToPreviousPage}>&larr;</li>
            {pageNumbers.map((number, index) => {
                if (number <= maxPageNumberLimit && number > minPageNumberLimit) {
                    return <li key={index} value={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? "active" : ''}>{number}</li>
                }
            })}

            <li onClick={goToNextPage}>&rarr;</li>

            <p>
                <b className="page">Page {currentPage}</b>
                <span> of </span>
                <b>{totalPages}</b>
            </p>
        </ul>
    )
}

export default Pagination