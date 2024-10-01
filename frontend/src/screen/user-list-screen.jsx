import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import Message from "../components/message";
import { listUser, deleteUser } from "../action/userAction";

const UserListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    const capitalizeFirstLetter = (str) => {
        const arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str2 = arr.join(" ");
        return str2;
    };

    const deleteUserHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this user")) {
            dispatch(deleteUser(id));
        }
    };

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUser());
        } else {
            navigate("/login");
        }
    }, [dispatch, successDelete, userInfo, navigate]);

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{capitalizeFirstLetter(user.name)}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.isAdmin ? (
                                            <i
                                                className="fas fa-check"
                                                style={{ color: "green" }}
                                            ></i>
                                        ) : (
                                            <i
                                                className="fas fa-close"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={user._id === userInfo._id ? '/profile':`/admin/user/${user._id}/edit`}
                                        >
                                            <Button
                                                variant="info"
                                                className="btn-sm"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm m-lg-2"
                                        >
                                            <i
                                                className="fas fa-trash"
                                                onClick={() =>
                                                    deleteUserHandler(user._id)
                                                }
                                            ></i>
                                        </Button>
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

export default UserListScreen;
