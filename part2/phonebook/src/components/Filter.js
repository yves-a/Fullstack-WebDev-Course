const Filter =({filterValue, handleFilter}) => {
    return (
      <div>
          filter show with 
          <input
          value ={filterValue}
          onChange={handleFilter}
          />
      </div>
    )
  }

  export default Filter