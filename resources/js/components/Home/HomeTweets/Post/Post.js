import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import swal from "sweetalert";
import classes from "./Post.module.css";
import { Link } from "react-router-dom";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet_id: this.props.id,
            liked: this.props.liked,
            retweeted: this.props.retweeted,
        };
        this.likeHandler = this.likeHandler.bind(this);
        this.retweetHandler = this.retweetHandler.bind(this);
    }
    likeHandler() {
        this.setState((prevState) => ({ liked: !prevState.liked }));
        axios
            .post(
                "/api/tweets/likeOrNot",
                { tweet_id: this.state.tweet_id },
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Bearer ${document.cookie.slice(6)}`,
                    },
                }
            )
            .then((res) => console.log(res));
    }

    retweetHandler() {
        axios
            .post(
                "/api/tweets/retweet",
                { tweet_id: this.state.tweet_id },
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Bearer ${document.cookie.slice(6)}`,
                    },
                }
            )
            .then((res) =>
                swal("success", "successfully retweeted", "success")
            );
    }
    render() {
        return (
            <div className={classes.body}>
                <div className={classes.title}>
                    <h5>
                        <Link to={`/user/${this.props.authorId}`}>
                            {this.props.author}
                        </Link>
                    </h5>
                    {this.props.time}
                    <br />
                </div>
                <span className="text-white">{this.props.body}</span>
                <div className={classes.footer}>
                    <span
                        className={
                            this.state.liked ? classes.liked : classes.like
                        }
                        onClick={this.likeHandler}
                    >
                        <i className="far fa-heart"></i>
                    </span>
                    <span
                        className={classes.retweet}
                        onClick={this.retweetHandler}
                    >
                        <i className="fas fa-retweet"></i>
                    </span>
                </div>
            </div>
        );
    }
}

export default Post;
