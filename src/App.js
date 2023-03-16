import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ posts, setPosts ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)


  useEffect(() => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_API_URL}posts`)
      .then(( res )  => {
        setPosts(res.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if(error !== null) {
    return <p>Ups! Ocurrió un error. Error: {error.message}. Vuelve a intentarlo</p>
  }

  return(
    <React.Fragment>  
      <h3>Mira los POSTS</h3>
      {loading ? (
        <p>Loading...</p>
      ) : 
      posts.map((item) => {
        return(
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        )}
      )}
    </React.Fragment>
  )
}

export default App;
