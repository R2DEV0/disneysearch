import {React, useEffect, useState} from 'react'
import './styles/App.css';
import './views/Main';
import axios from 'axios';

function App() {
  const [loaded, setLoaded] = useState(false);
  const[searchResults, setSearchResults] = useState({});

  useEffect(() => {
    let results = [];
    axios.get('https://api.disneyapi.dev/characters')
    .then(res => {
        console.log(res.data.data);
        
        res.data.data.map((item, i) => {
          console.log(item);
          results.push(item);
        });
        setSearchResults(results);
        setLoaded(true)
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
},[]);


  return (
    <div className="App">
      {loaded && <div style={{display: 'inline-block'}}>
        {searchResults.map((item, i) => { return <ul key={i} style={{border: '1px solid black', padding:'10px', listStyle:'none'}}>
            <li>Project: {item.name}</li>
            <li>Due by: {item.due_date}</li>
            <li><button className='btn btn-outline-secondary btn-sm' onClick={(e) => {startProj(item._id, item.isStarted, i, item.name, item.due_date, item.isComplete)}}>Start Project</button></li>
        </ul>})}
      </div>}
    </div>
  );
}

export default App;