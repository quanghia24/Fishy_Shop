import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { register } from "../action/userAction";
import FormContainer from "../components/form";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

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
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        }
        dispatch(register(name, email, password));
    };

    return (
        <FormContainer>
            <h1 className="d-flex justify-content-center">Register</h1>
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
                        value={name}
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
                        required
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
                        required
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
                    Reigster
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account ?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/login"
                        }
                    >
                        Sign in
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
