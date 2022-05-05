import Name from './Name'
import DetailedInfo from './DetailedInfo'

const Filter = ({countriesToShow, handleFilter}) => {
    if (countriesToShow.length>10){
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    } else if (countriesToShow.length===1){
      return (
        <div>
          {countriesToShow.map(country => 
           <DetailedInfo key={country.tld} country={country}/>
        )}
        </div>
        
      )
    }else {
      return (
        <div>
          {countriesToShow.map(country => 
              <Name key={country.name.common} country={country} countries={countriesToShow} handleFilter={handleFilter}/>
            )}
        </div>
      )
    }
  }

  export default Filter