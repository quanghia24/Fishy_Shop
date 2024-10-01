import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { login } from "../action/userAction";
import FormContainer from "../components/form";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const redirect = queryParameters.get("redirect")
        ? queryParameters.get("redirect")
        : "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <FormContainer>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <h1 className="d-flex justify-content-center">Sign in</h1>
            <Form
                className="border border-dark rounded-2 p-4"
                onSubmit={submitHandler}
            >
                <Form.Group
                    controlId="email"
                    className="d-flex flex-column"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
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
                <Button
                    type="submit"
                    variant="dark"
                    className="mt-4"
                    style={{ minWidth: "50%" }}
                >
                    Sign in
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer ?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
