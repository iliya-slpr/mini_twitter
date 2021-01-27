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
        this.activityHandler = this.activityHandler.bind(this);
        this.logsHandler = this.logsHandler.bind(this);
    }
    logsHandler() {
        axios
            .get("/api/users/logs", {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${document.cookie.slice(6)}`,
                },
            })
            .then((res) => {
                console.log(res.data.data.logs);
                let activities = res.data.data.logs;
                let stringLogs = "";
                activities.forEach((log) => {
                    if (log.type == "follow") {
                        stringLogs += `You followed ${log.user_id} you at ${log.date_time}\n`;
                    }
                    if (log.type == "retweet") {
                        stringLogs += `You Retweeted id:${log.tweet_id} at ${log.date_time}\n`;
                    }
                    if (log.type == "like") {
                        stringLogs += ` You liked id:${log.tweet_id} tweet at ${log.date_time}\n`;
                    }
                    swal("Logs", stringLogs, "info");
                });
            });
    }

    activityHandler() {
        axios
            .get("/api/users/recent", {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${document.cookie.slice(6)}`,
                },
            })
            .then((res) => {
                console.log(res.data.data.recent_activities);
                let activities = res.data.data.recent_activities;
                let stringLogs = "";
                activities.forEach((log) => {
                    axios
                        .get(`/api/users/get?user_id=${log.user_id}`, {
                            headers: {
                                "X-Requested-With": "XMLHttpRequest",
                                Authorization: `Bearer ${document.cookie.slice(
                                    6
                                )}`,
                            },
                        })
                        .then((response) => {
                            let username = response.data.data.user.name;
                            console.log(username);
                            if (log.type == "follow") {
                                stringLogs += `${username} followed you at ${log.date_time}\n`;
                            }
                            if (log.type == "retweet") {
                                stringLogs += `${username} retweet your Tweet at ${log.date_time}\n`;
                            }
                            if (log.type == "like") {
                                stringLogs += `${username} liked your tweet at ${log.date_time}\n`;
                            }
                            swal("Logs", stringLogs, "info");
                        });
                });
            });
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
                                    variant="info"
                                    className="mb-2"
                                    onClick={this.logsHandler}
                                >
                                    Logs
                                </Button>

                                <Button
                                    variant="info"
                                    className="mb-2"
                                    onClick={this.activityHandler}
                                >
                                    Activity
                                </Button>

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
