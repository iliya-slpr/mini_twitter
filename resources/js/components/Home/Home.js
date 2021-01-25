import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Dialog from '../Modal/Modal'
import Button from 'react-bootstrap/Button'

import classes from './Home.module.css'
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalShow: false
          };
    }
    render(){
        let closeHandler = () => this.setState({ modalShow: false });
        let openHandler = () => this.setState({ modalShow: true });
        const twitt = ()=>{
            
        }
        return(
            <div>
            <Button className={classes.fixedButton} onClick={openHandler}>New Twitt</Button>
            <Dialog show={this.state.modalShow} onHide={closeHandler} title="New Twitt"> fdsfsdfsdf </Dialog>
            </div>
        )
    }
}

export default Home;
