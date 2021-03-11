import React from 'react';
import { withRouter } from 'react-router-dom';
import logo from '../logo.svg';
import './Login.css';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            emailCompleted:false,
            invalidCredentials: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.formComplete = this.formComplete.bind(this);
        const storedToken = localStorage.getItem("token");
        if(storedToken != null){
            this.props.history.push("/user-info");
        }
    }
    handleEmailChange(event){
        this.setState({email: event.target.value});
    }
    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }
    handleFormSubmit(event){
        event.preventDefault();
        this.formComplete();
    }
    formComplete(){
        if(this.state.emailCompleted){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: this.state.email, password: this.state.password })
            };
            fetch('http://localhost:8080/api/v0/authenticate', requestOptions)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("token",data.jwt);
                    this.props.history.push("/user-info");
                },err => this.setState({invalidCredentials:true}))
        }
        else{
            this.setState({emailCompleted:true});
        }
    }
    render() {
        return (
            <div className="Login">
              <div className="login-body">
                <div className="login-panel">
                    <div className="panel-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Log in to your account</h2>
                    </div>    
                    <div className="panel-body">
                      <form onSubmit={this.handleFormSubmit}>
                            <div className="input-group">
                                <input id="email" type="text" className="form-input" placeholder="Email" onChange={this.handleEmailChange} disabled={this.state.emailCompleted}/>                  
                                {
                                    this.state.emailCompleted ? 
                                    (
                                        <a href="#email" className="email-change-btn" onClick={() => this.setState({emailCompleted:false,invalidCredentials:false})}>Change</a>
                                    ) : null
                                }
                            </div>
                            {
                                this.state.emailCompleted ? 
                                (
                                    <div className="input-group">
                                        <input id="password" type="password" className="form-input" placeholder="Password" onChange={this.handlePasswordChange}/>                  
                                    </div>
                                ) : null
                            }
                            {
                                this.state.invalidCredentials ?
                                (
                                    <div className="login-error">
                                        The credentials are not valid
                                    </div>
                                ) : null
                            }
                            <div>
                                <button type="button" id="btn-send" className="form-button" onClick={this.formComplete} disabled={this.state.email.length === 0}>
                                    {this.state.emailCompleted ? 'Login' : 'Next'}
                                </button>
                            </div>
                        </form> 
                    </div>              
                </div>  
              </div>
            </div>
        );
    }
}
export default withRouter(Login);