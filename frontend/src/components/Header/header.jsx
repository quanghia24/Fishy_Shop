import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../action/userAction";
import { useNavigate } from "react-router-dom";
import SearchBox from "../searchbox";
import './header.css'; // Import CSS

const Header = () => {
    const navigate = useNavigate();
    
    const capitalizeFirstLetter = (str) => {
        const arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str2 = arr.join(" ");
        return str2;
    };
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="header">
            <Navbar expand="lg" collapseOnSelect className="navbar">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="brand" href="/"> <p className="logo">Fishy Shop</p></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="nav-links">
                            <button onClick={() => scrollToSection('home')} className="nav-link">
                                <p className="button-context">Home</p>
                            </button>
                            <button onClick={() => scrollToSection('product')} className="nav-link">
                                <p className="button-context">Product</p>
                            </button>
                            <button onClick={() => scrollToSection('download')} className="nav-link">
                                <p className="button-context">Download</p>
                            </button>
                            <button onClick={() => scrollToSection('footer')} className="nav-link">
                                <p className="button-context">Contact Us</p>
                            </button>
                        </Nav>

                        <div className="search-cart">
                            <SearchBox />
                            <Nav>
                                <LinkContainer to="/cart">
                                    <Nav.Link>
                                        <i className="fa-solid fa-cart-shopping"></i> <p className="button-context">Cart</p>
                                    </Nav.Link>
                                </LinkContainer>
                                {userInfo ? (
                                    <NavDropdown
                                        title={<span className="text-white fw-bold">{capitalizeFirstLetter(userInfo.name)}</span>}
                                        id="username"
                                    >
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            <p className="button-context">Logout</p>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <i className="fa-solid fa-user"></i> <p className="button-context">Login</p>
                                        </Nav.Link>
                                    </LinkContainer>
                                )}
                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title={<span className="text-white fw-bold">Admin</span>} id="adminmenu">
                                        <LinkContainer to="/admin/userlist">
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/productlist">
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist">
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
