import React from 'react'
import Spinner from '../images/spinner.gif';
import {Link} from 'react-router-dom'
import Search from './Search';

const Home = ({characters, isLoading, mainFilter,match}) => {
    
    const displayCharacters = ()=>{
        
        if(isLoading){
            return(<img src={Spinner} alt="spinner image" className="spinnerImg"/>);
        }else{
            if(!match){
                document.getElementsByClassName("App")[0].classList.remove("quizBackground");
                document.getElementsByClassName("App")[0].classList.remove("characterBackground");
                document.getElementsByClassName("App")[0].classList.add("homeBackground");
            }
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
        <>
            <Search mainFilter={mainFilter}/>
            <div className="home">
                <div className="grid-container">
                    {displayCharacters()}
                </div>
            </div>
        </>
        
    )
}

export default Home
