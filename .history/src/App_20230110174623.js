import {React, useEffect, useState} from 'react'
import './styles/App.css';
import axios from 'axios';
import { Circles } from  'react-loader-spinner'

function App() {
  const [loaded, setLoaded] = useState(false);
  const [searchResults, setSearchResults] = useState({});
  const [filterText, setFilterText] = useState("");
  const [filterTextCleared, setFilterTextCleared] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
}, [filterTextCleared]); // Get All Characters on FilterTextClear
//#endregion

  //#region set the Filter Text on input Change
  const FilterTextHandler = (e) => {
    setErrorMessage("");
    setFilterText(e.target.value);
  };
  //#endregion

  //#region Search by Character Name
  const SearchByName = () => {
    setLoaded(false);
    let results = [];
    if(filterText == ""){
      setErrorMessage("No filter text was entered.");
      setLoaded(true);
    } else{
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
  }
  //#endregion

  //#region ClearSearch
  const ClearSearch = () => {
    setErrorMessage("");
    setFilterText("");
    setFilterTextCleared(true);
  }
  //#endregion

  return (
    <div className="App">
      <div className='container'>

        <div className='row text-center mt-5'>
          <h1>Disney Character Search API</h1>
        </div>

        <div className='row mt-5 mb-5'>
          <div className='col-sm-10 offset-sm-1'>
            <div className='input-group'>
              <input className='form-control searchBox' onChange={FilterTextHandler} type={Text} value={filterText} placeholder="Search By Character Name..."/>
              <button className='btn btn-primary col-sm-2' onClick={SearchByName}> SEARCH </button>
              <button className='btn btn-warning col-sm-2' onClick={ClearSearch}> CLEAR </button>
            </div>
            <p className='text-danger'> {errorMessage} </p>
          </div>
        </div>

        <div className='row'>
          {loaded ?
            <div className='resultsContainer col-sm-12' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              {searchResults
                .sort(function(a, b){
                  if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  return 0;
                })
                .map((item, i) => { return <div key={i} className="col-lg-3 col-md-5 col-12 card" style={{minheight: '500px', border: '1px solid gray', margin: '8px', padding: '5px', borderRadius: '5px', boxShadow: '3px 3px 5px gray'}}>
                  <ul style={{listStyle:'none'}}>
                    <li style={{fontWeight: '800'}}><h2>{item.name}</h2></li>
                    <li> <img src={item.imageUrl} height={150} /> </li>
                    <li><span style={{fontWeight: 700}}>Films:</span> {item.films.map((films, j) => {return <span key={j}>{films}.</span>})} </li>
                    <li><span style={{fontWeight: 700}}>TV Shows:</span> {item.tvShows.map((shows, k) => {return <span key={k}>{shows}.</span>})} </li>
                    <li><span style={{fontWeight: 700}}>Video Games:</span> {item.videoGames.map((games, l) => {return <span key={l}>{games}.</span>})} </li>
                    <li><span style={{fontWeight: 700}}>Allies:</span> {item.allies.map((allies, m) => {return <span key={m}>{allies}.</span>})} </li>
                    <li><span style={{fontWeight: 700}}>Enemies:</span> {item.enemies.map((enemies, n) => {return <span key={n}>{enemies}.</span>})} </li>
                  </ul>
              </div>})}
            </div>
            :
            <div className='loadingContainer col-sm-4 offset-sm-5'>
              <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          }
        </div>

      </div>
    </div>
  );
}

export default App;