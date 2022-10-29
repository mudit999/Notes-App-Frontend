import React from 'react';
import './Footer.css';
import GitHubImage  from './../../images/GitHub-Mark-32px.png'

const Footer = () => {
    return(
        <div className='footer'>
            <a href='https://github.com/mudit999/Notes-Mern-App' target='_blank'>
                <img src= {GitHubImage} alt='Github-Link'/>
            </a>
        </div>
    )
}

export default Footer