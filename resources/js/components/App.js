import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from './Home/Home'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {}, isAuth: false };
    }

    componentDidMount() {
        axios
            .post(
                "/api/auth/me",
                { Authorization: `Bearer ${document.cookie.slice(6)}` },
                {
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                }
            )
            .then((res) =>
                this.setState({
                    user: res.data,
                    isAuth: res.status == 200 ? true : false,
                })
            );
    }
    render() {
        return (
            <Router>
                <div className="container">
                    <Switch>
                        <Route path="/" exact>
                            {/* {console.log(this.state.isAuth)} */}
                        </Route>
                        <Route path="/login" exact>
                            {this.state.isAuth ? (
                                <Redirect to="/home" />
                            ) : (
                                <Login />
                            )}
                        </Route>
                        <Route path="/register" exact>
                            {this.state.isAuth ? (
                                <Redirect to="/home" />
                            ) : (
                                <Register />
                            )}
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
