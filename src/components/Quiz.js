import axios from 'axios';
import Spinner from '../images/spinner.gif';
import React, {useEffect, useState}from 'react'
import {Link} from 'react-router-dom'


function Quiz({match}) {

    const[isLoading,setIsLoading]=useState(true);
    const[ApiQuote,setApiQuote]=useState([]);
    const[Questions,setQuestions]=useState([]);
    const[options,setOptions]=useState([]);
    const[score,setScore]=useState(0);
    const[quesCount,setQuesCount]=useState(0);
    const[result,setResult]=useState(false);
    let i,j,k,questionBank =[];       

    useEffect(() => {
        const getApiQuotes = async () => {
            const result = await axios(
                `https://game-of-thrones-quotes.herokuapp.com/v1/characters`
            )
            setApiQuote(result.data);
            setIsLoading(false);
        }
        getApiQuotes();
    },[])

    const createQuiz = () => {
        console.log("Quiz initialised");

        for(k=0;k<5;k++){
            if(Questions.length < 5 ){
                const allAuthor = ApiQuote.map(item => item.name);    
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
                otherOption.push(selectedQues.author);

                //shuffle final option list to be displayed
                const finalOption = otherOption.sort(() => 0.5 - Math.random());
                
                setQuestions(prevState=>{
                return[
                    ...prevState,
                    selectedQues
                ]
                });
                setOptions(prevState=>{
                return[
                    ...prevState,
                    finalOption
                ]
                });
            }
        } 
        console.log("quiz end")  
    }

    const checkAnswer= (e)=>{
        if(e.target.outerText == Questions[quesCount].author){
            setScore(currScore => currScore+1);
            console.log("Correct answer");
        }
        if(quesCount<4){
            setQuesCount(cuuQuesCount=>cuuQuesCount+1);
        }else{
            setResult(true);
        }
    }

    const reloadQuiz=()=>{
        setQuestions([]);
        setOptions([]);
        setScore(0);
        setQuesCount(0);
        setResult(false);
    }

    const displayQuiz = () =>{
        return(
            <>
                <div className="characterDetailContainer quizWrapper">
                    <div className="detailHolder">
                        <center>Question - {quesCount+1} </center>
                        <div className="characterFacts">
                            <h2 className="quizQuestion"><center>{Questions[quesCount].quote}</center></h2>
                            <hr/>
                            <table >
                                <tbody>
                                    {options[quesCount].map(item => (
                                        <tr key={item}>
                                            <td>
                                                <button className="quizAnswers" onClick={(e)=>{checkAnswer(e)}} value={item}>
                                                    <strong>{item}</strong>
                                                </button>
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

    const displayResult = () => {
        return(
            <>
                <div className="characterDetailContainer quizWrapper">
                    <div className="detailHolder">
                        <div className="characterFacts">
                            <h2 className="quizQuestion"><center>Results</center></h2>
                            <hr/>
                            <div className="resultPage">
                                Thanks for trying Game Of Thrones Quiz! {<br/>}
                                You score is - {score} / 5{<br/>}
                                {<br/>}
                                <div className="cta">
                                    <button onClick={reloadQuiz} className="reloadBtn">Play Again</button>
                                    <Link to="/">
                                        <button className="homeBtn">Nah I'm Done</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if(isLoading){
        
        return(<img src={Spinner} alt="spinner image" className="spinnerImg"/>);
    }else{
        if(match.url == "/quiz"){ 
            document.getElementsByClassName("App")[0].classList.remove("homeBackground");
            document.getElementsByClassName("App")[0].classList.remove("characterBackground");
            document.getElementsByClassName("App")[0].classList.add("quizBackground");
        }
        if(result){
            return(displayResult());
        }else{
            if(Questions.length <1){
                createQuiz();
            }else{
                return(displayQuiz());
            }
        }
        
    }
}

export default Quiz
