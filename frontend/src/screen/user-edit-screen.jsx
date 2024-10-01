import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../action/userAction";
import FormContainer from "../components/form";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
    const { id } = useParams();
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate,
    } = userUpdate;

    // const redirect = queryParameters.get("redirect")
    //     ? queryParameters.get("redirect")
    //     : "/";

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate("/admin/userlist");
        } else {
            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, id, user, successUpdate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
    };

    return (
        <div>
            <LinkContainer className="mt-3" to="/admin/userlist">
                <Button variant="outline-secondary">Go back</Button>
            </LinkContainer>
            <FormContainer>
                <h1 className="d-flex justify-content-center">Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant="danger">{errorUpdate.message}</Message>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
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
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group
                            controlId="isadmin"
                            className="mt-3"
                            style={{ textAlign: "left" }}
                        >
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
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
                )}
            </FormContainer>
        </div>
    );
};

export default UserEditScreen;
