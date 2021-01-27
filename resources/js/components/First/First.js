import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import classes from "./First.module.css";
import Button from "react-bootstrap/Button";
class First extends Component {
    render() {
        return (
            <div className={classes.container}>
                <div
                    className="bg-white"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "5em",
                    }}
                >
                    <br />
                    <h1 className="text-primary">UniTwitter</h1>
                    <Link to="/login">
                        <Button variant="primary" size="lg">
                            Login
                        </Button>
                    </Link>
                    <br />
                    <Link to="/register">
                        <Button variant="light" size="lg">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}
export default First;
