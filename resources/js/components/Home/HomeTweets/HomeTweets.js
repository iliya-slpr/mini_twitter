import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./HomeTweets.module.css";
import Post from "./Post/Post";
class HomeTweets extends Component {
    constructor(props) {
        super(props);
        this.state = { tweets: [] };
        this.reload = this.reload.bind(this);
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
        console.log(this.state.tweets);
        const listOfTweets = this.state.tweets.map((tweet, index) => (
            <Post
                key={`${index}m`}
                body={tweet.body}
                author={tweet.user.name}
                time={tweet.created_at}
                id={tweet.id}
                liked={tweet.am_i_liked}
                authorId={tweet.user.id}
                retweeted={tweet.retweeted}
                me_id={this.props.user.id}
                reload={this.reload}
            ></Post>
        ));
        return <div>{listOfTweets}</div>;
    }
    componentDidMount() {
        axios
            .get("/api/tweets/explore", {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${document.cookie.slice(6)}`,
                },
            })
            .then((res) => this.setState({ tweets: res.data.data.tweets }));
    }
}

export default HomeTweets;
