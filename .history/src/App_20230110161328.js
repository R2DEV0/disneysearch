import {React, useEffect} from 'react'
import './styles/App.css';
import './views/Main';
import axios from 'axios';

function App() {
  const[searchResults, setSearchResults] = useState({});

  useEffect(() => {
    let results = [];
    axios.get('http://localhost:8000/api/projects')
    .then(res => {
        res.data.map((character, i) => {
          results.push(character)
        });
        setSearchResults();
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