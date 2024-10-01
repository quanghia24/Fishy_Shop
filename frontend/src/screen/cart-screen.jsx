import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";
import Message from "../components/message";
//import Loader from "./loader";
import { addToCart, removeFromCart } from "../action/cartAction";
import { useParams, useSearchParams } from "react-router-dom";

const CartScreen = () => {
    const { id } = useParams();
    const [queryParameters] = useSearchParams();
    const quantity = queryParameters.get("quantity");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, quantity));
        }
    }, [dispatch, id, quantity]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping");
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant="info">
                        Your cart is empty
                        <Link to="/" className="text-primary" style={{marginLeft:'25px'}}>
                            <Button variant="light">Go back</Button>
                        </Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounder='true'
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Link
                                            to={`/product/${item.product}`}
                                            className="text-decoration-none text-dark d-flex"
                                            style={{ textAlign: "left" }}
                                        >
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col
                                        md={2}
                                        className="d-flex align-items-center"
                                    >
                                        ${item.price}
                                    </Col>
                                    <Col
                                        md={3}
                                        className="d-flex align-items-center"
                                    >
                                        <Form.Control
                                            as="select"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        Number(e.target.value)
                                                    )
                                                )
                                            }
                                            style={{
                                                appearance: "auto",
                                            }}
                                        >
                                            {[
                                                ...Array(
                                                    item?.countInStock
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
                                    <Col
                                        md={1}
                                        className="d-flex align-items-center"
                                    >
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.product
                                                )
                                            }
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4} className="mt-3">
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item
                            className="d-flex flex-md-column"
                            style={{ textAlign: "left" }}
                        >
                            <h2>
                                Subtotal &nbsp;(
                                {cartItems.reduce(
                                    (acc, item) =>
                                        Number(acc) + Number(item.quantity),
                                    0
                                )}
                                ) &nbsp;Items
                            </h2>
                            $
                            {cartItems.reduce(
                                (acc, item) =>
                                    Number(acc) +
                                    Number(item.quantity) * Number(item.price),
                                0
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                variant="dark"
                                disabled={cartItems.length === 0}
                                className="btn-block mt-2 mb-2"
                                style={{ width: "80%" }}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
