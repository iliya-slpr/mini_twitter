import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classes from "./SearchResult.module.css";

class SearchResult extends Component {
    render() {
        if (this.props.type === "user") {
            return (
                <Link to={`/user/${this.props.user.id}`}>
                    <div style={{ padding: "1em" }} className="bg-light">
                        <span className={classes.name}>
                            {this.props.user.name}
                        </span>
                    </div>
                </Link>
            );
        } else {
            return (
                <Link
                    to={`/user/${this.props.user.id}`}
                    style={{ textDecoration: "none" }}
                >
                    <div
                        className="bg-light my-1"
                        style={{ borderRadius: "10px" }}
                    >
                        <h5 className="bg-primary px-2">
                            {this.props.user.name}
                        </h5>
                        <div>{this.props.body}</div>
                    </div>
                </Link>
            );
        }
    }
}

export default SearchResult;
