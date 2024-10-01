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
import { LinkContainer } from "react-router-bootstrap";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import CheckoutSteps from "../components/checkout";
import { savePaymentMethod } from "../action/cartAction";
import { getOrderDetail, payOrder, deliverOrder } from "../action/orderAction";
import { PayPalButton } from "react-paypal-button-v2";
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    if (!loading && !error) {
        order.itemsPrice = order.orderItems
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2);
    }

    const addPayPalScript = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://www.paypal.com/sdk/js?client-id=AZB3sGls-YpVoCcuIVa261muY6tjUvv1FlYlyxPVfJkg9tAt5gG9h_gCSi4WAYaqOH3Rgp8c5VxAXpmA";
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
        if (
            !order ||
            successPay ||
            order._id !== Number(id) ||
            successDeliver
        ) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetail(id));
        } else if (!order.isPay) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [order, id, dispatch, successPay, successDeliver, navigate, userInfo]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    // const placeOrder = () => {
    //     dispatch(
    //         createOrder({
    //             orderItems: cart.cartItems,
    //             shippingAddress: cart.shippingAddress,
    //             paymentMethod: cart.paymentMethod,
    //             itemsPrice: cart.itemsPrice,
    //             shippingPrice: cart.shippingPrice,
    //             taxPrice: cart.taxPrice,
    //             totalPrice: cart.totalPrice,
    //         })
    //     );
    // };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div>
            {userInfo.isAdmin ? (
                <LinkContainer className="mt-3" to="/admin/orderlist">
                    <Button variant="outline-dark">Go back</Button>
                </LinkContainer>
            ) : (
                <LinkContainer className="mt-3" to="/profile">
                    <Button variant="outline-dark">Go back</Button>
                </LinkContainer>
            )}
            <h1>Order</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item
                            className="d-flex flex-column mt-1"
                            style={{ textAlign: "left" }}
                        >
                            <h2>Shipping</h2>
                            <p>Name&nbsp;:&nbsp;{order.user.name}</p>
                            <p>
                                Email&nbsp;:&nbsp;
                                <a
                                    style={{ color: "black" }}
                                    href={`mailto:${order.user.email}`}
                                >
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                <span>Shipping : </span>
                                {order.shippingAddress.address} &nbsp;&nbsp;
                                {order.shippingAddress.city} &nbsp;&nbsp;
                                {order.shippingAddress.postalCode}&nbsp;&nbsp;
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="warning">
                                    Not Delivered
                                </Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item
                            className="d-flex flex-column mt-1"
                            style={{ textAlign: "left" }}
                        >
                            <h2>Payment Method</h2>
                            <p>
                                <span>Payment Method : </span>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant="warning">Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item
                            className="d-flex flex-column mt-1"
                            style={{ textAlign: "left" }}
                        >
                            <h2>Order Items</h2>
                            <div>
                                {order.orderItems?.cartItems?.length === 0 ? (
                                    <Message variant="info">
                                        Order is empty
                                    </Message>
                                ) : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => {
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ textAlign: "left" }}>
                                <Row>
                                    <Col>Shipping </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ textAlign: "left" }}>
                                <Row>
                                    <Col>Tax </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ textAlign: "left" }}>
                                <Row>
                                    <Col>Total </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {userInfo &&
                            userInfo.isAdmin &&
                            order.isPaid &&
                            !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button
                                        variant="dark"
                                        className="my-2"
                                        onClick={deliverHandler}
                                    >
                                        Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderScreen;
