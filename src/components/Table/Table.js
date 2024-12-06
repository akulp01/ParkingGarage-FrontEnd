import './Table.css'

const CarTable = ({ permitInfo, carInfo, setSelectedItem, table, handleToggleParked }) => {
    
    return (
        <div className="tables">
            {table === 'Permits' ? (
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Permit Type</th>
                            <th>Valid Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permitInfo.map((item, index) => {
                            return (
                                <tr key={index} className='permit id' onClick={() => setSelectedItem(item.permit_id)}>
                                    <td>{item.permit_id}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.permit_type}</td>
                                    <td>{item.valid_until.slice(0,10)}</td>
                                </tr>
                                
                            )
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Color</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>License Plate</th>
                                    <th>Parked</th>
                                    <th>Permit ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carInfo.map((item, index) => {
                                return (
                                    <tr key={index} className='permit id' onClick={() => setSelectedItem(item.permit_id)}>
                                        <td>{item.car_id}</td>
                                        <td>{item.car_color}</td>
                                        <td>{item.car_make}</td>
                                        <td>{item.car_model}</td>
                                        <td>{item.car_year}</td>
                                        <td>{item.license_plate}</td>
                                        <td>
                                            <button
                                                className={`button${item.parked ? '-parked' : '-not-parked'}`}
                                                title="Click to toggle parked status"
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleParked(item.license_plate, item.parked)
                                            }}>{item.parked ? 'Yes' : 'No'}</button>
                                        </td>
                                        <td>{item.permit_id}</td>
                                    </tr>
                                )
                                })}
                            </tbody>
                        </table>
                    </div>  
                )
            }
        </div>
    )
};

export default CarTable;
