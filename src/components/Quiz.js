import axios from 'axios';
import Spinner from '../images/spinner.gif';
import React, {useEffect, useState}from 'react'


function Quiz() {

    const[isLoading,setIsLoading]=useState(true);
    const[ApiQuote,setApiQuote]=useState([]);
    const[Questions,setQuestions]=useState({});
    const[options,setOptions]=useState([]);
    let i,j,questionBank =[];    

    useEffect(() => {
        const getApiQuotes = async () => {
            const result = await axios.get(
                `https://game-of-thrones-quotes.herokuapp.com/v1/characters`);
            
            setApiQuote(result.data);
            console.log(result.data);
            console.log(ApiQuote);
            createQuiz();
            setIsLoading(false);
        }
        getApiQuotes();
    },[])

    const checkAnswer= (e)=>{
        console.log(e.target.outerText);

        if(e.target.outerText == Questions.author){
            alert('hey');
        }
    }

    const createQuiz = () => {
        const allAuthor = ApiQuote.map(item => item.name);    
        console.log(ApiQuote);
        //create question bank with its author  
        for(i=0 ; i<ApiQuote.length;i++){
            for(j=0; j<ApiQuote[i].quotes.length ;j++){
                let obj={};
                obj.author=ApiQuote[i].name;
                obj.quote=ApiQuote[i].quotes[j];
                questionBank.push(obj);
            }
        }
        //randomly choose a quote & author from question bank
        const selectedQues= questionBank[Math.floor(Math.random() * questionBank.length)];

        //choose all remaining authors to create options
        const unSelectedAuthor=allAuthor.filter(item => item != selectedQues.author);
        
        //shuffle reamining authors and select any 4
        const shuffled = unSelectedAuthor.sort(() => 0.5 - Math.random());
        let otherOption = shuffled.slice(0, 4);

        //add selected option to other options
        //otherOption.push(selectedQues.author);

        //shuffle final option list to be displayed
        //const finalOption = otherOption.sort(() => 0.5 - Math.random());
        console.log(questionBank);
        //setOptions(finalOption);
        setQuestions(selectedQues);
    }

    const displayQuiz = () =>{
        return(
            <>
                <div className="characterDetailContainer">
                    <div className="detailHolder">
                        <div className="characterFacts">
                            <h2><center>Wowow{Questions.quote}</center></h2>
                            <hr/>
                            <table>
                                <tbody>
                                    {options.map(item => (
                                        <tr >
                                            <td>
                                                <strong>
                                                    item{item}
                                                </strong>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if(true){
        return(<img src={Spinner} alt="spinner image" class="spinnerImg"/>);
    }else{
        return( displayQuiz());
    }
}

export default Quiz
