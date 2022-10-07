import React from 'react';
import {Collection} from './Collection'
import './index.scss';
import {logDOM} from "@testing-library/react";

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [categoryId, setCategoryId] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchValue, setSearchValue] = React.useState('')
  const [collections, setCollections] = React.useState([])

  const category = categoryId ? `category=${categoryId}` : ''

  React.useEffect(() => {
    setIsLoading(true)
    fetch(`https://633c0e74f11701a65f6dcf3f.mockapi.io/fotocollection?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCollections(data)
      })
      .catch(err => console.warn('Ошибка при получении данных: ', err))
      .finally(() => setIsLoading(false))
  }, [categoryId, page])


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) =>
              <li
                onClick={() => setCategoryId(i)}
                className={ categoryId === i ? 'active' : ''}
                key={obj.name}>{obj.name}
              </li>)
          }
        </ul>
        <input
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos}/>
            ))
        )}
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, i) => (
            <li onClick={() => setPage(i + 1)} className={page === (i + 1) ? 'active' : ''}>{i + 1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
