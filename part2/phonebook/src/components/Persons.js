const Persons = ({namesToShow, handleDelete}) => {
    return (
      <div>
          {namesToShow.map(person => 
            <Name key={person.name} person={person} handleDelete={handleDelete}/>
          )}
      </div>
    )
  }

const Name = ({person, handleDelete}) => {
    return (
      <p>{person.name} {person.number}
      <button id={person.id} value={person.name} onClick={handleDelete}>
      delete
    </button>
      </p>
    )
  }
export default Persons