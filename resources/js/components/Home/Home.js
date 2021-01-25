import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Dialog from "../Modal/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeTweets from './HomeTweets/HomeTweets'
import classes from "./Home.module.css";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        };
    }
    render() {
        let closeHandler = () => this.setState({ modalShow: false });
        let openHandler = () => this.setState({ modalShow: true });

        return (
            <div className={classes.main}>
                <Container fluid >
                    <Row>
                        <Col md={3}>11</Col>
                        <Col md={6} className={classes.border}><HomeTweets user={this.props.user} /></Col>
                        <Col md={3}>33</Col>
                    </Row>
                </Container>
                <Button
                    className={classes.fixedButton}
                    onClick={openHandler}
                    size="lg"
                >
                    New Twitt
                </Button>
                <Dialog
                    show={this.state.modalShow}
                    onHide={closeHandler}
                    title="New Twitt"
                />
            </div>
        );
    }
}

export default Home;
