const Persons = ({ filterValue, persons, filter, deleteContact}) => {
    return (
        <>
        {filterValue 
        ? filter.map((person) => 
            (<div key={person.id}>
                <p>{person.name} {person.number}</p> 
                <button onClick={() => deleteContact(person)}>Delete</button>
            </div>)) 
        : persons.map((person) => 
            (<div key={person.id}>
                <p>{person.name} {person.number}</p> 
                <button onClick={() => deleteContact(person)}>Delete</button>
            </div>))}
        </>
    )
}

export default Persons