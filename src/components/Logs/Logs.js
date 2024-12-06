import './Logs.css'

const Logs = ( { setSelectedItem, setCarPicture, entering, exiting } ) => {

    return (
        <div className='logs'>
            <div className='logs-wrap'>
                <div className='entering'>
                    <table>
                        <caption>
                            Entering
                        </caption>
                        <thead>
                            <tr>
                            <th>Color</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>License Plate</th>
                            <th>Time Entered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entering.map((item) => {
                                return (
                                    <tr key={item.time} onClick={item.car_model === 'UNREG' ? () => setCarPicture(item.image_data) : () => setSelectedItem(item.permit_id)}
                                        className={item.car_model === 'UNREG' ? 'unregistered' : ''}>
                                        <td>{item.car_color}</td>
                                        <td>{item.car_make}</td>
                                        <td>{item.car_model}</td>
                                        <td>{item.license_plate}</td>
                                        <td>{item.time}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='exiting'>
                    <table>
                        <caption>
                            Exiting
                        </caption>
                        <thead>
                            <tr>
                            <th>Color</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>License Plate</th>
                            <th>Time Exited</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exiting.map((item) => {
                                return (
                                    <tr key={item.time}
                                        onClick={item.car_model === 'UNREG' ? () => setCarPicture(item.image_data) : () => setSelectedItem(item.permit_id)}
                                        className={item.car_model === 'UNREG' ? 'unregistered' : ''}>
                                        <td>{item.car_color}</td>
                                        <td>{item.car_make}</td>
                                        <td>{item.car_model}</td>
                                        <td>{item.license_plate}</td>
                                        <td>{item.time}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
                    
    )
}

export default Logs;