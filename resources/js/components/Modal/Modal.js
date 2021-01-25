import { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = { newTweetText: "" };
        this.submitHandler = this.submitHandler.bind(this);
    }
    submitHandler() {
        axios
            .post(
                "/api/tweets/create",
                { body: this.state.newTweetText },
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Bearer ${document.cookie.slice(6)}`,
                    },
                }
            )
            .then((res) => {
                if (res.data.status)
                    swal("Succesful", "Succesfully tweeted", "success");
                else{
                    swal("Error", "An Error occured", "success"); 
                }
            });
        this.props.onHide();
    }
    render() {
        return (
            <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton className="bg-primary">
                    <Modal.Title
                        className="text-white"
                        id="contained-modal-title-lg"
                    >
                        New Tweet
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Tweet Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                onChange={(e) => {
                                    this.setState({
                                        newTweetText: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.submitHandler}>
                        Tweet
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Dialog;
