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
      <div className='container'>
        {loaded && 
          <div className='col-sm-12 mt-5'>
            {searchResults.map((item, i) => { return <div key={i} className="col-sm-6" style={{display: 'inline-block'}}>
              <ul style={{border: '1px solid black', padding:'10px', listStyle:'none'}}>
                <li> Character: {item.name} </li>
                <li> Image: <img src={item.imageUrl} /> </li>
              </ul>
            </div>})}
          </div>
        }
      </div>
    </div>
  );
}

export default App;