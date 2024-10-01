//import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Card,
    Form,
} from "react-bootstrap";
import Rating from "../components/rating";
//import products from "../../products";

import { useDispatch, useSelector } from "react-redux";
import {
    listProductDetails,
    createProductReview,
} from "../action/productAction";
import Loader from "../components/loader";
import Message from "../components/message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = () => {
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const { id } = useParams();
    let navigate = useNavigate();

    const capitalizeFirstLetter = (str) => {
        const arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str2 = arr.join(" ");
        return str2;
    };

    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(
        (state) => state.productReviewCreate
    );
    const {
        error: errorProductReview,
        loading: loadingProductReview,
        success: successProductReview,
    } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment("");
            dispatch({ type: { PRODUCT_CREATE_REVIEW_RESET } });
        }
        dispatch(listProductDetails(id));
        // const fetchProduct = async () => {
        //   const {data} = await axios.get(`/api/product/${id}`)
        //   setProduct(data);
        // }
        // fetchProduct();
    }, [dispatch, id, successProductReview]);

    //const product = products.find((p) => p._id === id);

    const addToCartHandler = () => {
        //history.push(`/cart/${id}?quantity=${quantity}`);
        navigate(`/cart/${id}?quantity=${quantity}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(id, {rating, comment}));
    };

    return (
        <div className="product-screen-container">
            <Link to="/" className="btn btn-outline-dark my-3">
                Go back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product?.image}
                                alt={product?.name}
                                fluid
                            />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush" className="d-flex">
                                <ListGroup.Item style={{ textAlign: "left" }}>
                                    <h3>{product?.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item style={{ textAlign: "left" }}>
                                    <Rating
                                        value={product?.rating}
                                        text={`${product?.numReviews} reviews`}
                                        color="#dc994b"
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item style={{ textAlign: "left" }}>
                                    Price : ${product?.price}
                                </ListGroup.Item>
                                <ListGroup.Item
                                    style={{ textAlign: "justify" }}
                                >
                                    Description : {product?.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item
                                        style={{ textAlign: "left" }}
                                    >
                                        <Row>
                                            <Col>Price :</Col>
                                            <Col>
                                                <span>${product?.price}</span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                        style={{ textAlign: "left" }}
                                    >
                                        <Row className="d-flex justify-content-between">
                                            <Col>Status :</Col>
                                            <Col>
                                                {product?.countInStock >= 1
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product?.countInStock > 0 && (
                                        <ListGroup.Item
                                            style={{ textAlign: "left" }}
                                        >
                                            <Row className="d-flex justify-content-between align-items-center">
                                                <Col>Quantity</Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Control
                                                        as="select"
                                                        value={quantity}
                                                        onChange={(e) =>
                                                            setQuantity(
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{
                                                            appearance: "auto",
                                                        }}
                                                    >
                                                        {[
                                                            ...Array(
                                                                product?.countInStock
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            className="btn-block w-75"
                                            variant="dark"
                                            disabled={
                                                product?.countInStock === 0
                                            }
                                            onClick={addToCartHandler}
                                        >
                                            Add to cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h3 className="mt-3">Review</h3>
                            {product?.reviews.length === 0 && (
                                <Message variant="info">No Reviews</Message>
                            )}
                            <ListGroup>
                                {product?.reviews.map((review) => {
                                    return (
                                        <ListGroup.Item
                                            key={review._id}
                                            className="px-4 d-flex flex-column align-items-start"
                                        >
                                            <strong className="mb-2">
                                                {capitalizeFirstLetter(
                                                    review.name
                                                )}
                                            </strong>
                                            <div
                                                className="d-flex"
                                                style={{
                                                    justifyContent:
                                                        "space-between",
                                                    width: "100%",
                                                }}
                                            >
                                                <Rating
                                                    value={review.rating}
                                                    color="#dc994b"
                                                />
                                                <p className="mb-2 small">
                                                    {review.createAt.substring(
                                                        0,
                                                        10
                                                    )}
                                                </p>
                                            </div>
                                            <p className="mb-2">
                                                {review.comment}
                                            </p>
                                        </ListGroup.Item>
                                    );
                                })}
                                <ListGroup.Item>
                                    <h3>Write a review</h3>
                                    {loadingProductReview && <Loader />}
                                    {successProductReview && (
                                        <Message variant="success">
                                            Review Submitted
                                        </Message>
                                    )}
                                    {errorProductReview && (
                                        <Message variant="danger">
                                            {errorProductReview}
                                        </Message>
                                    )}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group>
                                                <Form.Label
                                                    className="d-flex m-lg-1"
                                                    style={{
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    Rating
                                                </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="0">
                                                        Select ...
                                                    </option>
                                                    <option value="1">
                                                        1 - Poor
                                                    </option>
                                                    <option value="2">
                                                        2 - Fair
                                                    </option>
                                                    <option value="3">
                                                        3 - Good
                                                    </option>
                                                    <option value="4">
                                                        4 - Very Good
                                                    </option>
                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group
                                                controlId="comment"
                                                className="mt-3"
                                            >
                                                <Form.Label
                                                    className="d-flex m-lg-1"
                                                    style={{
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    Reviews
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    row="5"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {" "}
                                                </Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type="submit"
                                                variant="dark"
                                                className="mt-3 mb-2 px-5"
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant="info">
                                            Please &nbsp;
                                            <Link
                                                className="text-dark"
                                                to="/login"
                                            >
                                                Login
                                            </Link>{" "}
                                            &nbsp;to write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;

//disabled={product.countInStock !== 0}
