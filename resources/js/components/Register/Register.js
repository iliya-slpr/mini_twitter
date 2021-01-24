import React, { Component } from "react";
import classes from "./Register.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

class Register extends Component {
    constructor(props){
        super(props);
       

    }
    submitHanlder(e){
        e.preventDefault();
        let data = {name: e.target[0].value , email: e.target[1].value , password:e.target[2].value , password_confirmation: e.target[3].value}
        axios.post('/api/auth/register' , data, {headers:{'X-Requested-With': 'XMLHttpRequest'}})
        .then(res =>{
            if(res.data.status) window.location.href = "/home";
            else{
                let strErrors = '';
                let errors = res.data.data;
                for(let att in errors){
                    strErrors+= errors[att].join('\n');
                    strErrors+='\n';
                }
                
                swal('Register Failed', strErrors, "error")
            }
        })
        
    }
    render() {
        return (
            <div className={classes.loginPage}>
                <div className={classes.form}>
                    <form onSubmit={this.submitHanlder} className={classes.loginForm}>
                        <input type="text" placeholder="username" />
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Password Again" />
                        <button>Register</button>
                        <p className={classes.message}>
                            Already registered?{" "}
                            <Link to="/login">login</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
