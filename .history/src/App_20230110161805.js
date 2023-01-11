import {React, useEffect, useState} from 'react'
import './styles/App.css';
import './views/Main';
import axios from 'axios';

function App() {
  const[searchResults, setSearchResults] = useState({});

  useEffect(() => {
    let results = [];
    axios.get('https://api.disneyapi.dev/characters')
    .then(res => {
        console.log(res.data.data);
        
        res.data.data.map((character, i) => {
          console.log(character)
          results.push(character)
        });
        
        setSearchResults(results);

    }).catch(function(error){
      if(error.response){
        console.log(error.response.data)
      } else if(error.request){
        console.log(error.request);
      } else{
        console.log('Error', error.message);
      };
      console.log(error.config);
    })
}, []);


  return (
    <div className="App">
      
    </div>
  );
}

export default App;