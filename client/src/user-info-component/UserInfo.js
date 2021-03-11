import React from 'react';
import { withRouter } from 'react-router-dom';
import './UserInfo.css';

class UserInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            logo:"",
            id:"",
            email:"",
            name:"",
            surname:"",
            age:"",
            role:"",
            error:false
        };
        this.logout = this.logout.bind(this);
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        };
        fetch('http://localhost:8080/api/v0/users/me', requestOptions)
            .then(response => response.json())
            .then(
                data => this.setState({logo:data.avatar,id:data.id,email:data.email,name:data.name,surname:data.surname,age:data.age,role:data.role}),
                this.logout
            );
    }
    logout(){
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }
    render() {
        return (
            <div className="UserInfo">
                <div className="user-info-body">
                    <div className="info-panel">
                        <img src={this.state.logo} className="App-logo" alt="avatar" />
                        <div className="info-item">
                            <p>ID: {this.state.id}</p>
                        </div>
                        <div className="info-item">
                            <p>Email: {this.state.email}</p>
                        </div>
                        <div className="info-item">
                            <p>Name: {this.state.name}</p>
                        </div>
                        <div className="info-item">
                            <p>Surname: {this.state.surname}</p>
                        </div>
                        <div className="info-item">
                            <p>Age: {this.state.age}</p>
                        </div>
                        <div className="info-item">
                            <p>Role: {this.state.role}</p>
                        </div>
                        <div>
                            <button type="button" id="btn-send" className="form-button" onClick={this.logout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserInfo);