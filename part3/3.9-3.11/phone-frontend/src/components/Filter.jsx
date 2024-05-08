const Filter = ({ filterValue, handleFilterChange }) => {
    return (
        <>
        filter shown with <input className="border-black border-2 rounded-xl px-2" value={filterValue} onChange={handleFilterChange}/>
        </>
    )
}

export default Filter