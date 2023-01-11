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

        <div className='row mt-5 mb-5'>
          <div className='col-sm-10 offset-sm-1'>
            <div className='input-group'>
              <input className='form-control searchBox col-sm-10' type={Text} placeholder="Search By Character Name..." aria-describedby="button-addon"/>
              <button className='btn btn-primary col-sm-2' id="button-addon"> SEARCH </button>
            </div>
          </div>
        </div>

        <div className='row'>
          {loaded && 
            <div className='resultsContainer col-sm-12' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              {searchResults.map((item, i) => { return <div key={i} className="col-lg-3 col-md-5 col-sm-12" style={{height: '500px', border: '1px solid gray', margin: '15px', borderRadius: '5px', boxShadow: '3px 3px 5px gray'}}>
                <ul style={{listStyle:'none'}}>
                  <li className='text-center'> <img src={item.imageUrl} /> </li>
                  <li> Character: {item.name} </li>
                </ul>
              </div>})}
            </div>
          }
        </div>

      </div>
    </div>
  );
}

export default App;