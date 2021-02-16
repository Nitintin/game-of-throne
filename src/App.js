import React,{useEffect, useState} from 'react';
import axios from "axios";
import './App.css';
import Header from './components/Header';
import Home from "./components/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Character from './components/Character';
import Quiz from './components/Quiz';
import Search from './components/Search';

function App() {

  const [characters,setCharacters] = useState({});
  const [filteredCharacters,setFilteredCharacters] = useState({});
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://raw.githubusercontent.com/jeffreylancaster/game-of-thrones/master/data/characters.json`
      )
      setCharacters(result.data.characters);
      setFilteredCharacters(result.data.characters);
      setIsLoading(false);
    }

    fetchItems()
  }, [])

  const mainFilter = (query) => {
    const cleanQuery = query.charAt(0).toUpperCase() + query.slice(1);
    //initilase filteredcharacter to default
    setFilteredCharacters(characters);
    //filter based on search input
    setFilteredCharacters(characters.filter( item => item.characterName.includes(cleanQuery) )); 
  }

  return (
    <div className="App">
      <Router>
        <Header/>
        <Search mainFilter={mainFilter}/>
        <Switch>
          <Route 
            exact path="/"
            render={()=> <Home characters={filteredCharacters} isLoading={isLoading} />}
          />
          <Route path="/character/:characterLink" component={Character}/>
          <Route path="/quiz" component={Quiz}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
