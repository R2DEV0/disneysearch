import {React, useEffect} from 'react'
import './styles/App.css';
import './views/Main';
import axios from 'axios';

function App() {
  const[searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/projects')
    .then(res => {
        setProject(res.data);
        res.data.map((item, i) => {
            if(!item.isStarted){
                notStarted.push(item)
            }
        })
        setProjectBacklog(notStarted);
        setProjectStarted(notCompleted);
        setProjectCompleted(completed);
        update();
        setLoaded(true)
    })
}, []);


  return (
    <div className="App">
      
    </div>
  );
}

export default App;