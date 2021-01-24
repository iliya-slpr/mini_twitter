import React, { Component } from "react";
import classes from "./Register.module.css";
import { Link } from "react-router-dom";

class Register extends Component {
    render() {
        return (
            <div className={classes.loginPage}>
                <div className={classes.form}>
                    <form className={classes.loginForm}>
                        <input type="text" placeholder="username" />
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Password Again" />
                        <button>Register</button>
                        <p className={classes.message}>
                            Not registered?{" "}
                            <Link to="/login">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
