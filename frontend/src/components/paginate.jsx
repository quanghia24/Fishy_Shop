import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, keyword, isAdmin = false }) => {
    // if(keyword){
    //     keyword
    // }
    return (
        pages &&
        pages > 1 && (
            <Pagination>
                {[...Array(pages)?.keys()]?.map((x) => (

                    <LinkContainer
                        key={x + 1}
                        to={{
                            pathname: "/",
                            hash: "",
                            search: `?keyword=${keyword}&page=${x + 1}`,
                        }}
                        style={{textDecoration: "none", color:'none'}}
                    >
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default Paginate;
