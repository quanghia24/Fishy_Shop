import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
//import products from './../../products.js'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../action/productAction";
import { useSearchParams, useNavigate } from "react-router-dom";

import Product from "../components/product";
import Message from "../components/message";
//import axios from "axios";
import { PaginationControl } from "react-bootstrap-pagination-control";

import Loader from "../components/loader.jsx";
import ProductCarousel from "./../components/product-carousel";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, loading, products, page, pages } = productList;
    //const [products, setProducts] = useState([]);
    const [queryParameters] = useSearchParams();
    const keyword = queryParameters.get("keyword");
    const pageQuery = queryParameters.get("page");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(listProducts(keyword, pageQuery));
        // const fetchProduct = async () => {
        //   const {data} = await axios.get('/api/products/')
        //   setProducts(data);
        // }
        // fetchProduct();
    }, [dispatch, keyword, pageQuery]);

    return (
        <div>
            {!keyword && <ProductCarousel />}
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        {products.map((product) => {
                            return (
                                <Col
                                    key={product._id}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                >
                                    <Product product={product}></Product>
                                </Col>
                            );
                        })}
                    </Row>
                    {/* <Paginate page={page} pages={pages} keyword={keyword}/> */}
                    {pages > 1 && (
                        <div className="mt-5">
                            <PaginationControl
                                page={page}
                                between={4}
                                total={pages * 4}
                                limit={4}
                                changePage={(page) => {
                                    navigate(
                                        `/?keyword=${keyword}&page=${page}`
                                    );
                                }}
                                ellipsis={1}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
