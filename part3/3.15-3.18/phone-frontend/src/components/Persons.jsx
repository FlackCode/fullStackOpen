const Persons = ({ filterValue, persons, filter, deleteContact}) => {
    return (
        <>
        {filterValue 
        ? filter.map((person) => 
            (<div key={person.id}>
                <p>{person.name} <br /> {person.number}</p> 
                <button className="border-gray-300 border-2 rounded-xl py-2 px-4 font-bold" onClick={() => deleteContact(person)}>Delete</button>
            </div>)) 
        : persons.map((person) => 
            (<div key={person.id}>
                <p>{person.name} <br /> {person.number}</p> 
                <button className="border-gray-300 border-2 rounded-xl py-2 px-4 font-bold" onClick={() => deleteContact(person)}>Delete</button>
            </div>))}
        </>
    )
}

export default Persons