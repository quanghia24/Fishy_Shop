import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/loader";
import Message from "../components/message";
import { PaginationControl } from "react-bootstrap-pagination-control";

import {
    listProducts,
    deleteProduct,
    createProduct,
} from "../action/productAction";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();
    let keyword = queryParameters.get("keyword");
    let pageQuery = queryParameters.get("page");

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;
    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    // const capitalizeFirstLetter = (str) => {
    //     const arr = str.split(" ");
    //     for (var i = 0; i < arr.length; i++) {
    //         arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    //     }
    //     const str2 = arr.join(" ");
    //     return str2;
    // };

    const deleteUserHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this product ?")) {
            dispatch(deleteProduct(id));
        }
    };

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if (!userInfo.isAdmin) {
            navigate("/login");
        }
        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts(keyword, pageQuery));
        }
    }, [
        dispatch,
        userInfo,
        navigate,
        successDelete,
        createdProduct,
        successCreate,
        keyword,
        pageQuery,
    ]);

    const createProductHanlder = () => {
        dispatch(createProduct());
    };

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col style={{ textAlign: "right" }}>
                    <Button
                        variant="dark"
                        className="my-3"
                        onClick={createProductHanlder}
                    >
                        <i className="fas fa-plus"></i>
                        <span className="m-lg-2">Create Product</span>
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>

                                        <td>
                                            <LinkContainer
                                                to={`/admin/product/${product._id}/edit`}
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
                                                        deleteUserHandler(
                                                            product._id
                                                        )
                                                    }
                                                ></i>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <div className="mt-5">
                        <PaginationControl
                            page={page}
                            between={4}
                            total={pages * 4}
                            limit={4}
                            changePage={(page) => {
                                navigate(
                                    `/admin/productlist/?keyword=${keyword}&page=${page}`
                                );
                            }}
                            ellipsis={1}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListScreen;
