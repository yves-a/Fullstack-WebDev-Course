import Weather from './Weather'
const DetailedInfo = ({country}) => {
    console.log(Object.values(country.languages))
      const altText = country.name.common+" flag"
    return (
        <div>
          <h2>
          {country.name.common}
          </h2>
          <p>
            capital {country.capital}
            <br/>
            area {country.area}
          </p>
          <h3>languages:</h3>
          <div>
          {Object.values(country.languages).map(language => 
            <Language key={country.name.common+language} language={language}/>
          )}
          </div>
          <img src={country.flags.png} alt={altText} width="250" height="250"></img>
          <Weather capital={country.capital}/>
        </div>
      )
  }
  
  const Language = ({language}) => {
    return (
      <li>{language}</li>
    )
  }

export default DetailedInfo