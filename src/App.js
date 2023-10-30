import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Application from './components/application.js'

function App() {
  const [id, setId] = useState(null);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND + 'initiate/';
    fetch(url, {
      method: "POST"
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setId(data.id)
    })
    .catch((err) => {
        console.log(err.message);
    });
  }, []);

  return (
    <Application></Application>
  );
}

export default App;
