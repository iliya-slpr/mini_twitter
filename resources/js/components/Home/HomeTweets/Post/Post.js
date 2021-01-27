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
const reactStringReplace = require("react-string-replace");

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet_id: this.props.id,
            liked: this.props.liked,
            retweeted: this.props.retweeted,
            me_id: this.props.me_id,
            likes_count: this.props.likes_count,
        };
        this.likeHandler = this.likeHandler.bind(this);
        this.retweetHandler = this.retweetHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    deleteHandler() {
        axios
            .post(
                "/api/tweets/delete",
                { tweet_id: this.state.tweet_id },
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Bearer ${document.cookie.slice(6)}`,
                    },
                }
            )
            .then((res) =>
                swal("success", "tweet successfully deleted", "success")
            );

        this.props.reload();
    }

    likeHandler() {
        console.log(this.state.likes_count);
        this.setState((prevState) => ({ liked: !prevState.liked }));
        if (!this.state.liked) {
            this.setState((prevState) => ({
                likes_count: prevState.likes_count + 1,
            }));
        } else {
            this.setState((prevState) => ({
                likes_count: prevState.likes_count - 1,
            }));
        }
        axios.post(
            "/api/tweets/likeOrNot",
            { tweet_id: this.state.tweet_id },
            {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${document.cookie.slice(6)}`,
                },
            }
        );
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
                        {this.props.retweeted ? (
                            <span style={{ fontSize: "1.1em", color: "green" }}>
                                <i className="fas fa-retweet"></i>
                            </span>
                        ) : null}

                        <Link to={`/user/${this.props.authorId}`}>
                            <span className={classes.author}>
                                {"  " + this.props.author}
                            </span>
                        </Link>
                    </h5>
                    {this.props.time}
                    <br />
                </div>
                <span className="text-white">
                    {reactStringReplace(
                        this.props.body,
                        /#(\S*)/g,
                        (match, i) => (
                            <Link
                                key={i}
                                to={`/hash/${match}`}
                                style={{ color: "#4b7095" }}
                            >
                                {"#" + match}
                            </Link>
                        )
                    )}
                </span>
                <div className={classes.footer}>
                    <span
                        className={
                            this.state.liked ? classes.liked : classes.like
                        }
                        onClick={this.likeHandler}
                    >
                        <i className="far fa-heart"></i>
                        <span> {this.state.likes_count}</span>
                    </span>
                    <span
                        className={classes.retweet}
                        onClick={this.retweetHandler}
                    >
                        <i className="fas fa-retweet"></i>
                    </span>
                    <span>
                        {this.props.isme ? (
                            <span
                                onClick={this.deleteHandler}
                                style={{ fontSize: "1.1em", color: "red" }}
                            >
                                <i className="fas fa-trash"></i>
                            </span>
                        ) : null}
                    </span>
                </div>
            </div>
        );
    }
}

export default Post;
