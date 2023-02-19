import React from 'react';
import ReactDOM from 'react-dom';
import loaderImg from '../../assets/gif/loader.gif';
import "./loader.styles.scss";

const Loader = () => {
    return ReactDOM.createPortal(
        <div className='wrapper'>
            <div className="loader">
                <img src={loaderImg} alt="Loading..." />
            </div>
        </div>,
        document.getElementById('loader')
    );
}

export default Loader;