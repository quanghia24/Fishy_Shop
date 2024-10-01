import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./rating";

const Product = ({ product }) => {
    return (
        <Card
            className="product-container mt-3 p-3 rounded"
            style={{ fontFamily: "Shantell Sans" }}
        >
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    style={{aspectRatio: 5 / 4 }}
                    src={product.image}
                />
            </Link>
            <Card.Body as="div">
                <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none text-dark"
                >
                    <strong
                        className="d-flex"
                        style={{ textAlign: "left", height: "3rem" }}
                    >
                        {product.name}
                    </strong>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        {/* {product.rating} from {product.numReviews} reviews */}
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                            color="#dc994b"
                        />
                    </div>
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
