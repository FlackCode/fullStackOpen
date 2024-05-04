const Persons = ({ filterValue, persons, filter }) => {
    return (
        <>
        {filterValue ? 
        filter.map((person, index) => (<p key={index}>{person.name} {person.number}</p>)) : 
        persons.map((person, index) => (<p key={index}> {person.name} {person.number}</p>))}
        </>
    )
}

export default Persons