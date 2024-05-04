const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
    return (
        <>
        <form>
          name: <input value={newName} onChange={handleNameChange} required/><br />
          number: <input value={newNumber} onChange={handleNumberChange} required/><br />
          <button type="submit" onClick={addPerson}>add</button>
        </form>
        </>
    )
}

export default PersonForm