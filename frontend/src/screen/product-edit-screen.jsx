import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { listProductDetails, updateProduct } from "../action/productAction";
import FormContainer from "../components/form";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
    const { id } = useParams();
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate,
    } = productUpdate;

    // const redirect = queryParameters.get("redirect")
    //     ? queryParameters.get("redirect")
    //     : "/";

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate("/admin/productlist");
        } else {
            if (!product?.name || product?._id !== Number(id)) {
                dispatch(listProductDetails(id));
            } else {
                setName(product.name);
                setPrice(product.price);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
                setImage(product.image);
            }
        }
    }, [dispatch, id, product, navigate, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            })
        );
    };

    const uploadFileHanlder = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append("product_id", id);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            const { data } = await axios.post(
                "/api/products/upload/",
                formData,
                config
            );
            setImage(data)
            setUploading(false);
        } catch (error) {
            setUploading(false);
        }
    };

    return (
        <div>
            <LinkContainer className="mt-3" to="/admin/productlist">
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
                            className="d-flex flex-column mt-3"
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
                            controlId="price"
                            className="d-flex flex-column mt-3"
                            style={{ textAlign: "left" }}
                        >
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group
                            controlId="image"
                            className="d-flex flex-column mt-3"
                            style={{ textAlign: "left" }}
                        >
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => {
                                    setImage(e.target.value);
                                }}
                            ></Form.Control>
                            <Form.Control
                                type="file"
                                label="Choose file"
                                onChange={uploadFileHanlder}
                                className="mt-2"
                            ></Form.Control>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group
                            controlId="brand"
                            className="d-flex flex-column mt-3"
                            style={{ textAlign: "left" }}
                        >
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => {
                                    setBrand(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group
                            controlId="countinstock"
                            className="d-flex flex-column mt-3"
                            style={{ textAlign: "left" }}
                        >
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter stock"
                                value={countInStock}
                                onChange={(e) => {
                                    setCountInStock(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group
                            controlId="category"
                            className="d-flex flex-column mt-3"
                            style={{ textAlign: "left" }}
                        >
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group
                            controlId="description"
                            className="d-flex flex-column mt-3"
                            style={{ textAlign: "left" }}
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
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
                )}
            </FormContainer>
        </div>
    );
};

export default ProductEditScreen;
