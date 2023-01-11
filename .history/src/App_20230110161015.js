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
        setProject(res.data);
        res.data.map((item, i) => {
            if(!item.isStarted){
                results.push(character)
            }
        })
        setSearchResults();
    })
}, []);


  return (
    <div className="App">
      
    </div>
  );
}

export default App;