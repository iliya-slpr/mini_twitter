import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import classes from "./Post.module.css";

class Post extends Component {
    render() {
        return (
            <div className={classes.body}>
                <div className={classes.title}>
                    <h5>{this.props.author}</h5> {this.props.time}
                    <br />
                </div>
                <span className="text-white">{this.props.body}</span>
                <div className={classes.footer}>
                    <span className={classes.like}><i className="fas fa-retweet"></i></span>
                    <span className={classes.retweet}><i className="far fa-heart"></i></span>
                </div>
            </div>
        );
    }
}

export default Post;
