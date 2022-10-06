import React from 'react';
import {Collection} from './Collection'
import './index.scss';
import {logDOM} from "@testing-library/react";

function App() {
  const [searchValue, setSearchValue] = React.useState('')
  const [collections, setCollections] = React.useState([])

  React.useEffect(() => {
    fetch('https://633c0e74f11701a65f6dcf3f.mockapi.io/fotocollection')
      .then((res) => res.json())
      .then((data) => {
        setCollections(data)
      })
      .catch(err => console.warn('Ошибка при получении данных: ', err))
  }, [])


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          <li className="active">Все</li>
          <li>Горы</li>
          <li>Море</li>
          <li>Архитектура</li>
          <li>Города</li>
        </ul>
        <input
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj, index) => (
          <Collection key={index} name={obj.name} images={obj.photos}/>
        ))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
