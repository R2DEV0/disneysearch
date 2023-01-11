import {React, useEffect} from 'react'
import './styles/App.css';
import './views/Main';
import axios from 'axios';

function App() {

  useEffect(() => {
    let searchResault =[];
    axios.get('http://localhost:8000/api/projects')
    .then(res => {
        setProject(res.data);
        res.data.map((item, i) => {
            if(!item.isStarted){
                notStarted.push(item)
            }
            else if(item.isStarted && !item.isComplete){
                notCompleted.push(item)
            }
            else if(item.isComplete && item.isStarted){
                completed.push(item)
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