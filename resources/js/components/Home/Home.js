import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Dialog from "../Modal/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeTweets from "./HomeTweets/HomeTweets";
import classes from "./Home.module.css";
import Badge from "react-bootstrap/Badge";

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
        console.log(this.props.user);
        return (
            <div className={classes.main}>
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <div className={classes.leftside}>
                                <h2 className="text-white">
                                    <b>{this.props.user.name}</b>
                                </h2>
                                <h6 className="text-white">
                                    Created At:
                                    <Badge variant="secondary">
                                        {this.props.user.created_at}
                                    </Badge>
                                </h6>

                                <Link to={`/user/${this.props.user.id}`}>
                                    <Button variant="success">
                                        My Profile
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                        <Col md={6} className={classes.border}>
                            <HomeTweets user={this.props.user} />
                        </Col>
                        <Col md={3} style={{ padding: "2em 1em" }}></Col>
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
