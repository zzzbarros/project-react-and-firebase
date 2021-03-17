import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';

import './dashboard.css';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            nome: localStorage.nome
        };

        this.logout = this.logout.bind(this);
    }

    logout = async() => {
        await firebase.logout()
        .catch((error) => {
            console.log(error);
      });
      localStorage.removeItem("nome");
      this.props.history.push('/');
    }

    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome;
            this.setState({nome: localStorage.nome });
        })
    }

    render(){
        return(
            <div id="dashboard">
                <div className="user-info"> 
                    <h1>--Painel de Controle--</h1>
                    <h2>Bem-vindo {this.state.nome}!</h2>
                    <p>Logado com: {firebase.getCurrent()}</p>
                </div>
                <div className="user-menu">
                    <Link to="/dashboard/new">Novo Post</Link>
                    <button onClick={() => this.logout()}>Logout</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);