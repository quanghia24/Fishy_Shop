import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import FormContainer from "../components/form";
import CheckoutSteps from "../components/checkout";
import { savePaymentMethod } from "../action/cartAction";

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    if (!shippingAddress.address) {
        navigate("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeholder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form
                onSubmit={submitHandler}
                className="border border-dark rounded-2 p-4 mt-2"
            >
                <Form.Group
                    className="d-flex flex-column mt-1"
                    style={{ textAlign: "left" }}
                >
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Paypal or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
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

export default PaymentScreen;
