import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Search.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import SearchResult from "./SearchResult/SearchResult";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { query: "", loading: false, message: "", results: [] };
        this.changeHandler = this.changeHandler.bind(this);
    }
    changeHandler(e) {
        this.setState({ query: e.target.value, type: "", loading: true });
        if (
            this.state.query.length == 0 ||
            this.state.query.length == 1 ||
            this.state.query.length == 2
        ) {
            this.setState({ loaded: false });
        }
        if (this.state.query.length > 2) {
            axios
                .post(
                    "/api/search",
                    { q: this.state.query },
                    {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            Authorization: `Bearer ${document.cookie.slice(6)}`,
                        },
                    }
                )
                .then((res) => {
                    this.setState({
                        results:
                            res.data.data.search_type == "user"
                                ? res.data.data.users
                                : res.data.data.tweets,
                        type: res.data.data.search_type,
                    });
                    this.setState({ loaded: true });
                });
        }
    }
    render() {
        let listOfReuslts = [];
        if (this.state.type === "user" && this.state.loaded) {
            listOfReuslts = this.state.results.map((user, index) => (
                <SearchResult user={user} type="user" key={index} />
            ));
        }
        if (
            (this.state.type === "tweet" || this.state.type === "hashtag") &&
            this.state.loaded
        ) {
            listOfReuslts = this.state.results.map((result, index) => (
                <SearchResult
                    key={index}
                    type="tweet"
                    user={result.user}
                    body={result.body}
                />
            ));
        }

        return (
            <div>
                <InputGroup onChange={this.changeHandler}>
                    <FormControl
                        placeholder="Recipient's username"
                        aria-label="Amount (to the nearest dollar)"
                    />
                    <InputGroup.Append>
                        <InputGroup.Text className="bg-light">
                            <i className="fas fa-search"></i>
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                {this.state.query.length > 1 &&
                this.state.results.length == 0 ? (
                    <h4 className="bg-white">No Result</h4>
                ) : (
                    listOfReuslts
                )}
            </div>
        );
    }
}

export default Search;
