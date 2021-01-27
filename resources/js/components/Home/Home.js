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
import Search from "./HomeTweets/Search/Search";
class Home extends Component {
    constructor(props) {
        super(props);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.state = {
            modalShow: false,
        };
    }
    logoutHandler() {
        axios
            .post("api/auth/logout", {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${document.cookie.slice(6)}`,
                },
            })
            .then((res) => {
                window.location.href = "/";
            });
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
                                    <Button variant="success" className="mb-2">
                                        My Profile
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    onClick={this.logoutHandler}
                                >
                                    Logout
                                </Button>
                            </div>
                        </Col>
                        <Col md={6} className={classes.border}>
                            <div className={classes.home}>
                                <h1 className={classes.homeText}>Home</h1>
                            </div>
                            <HomeTweets user={this.props.user} />
                        </Col>
                        <Col md={3} style={{ padding: "2em" }}>
                            <Search />
                        </Col>
                    </Row>
                </Container>
                <Button
                    className={classes.fixedButton}
                    onClick={openHandler}
                    size="lg"
                >
                    New Tweet
                </Button>
                <Dialog
                    show={this.state.modalShow}
                    onHide={closeHandler}
                    title="New tweet"
                />
            </div>
        );
    }
}

export default Home;
