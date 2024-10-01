import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link className='text-success fw-bold'>Login</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className='fw-bold'>Login</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link className='text-success fw-bold'>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className='fw-bold'>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link className='text-success fw-bold'>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className='fw-bold'>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link className='text-success fw-bold'>Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className='fw-bold'>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
