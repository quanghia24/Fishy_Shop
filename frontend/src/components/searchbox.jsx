import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBox = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    
    const submitHanlder = (e) => {
        e.preventDefault();
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`);
        }else{
            //navigate(`/?keyword=${keyword}`);
            navigate(location.pathname)
        }
    };

    return (
        <Form onSubmit={submitHanlder} inline="true" className="d-flex">
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                className="mr-sm-2 ml-sm-5"
            ></Form.Control>
            <Button type="submit" variant="outline-info" className="p-2 ms-3 me-5">
                Submit
            </Button>
        </Form>
    );
};

export default SearchBox;
