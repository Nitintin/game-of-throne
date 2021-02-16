import axios from 'axios';
import Spinner from '../images/spinner.gif';
import React, {useEffect, useState}from 'react'

const Character = ({match}) => {

    const[charDetail,setCharDetail]=useState({});
    const[isLoading,setIsLoading]=useState(true);
    const[quote,setQuote]=useState([]);

    useEffect(() => {
        const getCharacterDetail = async () => {
            const result = await axios.get(
                `https://raw.githubusercontent.com/jeffreylancaster/game-of-thrones/master/data/characters.json`);

            setCharDetail(result.data.characters.filter(detail => detail.houseName && detail.characterImageThumb ));
            getQuotes();
        }

        const getQuotes = async () => {
            const result = await axios.get(
                `https://game-of-thrones-quotes.herokuapp.com/v1/characters`);
            
            setQuote(result.data);
            setIsLoading(false);
        }

        getCharacterDetail();
    },[])

    if(isLoading){
        return(<img src={Spinner} alt="spinner image" class="spinnerImg"/>);
    }else{
        const allDeatil = charDetail.filter(item => item.characterLink === "/character/"+match.params.characterLink+"/");
        const allQuote = quote.filter(item => item.name === allDeatil[0].characterName);

        return (
            <div className="characterDetailContainer">
                <div className="detailHolder">
                    {/* <div className="characterImage">
                        <img src={allDeatil[0].characterImageFull} alt='character detail'></img>
                    </div> */}
                    <div className="characterFacts">
                        <h2><center>{allDeatil[0].characterName}</center></h2>
                        <hr/>
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>House Name :</strong></td>
                                    <td>{allDeatil[0].houseName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Married To :</strong></td>
                                    <td>
                                        {allDeatil[0].marriedEngaged ? allDeatil[0].marriedEngaged.map(item => (<span className>{item}</span>)) : (<span className="noData">Not yet married/engaged</span>)}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Killed :</strong></td>
                                    <td>
                                        {allDeatil[0].killed ? allDeatil[0].killed.map(item => (<span className="listItem">{item}</span>)) : (<span className="noData">No reported killings</span>)}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Parents :</strong></td>
                                    <td>
                                        {allDeatil[0].parents ? allDeatil[0].parents.map(item => (<span className="listItem">{item}</span>)) : (<span className="noData">Parents unknown</span>)}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Siblings : </strong></td>
                                    <td>
                                        {allDeatil[0].siblings ? allDeatil[0].siblings.map(item => (<span className="listItem">{item}</span>)) : (<span className="noData">No siblings</span>)}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Quotes : </strong></td>
                                    <td>
                                        {allQuote.length>0 ? allQuote[0].quotes.map(item => (<span className="listItem">{item}</span>)) : (<span className="noData">no famous quotes</span>)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )

    }
}

export default Character
