const Name = ({country, handleFilter}) => {
    return (
      <p>{country.name.common}
      <button value={country.name.common} onClick={handleFilter}>
      show
    </button>
      </p>
      
    )
  }

export default Name