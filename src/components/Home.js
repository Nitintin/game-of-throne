import React from 'react'
import Spinner from '../images/spinner.gif';
import {Link} from 'react-router-dom'

const Home = ({characters, isLoading}) => {
    const displayCharacters = ()=>{
        if(isLoading){
            return(<img src={Spinner} alt="spinner image" class="spinnerImg"/>);
        }else{
            const girdList = characters.filter(detail => detail.houseName && detail.characterImageThumb ).map(item => (
                <Link to={item.characterLink} key={item.characterLink}>
                    <div className="grid-item" >
                        <div className="grid-inner">
                            <div className="grid-front">
                                <img src={item.characterImageFull} alt={item.characterName}/>
                            </div>
                            <div className="grid-back">
                                <h3>{item.characterName}</h3>
                                <hr/>
                                <ul>
                                    <li>
                                        <strong>House :</strong> {item.houseName}
                                    </li>
                                    <li>
                                        <strong>Actor Name :</strong> {item.actorName}
                                    </li>
                                    <li>
                                        <center>
                                            <small>(Click to get more info)</small>
                                        </center>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Link>
            ));
            return girdList;
        }
    }

    return (
        <div className="home">
            <div className="grid-container">
                {displayCharacters()}
            </div>
        </div>
    )
}

export default Home
