import React from 'react'
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <center>
            <Link to="/">
                <img src={logo} alt="" width="200"/>
            </Link>
        </center>
    )
}

export default Header
