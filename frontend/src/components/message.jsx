import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
    return (
        <Alert
            variant={variant}
            className="d-flex align-items-center justify-content-center"
        >
            {children}
        </Alert>
    );
};

export default Message;
