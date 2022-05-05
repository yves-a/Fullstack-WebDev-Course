import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filterValue, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(false)
  
  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = showAll 
    ? countries
    : countries.filter(country=>country.name.common.toLowerCase().includes(filterValue.toLowerCase()))
   
  return (
    <div>
       <div>
        filter show with 
        <input
        value ={filterValue}
        onChange={handleFilter}
        />
      </div>
      <Filter countriesToShow={countriesToShow} handleFilter={handleFilter}/>
    </div>
   
  )
}

export default App
