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
                if (res.data.data.search_type == "user") {
                    this.setState({
                        results: res.data.data.users,
                        type: "user",
                    });
                } else {
                    this.setState({
                        results: res.data.data.tweets,
                        type: res.data.data.search_type,
                    });
                }
            });
    }
    render() {
        console.log(this.state.results);
        if(this.state.type ==='user'){
            let listOfReuslts = this.state.results.map((result) => (
                <SearchResult title={result.name} />
            ));
        }
        else{
            let listOfReuslts = this.state.results.map((result) => (
                <SearchResult title={result.name} />

        }
        
        console.log(this.state.results);
        return (
            <InputGroup className="mb-3">
                <FormControl
                    onChange={this.changeHandler}
                    placeholder="Recipient's username"
                    aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Append>
                    <InputGroup.Text className="bg-light">
                        <i className="fas fa-search"></i>
                    </InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

export default Search;
