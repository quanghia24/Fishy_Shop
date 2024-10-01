import {  useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import Message from "../components/message";
import { listOrders } from "../action/orderAction";

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // const userDelete = useSelector((state) => state.userDelete);
    // const { success: successDelete } = userDelete;

    // const deleteUserHandler = (id) => {
    //     if (window.confirm("Are you sure you want to delete this user")) {
    //         dispatch(deleteUser(id));
    //     }
    // };

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            navigate("/login");
        }
    }, [dispatch, userInfo, navigate]);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-close"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-close"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}/`}
                                        >
                                            <Button
                                                variant="info"
                                                className="btn-sm px-3"
                                            >
                                                Details
                                            </Button>
                                        </LinkContainer>
                                        {/* <Button
                                            variant="danger"
                                            className="btn-sm m-lg-2"
                                        >
                                            <i
                                                className="fas fa-trash"
                                                onClick={() =>
                                                    deleteUserHandler(user._id)
                                                }
                                            ></i>
                                        </Button> */}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default OrderListScreen;
