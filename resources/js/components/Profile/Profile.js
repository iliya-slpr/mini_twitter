import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import classes from "./Profile.module.css";
import Post from "../Home/HomeTweets/Post/Post";
import Badge from "react-bootstrap/Badge";
import EditModal from "./EditModal/EditModal";
class Profile extends Component {
    constructor(props) {
        super(props);
        this.followHandler = this.followHandler.bind(this);
        this.state = { user: {}, followed: null, tweets: [], me: {} };
        this.reload = this.reload.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
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

    followHandler() {
        this.setState((prevState) => ({ followed: !prevState.followed }));
        axios.post(
            "/api/users/followOrNot",
            { user_id: this.state.user.id },
            {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${document.cookie.slice(6)}`,
                },
            }
        );
    }

    reload() {
        axios
            .get("/api/tweets/explore", {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${document.cookie.slice(6)}`,
                },
            })
            .then((res) => this.setState({ tweets: res.data.data.tweets }));
    }
    render() {
        let closeHandler = () => this.setState({ modalShow: false });
        let openHandler = () => this.setState({ modalShow: true });
        let reload = () => {
            let userId = this.props.match.params.id;

            axios
                .get(`/api/users/get?user_id=${userId}`, {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Bearer ${document.cookie.slice(6)}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                    this.setState({
                        user: res.data.data.user,
                        followed: res.data.data.user.am_i_followed,
                        tweets: res.data.data.user.tweets,
                    });
                });
        };
        let amIFollowed = this.state.followed;
        let isMe = this.state.me.id === this.state.user.id;
        console.log(this.state.tweets);
        let listOfTweets = this.state.tweets.map((tweet, index) => (
            <Post
                key={`${index}m`}
                body={tweet.body}
                time={tweet.created_at}
                id={tweet.id}
                liked={tweet.am_i_liked}
                retweeted={tweet.retweeted}
                author={this.state.user.name}
                reload={reload}
                isme={isMe}
                likes_count={tweet.likes_count}
            ></Post>
        ));

        return (
            <Container fluid>
                <Row style={{ borderBottom: "1px solid #38444d" }}>
                    <Col md={3}></Col>
                    <Col md={6} xs={12} className={classes.header}>
                        <h3 className="text-white">{this.state.user.name}</h3>
                        <h6 className="text-white">
                            Followers
                            <Badge variant="secondary">
                                {this.state.user.followers_count}
                            </Badge>
                        </h6>
                        <h6 className="text-white">
                            Following
                            <Badge variant="secondary">
                                {this.state.user.following_count}
                            </Badge>
                        </h6>
                        {!isMe ? (
                            <Button
                                onClick={this.followHandler}
                                variant={amIFollowed ? "primary" : "light"}
                            >
                                {amIFollowed ? "Unfollow" : "Follow"}
                            </Button>
                        ) : (
                            <Button variant={"warning"} onClick={openHandler}>
                                Edit Profile
                            </Button>
                        )}
                        <EditModal
                            show={this.state.modalShow}
                            onHide={closeHandler}
                            myname={this.state.me.name}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <div className={classes.leftside}>
                            <h2 className="text-white">
                                <b>{this.state.me.name}</b>
                            </h2>
                            <h6 className="text-white">
                                Created At:
                                <Badge variant="secondary">
                                    {this.state.me.created_at}
                                </Badge>
                            </h6>

                            <Link to={`/home`}>
                                <Button variant="info" className="mb-2">
                                    Home
                                </Button>
                            </Link>
                            <Link to={`/user/${this.state.me.id}`}>
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
                    <Col xs={6}>
                        {" "}
                        <div>{listOfTweets}</div>
                    </Col>
                </Row>
            </Container>
        );
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        let userId = this.props.match.params.id;

        axios
            .get(`/api/users/get?user_id=${userId}`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${document.cookie.slice(6)}`,
                },
            })
            .then((res) =>
                this.setState({
                    user: res.data.data.user,
                    followed: res.data.data.user.am_i_followed,
                    tweets: res.data.data.user.tweets,
                })
            );

        axios
            .post(
                "/api/auth/me",
                { Authorization: `Bearer ${document.cookie.slice(6)}` },
                {
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                }
            )
            .then((res) =>
                this.setState({
                    me: res.data,
                })
            );
    }
}

export default Profile;
