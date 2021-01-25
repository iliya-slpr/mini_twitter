import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Post from "../Home/HomeTweets/Post/Post";
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }
    render() {
        console.log(this.state.user);
        return (
            <Container>
                <Row>
                    <Col xs={10}>
                        <div className="text-white">{this.state.user.name}</div>
                    </Col>
                </Row>
            </Container>
        );
    }
    componentDidMount() {
        let userId = this.props.match.params.id;

        axios
            .get(`/api/users/get?user_id=${userId}`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${document.cookie.slice(6)}`,
                },
            })
            .then((res) => this.setState({ user: res.data.data }));
    }
}

export default Profile;
