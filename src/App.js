import { useState } from "react";
import './App.css';
import axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [userData, setUserData] = useState(false);
  const [repoData, setRepoData] = useState(false);

  const getData = async (name) => {
    await axios.get(`https://api.github.com/users/${name}`)
    .then(function(res) {
      setUserData(res.data)
      axios.get(`${res.data.repos_url}`)
      .then(function(response) {
        setRepoData(response.data)
        console.log(response.data)
      })
    })
    .catch(function(e) {
      console.log(e)
      alert("User not found!!")
    });
       
  }

  return (
    <div className="App">
      <header className="App-header">
        {!userData && (
          <>
            <div className="sameRow">
              <h1>Your Github Username is </h1>
              <input type="text" name="username" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <button onClick={() => getData(name)} className="submit">Submit</button>
          </>
        )

        }
        
        {userData && (
          <>
            <img src={userData.avatar_url} className="avatar" alt="avatar" />
            <h2>Name : {userData.name}</h2>
            <h2>Profile Url : <a href={userData.html_url} className="proflieLink">View Profile</a></h2>
            {repoData && (
              <>
                <h3>Repositories</h3>
                <ul className="list">
                  {repoData.map((item, i) => <li key={i}><a href={item.html_url} >{item.name}</a></li>)}
                </ul>
              </>
            )}
            <p onClick={() => setUserData(false)} className="view">View another Profile</p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
