import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Form,
    Button,
    Row,
    Col,
    ListGroup,
    Image,
    Card,
} from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/checkout";
import { savePaymentMethod } from "../action/cartAction";
import { createOrder } from "../action/orderAction";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart);
    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, error, success } = orderCreate;
    const dispatch = useDispatch();
    //const { shippingAddress } = cart;

    const navigate = useNavigate();

    //add itemsPrice attribute to cart redux
    cart.itemsPrice = cart.cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);
    cart.shippingPrice = (
        cart.itemsPrice > 5000
            ? 0
            : cart.itemsPrice > 4000
            ? 10
            : cart.itemsPrice > 3000
            ? 15
            : cart.itemsPrice > 2000
            ? 20
            : 30
    ).toFixed(2);
    cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}/`);
            dispatch({type: ORDER_CREATE_RESET })
        }
    }, [success, order, navigate,dispatch]);

    const placeOrder = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item
                            className="d-flex flex-column mt-1"
                            style={{ textAlign: "left" }}
                        >
                            <h2>Shipping</h2>
                            <p>
                                <span>Shipping : </span>
                                {cart.shippingAddress.address} &nbsp;&nbsp;
                                {cart.shippingAddress.city} &nbsp;&nbsp;
                                {cart.shippingAddress.postalCode}&nbsp;&nbsp;
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item
                            className="d-flex flex-column mt-1"
                            style={{ textAlign: "left" }}
                        >
                            <h2>Payment Method</h2>
                            <p>
                                <span>Payment Method : </span>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item
                            className="d-flex flex-column mt-1"
                            style={{ textAlign: "left" }}
                        >
                            <h2>Order Items</h2>
                            <div>
                                {cart.cartItems.length === 0 ? (
                                    <Message variant="info">
                                        Your cart is empty
                                    </Message>
                                ) : (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item, index) => {
                                            return (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image
                                                                src={item.image}
                                                                fluid
                                                                rounded
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Link
                                                                to={`/product/${item.product}`}
                                                                className="text-decoration-none text-dark"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.quantity} x $
                                                            {item.price} ={" "}
                                                            {(
                                                                item.price *
                                                                item.quantity
                                                            ).toFixed(2)}{" "}
                                                            $
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            );
                                        })}
                                    </ListGroup>
                                )}
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ textAlign: "left" }}>
                                <Row>
                                    <Col>Item </Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ textAlign: "left" }}>
                                <Row>
                                    <Col>Shipping </Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ textAlign: "left" }}>
                                <Row>
                                    <Col>Tax </Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ textAlign: "left" }}>
                                <Row>
                                    <Col>Total </Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    variant="dark"
                                    style={{ minWidth: "75%" }}
                                    className="mt-1 mb-1"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PlaceOrderScreen;
