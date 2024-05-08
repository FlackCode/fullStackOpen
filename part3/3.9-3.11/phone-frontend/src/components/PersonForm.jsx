const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
    return (
        <>
        <form>
          name: <input className="border-gray-300 border-2 rounded-xl px-2 mb-2" value={newName} onChange={handleNameChange} required/><br />
          number: <input className="border-gray-300 border-2 rounded-xl px-2" value={newNumber} onChange={handleNumberChange} required/><br />
          <button className="border-gray-300 border-2 rounded-xl py-2 px-4 font-bold" type="submit" onClick={addPerson}>add</button>
        </form>
        </>
    )
}

export default PersonForm