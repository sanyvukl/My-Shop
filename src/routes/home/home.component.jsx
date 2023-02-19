import { useEffect } from 'react';
import Slider from '../../components/slider/slider.component';
import { Product } from '../../components/product/product.imports';
import "./home.styles.scss";

const Home = () => {
    const url = window.location.href;
    const scrollToProducts = () => {
        if (url.includes("#products")) {
            const top = document.getElementById("products")?.getBoundingClientRect()?.top
                - 80;
            window.scrollTo({
                top: Number(top),
                behavior: "smooth"
            });
            return;
        };
    };

    useEffect(() => scrollToProducts(), []);

    return (
        <div>
            <Slider />
            <Product />
        </div>
    )
}

export default Home;