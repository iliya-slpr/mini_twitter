import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import classes from "./Profile.module.css";
import Post from "../Home/HomeTweets/Post/Post";
import Badge from "react-bootstrap/Badge";
class Profile extends Component {
    constructor(props) {
        super(props);
        this.followHandler = this.followHandler.bind(this);
        this.state = { user: {}, followed: null, tweets: [] };
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
    render() {
        let amIFollowed = this.state.followed;
        console.log(this.state.user);
        let listOfTweets = this.state.tweets.map((tweet, index) => (
            <Post
                key={`${index}m`}
                body={tweet.body}
                time={tweet.created_at}
                id={tweet.id}
                liked={tweet.am_i_liked}
                retweeted={tweet.retweeted}
                author={this.state.user.name}
            ></Post>
        ));
        return (
            <Container fluid>
                <Row style={{ borderBottom: "1px solid #38444d" }}>
                    <Col xs={3}></Col>
                    <Col xs={6} className={classes.header}>
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
                        <Button
                            onClick={this.followHandler}
                            variant={amIFollowed ? "primary" : "light"}
                        >
                            {amIFollowed ? "Unfollow" : "Follow"}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}></Col>
                    <Col xs={6}>
                        {" "}
                        <div>{listOfTweets}</div>
                    </Col>
                </Row>
            </Container>
        );
    }
    componentDidMount() {
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
    }
}

export default Profile;
