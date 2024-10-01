import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./message";
import Loader from "./loader";
import { listTopRatedProducts } from "./../action/productAction";

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated);
    const { error, loading, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopRatedProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel pause="hover" className="bg-dark mt-2 mb-5">
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid style={{aspectRatio: 5 / 4, width:'50%' }}/>
                        <Carousel.Caption className="carousel.caption">
                            <h4>
                                {product.name} (${product.price})
                            </h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;
