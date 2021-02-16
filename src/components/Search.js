import React,{useState} from 'react'

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
                placeholder="Search Character" 
                className="searchField"
                value={search}
                onChange={(e)=>filterResult(e.target.value)}
            />
            </center>
        </>
    )
}

export default Search
