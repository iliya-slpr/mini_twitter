import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./Hashtags.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Post from "../Home/HomeTweets/Post/Post";
import Search from "../Home/HomeTweets/Search/Search";
class Hashtag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            query: this.props.match.params.hashtag,
            user: {},
        };
        this.logoutHandler = this.logoutHandler.bind(this);
    }
    logoutHandler() {
        axios
            .post("/api/auth/logout", {
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
        console.log(this.state.tweets);
        console.log(this.state.user);
        let listOfTweets = this.state.tweets.map((tweet, index) => (
            <Post
                key={`${index}m`}
                body={tweet.body}
                author={tweet.user.name}
                time={tweet.created_at}
                id={tweet.id}
                liked={tweet.am_i_liked}
                authorId={tweet.user.id}
                retweeted={tweet.retweeted}
                isme={this.state.user.id === tweet.user.id}
                likes_count={tweet.likes_count}
            ></Post>
        ));
        return (
            <Container fluid>
                <Row>
                    <Col xs={3}>
                        <div className={classes.leftside}>
                            <h2 className="text-white">
                                <b>{this.state.user.name}</b>
                            </h2>
                            <h6 className="text-white">
                                Created At:
                                <Badge variant="secondary">
                                    {this.state.user.created_at}
                                </Badge>
                            </h6>

                            <Link to={`/home`}>
                                <Button variant="info" className="mb-2">
                                    Home
                                </Button>
                            </Link>

                            <Link to={`/user/${this.state.user.id}`}>
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
                    <Col xs={6}>{listOfTweets}</Col>
                    <Col xs={3} className="mt-3">
                        <Search />
                    </Col>
                </Row>
            </Container>
        );
    }
    componentDidMount() {
        axios
            .post(
                "/api/search",
                { q: `#${this.state.query}` },
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Bearer ${document.cookie.slice(6)}`,
                    },
                }
            )
            .then((res) => this.setState({ tweets: res.data.data.tweets }));

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
                    user: res.data,
                    isAuth: res.status == 200 ? true : false,
                })
            );
    }
}

export default Hashtag;
