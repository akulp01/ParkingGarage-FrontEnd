import './SearchBar.css'

const SearchBar = ({ handleOptionChange, handleSearch, table }) => {
    return (
        <div className="search-bar">
            {table === 'Permits' ? (
                <>
                    <div className='dropdown'>
                        <select onChange={handleOptionChange}>
                            <option value="id">ID</option>
                            <option value="first_name">First Name</option>
                            <option value="last_name">Last Name</option>
                            <option value="permit_type">Permit Type</option>
                            <option value="valid_until">Valid Until</option>
                        </select>
                    </div>
                    <div className='bar'>
                        <input id="search" type="text" onChange={handleSearch} />
                    </div>
                </>
            ) : (
                <>
                    <div className='dropdown'>
                        <select onChange={handleOptionChange}>
                            <option value="id">ID</option>
                            <option value="color">Color</option>
                            <option value="make">Make</option>
                            <option value="model">Model</option>
                            <option value="year">Year</option>
                            <option value="license_plate">License Plate</option>
                            <option value="parked">Parked</option>
                            <option value="permit_id">Permit ID</option>
                        </select>
                    </div>
                    <div className='bar'>
                        <input id="search" type="text" onChange={handleSearch} />
                    </div>
                </>
            )
            }
        </div>
    )
}

export default SearchBar;