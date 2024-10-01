import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import FormContainer from "../components/form";
import { saveShippingAddress } from "../action/cartAction";
import CheckoutSteps from "../components/checkout";

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate("/payment");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h2 className="d-flex justify-content-center">Shipping</h2>
            <Form
                onSubmit={submitHandler}
                className="border border-dark rounded-2 p-4 mt-2"
            >
                <Form.Group
                    controlId="address"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter address"
                        value={address ? address : ""}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>

                <Form.Group
                    controlId="city"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter city"
                        value={city ? city : ""}
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>

                <Form.Group
                    controlId="postalCode"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter postal code"
                        value={postalCode ? postalCode : ""}
                        onChange={(e) => {
                            setPostalCode(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>

                <Form.Group
                    controlId="country"
                    className="d-flex flex-column mt-3"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter country"
                        value={country ? country : ""}
                        onChange={(e) => {
                            setCountry(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>

                <Button
                    type="submit"
                    variant="dark"
                    className="mt-4"
                    style={{ minWidth: "200px" }}
                >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
