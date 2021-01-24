import React, { Component } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

class Login extends Component {
    constructor(props) {
        super(props);
    

    }
    

    submitHandler (e) {
        e.preventDefault();
        
        let data = {email: e.target[0].value , password: e.target[1].value}
        console.log(data)
        axios.post('api/auth/login' , data , {headers: {'X-Requested-With': 'XMLHttpRequest'}})
        .then(res=>{
            document.cookie=`token=${res.data.access_token}`
            window.location.href = "/home";
        })
       .catch(error => {swal("Error", "Something Wrong! , please Check your input", "error");
    })

    };
    


    
    render() {
        return (
            <div className={classes.loginPage}>
                <div className={classes.form}>
                    <form
                        onSubmit={this.submitHandler}
                        className={classes.loginForm}
                    >
                        <input
                            type="text"
                            onChange={this.chanegeUsername}
                            placeholder="username"
                        />
                        <input type="password" placeholder="password" onChange={this.changePassword}/>
                        <button>login</button>
                        <p className={classes.message}>
                            Not registered?{" "}
                            <Link to="/register">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;
