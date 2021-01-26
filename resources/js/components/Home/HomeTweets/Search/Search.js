import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Search.module.css";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { query: "", loading: false, message: "" };
    }
    render() {
        return (
            <div className={classes.container}>
                <label className={classes.label} htmlFor="search-input">
                    <input
                        type="text"
                        value=""
                        id="search-input"
                        placeholder="Search..."
                    />
                    <i className="fa fa-search search-icon" />
                </label>
            </div>
        );
    }
}

export default Search;
