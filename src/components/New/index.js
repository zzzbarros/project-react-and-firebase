import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './new.css';

class New extends Component {

    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            alert: '',
            progress: 0
        };

        this.cadastrar = this.cadastrar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidMount() {
        if(!firebase.getCurrent()){
            this.props.history.replace('/');
            return null;
        }
    }

    cadastrar = async(e) => {
        e.preventDefault();

        if (this.state.titulo !== '' &&
            this.state.imagem !== null &&
            this.state.descricao !== '' &&
            this.state.url !== '') {
                let posts = firebase.app.ref('posts');
                let chave = posts.push().key;
                await posts.child(chave).set({
                    titulo: this.state.titulo,
                    imagem: this.state.url,
                    descricao: this.state.descricao,
                    autor: localStorage.nome
                });
            this.props.history.push('/dashboard');
        } else {
            this.setState({alert: 'Preencha todos os campos!'})
        }
    }

    handleFile = async(e) => {

        if (e.target.files[0]){
            
            const image = e.target.files[0];

            if (image.type === 'image/png' || image.type === 'image/jpeg'){
                await this.setState({imagem: image});
                this.handleUpload();
            } else {
                alert('Envie uma imagem do tipo PNG ou JPG');
                this.setState({imagem: null});
                return null;
            }
        }
    }

    handleUpload = async() => {
        const {imagem} = this.state;
        const currentUid = firebase.getCurrentUid();
        
        const uploadTaks = firebase.storage.ref(`images/${currentUid}/${imagem.name}`)
        .put(imagem);

        await uploadTaks.on('state_changed', 
        (snapshot) => {
            //progress
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
        },
        (error) => {
            //error
        }, 
        () => {
            //sucesso!
            firebase.storage.ref(`images/${currentUid}`)
            .child(imagem.name).getDownloadURL()
            .then(url => {
                this.setState({url: url});
            })
        })
    }

    render(){
        return(
            <div id="main-content">

               <header id="new">
                    <Link to="/dashboard">voltar</Link>
               </header>

               <form id="new-post" onSubmit={this.cadastrar}>
                    
                    <input type="file" onChange={this.handleFile} /> 
                    
                    {this.state.url !== '' ?
                        <img src={this.state.url} width="250" height="150" alt="Capa do post"/>
                        : 
                        <progress value={this.state.progress} max="100"/>
                    }


                   <label>Titulo:</label>
                   <input type="text" placeholder="Nome do post" value={this.state.titulo} autoFocus
                        onChange={(e) => this.setState({titulo: e.target.value})} />

                    <label>Descrição:</label>
                    <textarea type="text" placeholder="Descrição do seu post..." value={this.state.descricao}
                        onChange={(e) => this.setState({descricao: e.target.value})} />

                    <span>{this.state.alert}</span>
                    <button type="submit">Cadastrar</button>
               </form>

            </div>
        );
    }
}

export default withRouter(New);