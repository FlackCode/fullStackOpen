const Filter = ({ filterValue, handleFilterChange }) => {
    return (
        <>
        filter shown with <input value={filterValue} onChange={handleFilterChange}/>
        </>
    )
}

export default Filter