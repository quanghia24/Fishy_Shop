import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../action/userAction";
import FormContainer from "../components/form";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../action/orderAction";

const ProfileScreen = () => {
    const capitalizeFirstLetter = (str) => {
        const arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str2 = arr.join(" ");
        return str2;
    };

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderMyList = useSelector((state) => state.orderMyList);
    const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

    // const redirect = queryParameters.get("redirect")
    //     ? queryParameters.get("redirect")
    //     : "/";

    useEffect(() => {
        dispatch(listMyOrders());
    },[dispatch])
    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails("profile"));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [userInfo, user, navigate, dispatch, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        } else {
            dispatch(
                updateUserProfile({
                    id: user._id,
                    name: name,
                    email: email,
                    password: password,
                })
            );
            setMessage("");
        }
    };

    return (
        <Row>
            <Col md={4}>
                <h3>User Profile</h3>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                {message && <Message variant="danger">{message}</Message>}
                <Form
                    className="border border-dark rounded-2 p-4"
                    onSubmit={submitHandler}
                >
                    <Form.Group
                        controlId="name"
                        className="d-flex flex-column"
                        style={{ textAlign: "left" }}
                    >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="name"
                            placeholder="Enter name"
                            value={capitalizeFirstLetter(name)}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group
                        controlId="email"
                        className="d-flex flex-column mt-3"
                        style={{ textAlign: "left" }}
                    >
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group
                        controlId="password"
                        className="d-flex flex-column mt-3"
                        style={{ textAlign: "left" }}
                    >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group
                        controlId="passwordConfirm"
                        className="d-flex flex-column mt-3"
                        style={{ textAlign: "left" }}
                    >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        ></Form.Control>
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="dark"
                        className="mt-4"
                        style={{ minWidth: "50%" }}
                    >
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={8}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : (
                    <Table striped responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order, index) => {
                                return (
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {order.createAt?.substring(0, 10)}
                                        </td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt?.substring(0, 10)
                                            ) : (
                                                <i
                                                    className="fas fa-times"
                                                    style={{ color: "red" }}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer
                                                to={`/order/${order._id}`}
                                            >
                                                <Button
                                                    className="btn btn-sm px-3"
                                                    variant="info"
                                                >
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
