import React,{useState} from 'react'
import {Link} from 'react-router-dom';

const Search = ({mainFilter}) => {

    const[search,SetSearch]=useState('');

    const filterResult = (query)=> {
        SetSearch(query);
        mainFilter(query);
    }

    return (
        <>
            <center>
                <input 
                    type="text" 
                    placeholder="Search Character by his first name" 
                    className="searchField"
                    value={search}
                    onChange={(e)=>filterResult(e.target.value)}
                />
                <Link to="/quiz">
                    <button className="quizButton">Play Quiz</button>
                </Link>
            </center>
        </>
    )
}

export default Search
