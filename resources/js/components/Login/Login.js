import React, { Component } from "react";
import classes from './Login.module.css'
import {Link} from 'react-router-dom';
class Login extends Component {
    render() {
        return(
        <div className={classes.loginPage}>
            <div className={classes.form}>
                {/* <form className={classes.registerForm}>
                    <input type="text" placeholder="name" />
                    <input type="password" placeholder="password" />
                    <input type="text" placeholder="email address" />
                    <button>create</button>
                    <p className={classes.message}>
                        Already registered? <a href="#">Sign In</a>
                    </p>
                </form> */}
                <form className={classes.loginForm}>
                    <input type="text" placeholder="username" />
                    <input type="password" placeholder="password" />
                    <button>login</button>
                    <p className={classes.message}>
                        Not registered? <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
        )
    }
}

export default Login;
