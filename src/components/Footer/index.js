import React from 'react';

import './footer.css';

function Footer() {
    return(
        <footer id="main-footer">
            <div className="footer-content">
                <strong>Blog<span>React</span></strong>
                <a target="git" href="https://github.com/zzzbarros">
                    <img src="https://firebasestorage.googleapis.com/v0/b/project-firebase-c495f.appspot.com/o/images%2FSite%2FGitHub-Mark-Light-64px.png?alt=media&token=5348b0fc-e8f5-45d4-884a-3f767d4398b2" 
                        alt="git-logo"/>
                </a>
            </div>
        </footer>
    );
}

export default Footer;