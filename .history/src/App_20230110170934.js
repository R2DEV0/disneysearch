import {React, useEffect, useState} from 'react'
import './styles/App.css';
import './views/Main';
import axios from 'axios';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [searchResults, setSearchResults] = useState({});
  const [filterText, setFilterText] = useState("");

  //#region useEffect - Search All Initial API Call
  useEffect(() => {
    setLoaded(false);
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
//#endregion

  //#region set the Filter Text on input Change
  const FilterTextHandler = (e) => {
    setFilterText(e.target.value);
  };
  //#endregion

  //#region Search by Character Name
  const SearchByName = () => {
    setLoaded(false);
    let results = [];
    axios.get(`https://api.disneyapi.dev/character?name=${filterText}`)
    .then(res => {
        console.log(res.data.data);
        res.data.data.map((item, i) => {
          console.log(item);
          results.push(item);
        });
        setSearchResults(results);
        setLoaded(true);
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
  }
  //#endregion

  //#region ClearSearch
  const ClearSearch = () => {

  }
  //#endregion

  return (
    <div className="App">
      <div className='container'>

        <div className='row mt-5 mb-5'>
          <div className='col-sm-10 offset-sm-1'>
            <div className='input-group'>
              <input className='form-control searchBox col-sm-8' onChange={FilterTextHandler} type={Text} placeholder="Search By Character Name..." aria-describedby="button-addon"/>
              <button className='btn btn-primary col-sm-2' id="button-addon" onClick={SearchByName}> SEARCH </button>
              <button className='btn btn-secondary col-sm-2' id="button-addon2" onClick={SearchByName}> SEARCH </button>
            </div>
          </div>
        </div>

        <div className='row'>
          {loaded && 
            <div className='resultsContainer col-sm-12' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              {searchResults.map((item, i) => { return <div key={i} className="col-lg-3 col-md-5 col-12" style={{height: '500px', border: '1px solid gray', margin: '8px', borderRadius: '5px', boxShadow: '3px 3px 5px gray'}}>
                <ul style={{listStyle:'none', textAlign: 'center'}}>
                  <li style={{fontWeight: '800'}}><h2>{item.name}</h2></li>
                  <li> <img src={item.imageUrl} width={100} /> </li>
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