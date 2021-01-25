import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import classes from "./Post.module.css";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { tweet_id: this.props.id , liked: this.props.liked};
        this.likeHandler = this.likeHandler.bind(this);
        
    }
    likeHandler() {
        this.setState((prevState)=>({liked: !prevState.liked}));
        console.log(this.state.tweet_id);
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
    render() {
        return (
            <div className={classes.body}>
                <div className={classes.title}>
                    <h5>{this.props.author}</h5> {this.props.time}
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
                    <span className={classes.retweet}>
                        <i className="fas fa-retweet"></i>
                    </span>
                </div>
            </div>
        );
    }
}

export default Post;
