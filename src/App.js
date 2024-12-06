import React, { useEffect } from "react";
import { useState } from "react";
import TableOption from "./components/TableOption/TableOption";
import Table from "./components/Table/Table";
import SearchBar from "./components/SearchBar/SearchBar";
import SelectedPermit from "./components/SelectedPermit/SelectedPermit";
import Logs from "./components/Logs/Logs";
import CarPicture from "./components/CarPicture/CarPicture";
import socket from './socket'
import CarCount from "./components/CarCount/CarCount";

function App() {

    const [table, setTable] = useState('Permits')
    const [option, setOption] = useState('id')
    const [permits, setPermits] = useState([])
    const [cars, setCars] = useState([])
    const [permitInfo, setPermitInfo] = useState([])
    const [carInfo, setCarInfo] = useState([])
    const [selectedItem, setSelectedItem] = useState('')
    const [carPicture, setCarPicture] = useState('')
    const [entering, setEntering] = useState([])
    const [exiting, setExiting] = useState([])

    useEffect(() => {
        socket.on('message', (data) => {
            const temp = JSON.parse(data)
            temp.time = new Date().toLocaleString().slice(10, 21)
            console.log(temp.time)
            if (temp.parked === 1) {
                setEntering([temp, ...entering])
            } else {
                setExiting([temp, ...exiting])
            }
        });
        fetch('http://localhost:8081/getpermits', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                const temp = data.map((item) => {
                    item.valid_until = item.valid_until.slice(0, 10)
                    item.permit_type = item.permit_type.replace('_', ' ')
                    return item
                })
                setPermits(temp)
                setPermitInfo(temp)
            })
        fetch('http://localhost:8081/getcars', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                setCars(data)
                setCarInfo(data)
            })
    }, [entering, exiting])

    const handleSearch = (event) => {
        const temp = event.target.value
        if(table === 'Permits') {
            switch (option) {
                case 'id':
                    setPermitInfo(permits.filter((item) => item.permit_id.toString().includes(temp)))
                    break;
                case 'first_name':
                    setPermitInfo(permits.filter((item) => item.first_name.toLowerCase().includes(temp.toLowerCase())))
                    break;
                case 'last_name':
                    setPermitInfo(permits.filter((item) => item.last_name.toLowerCase().includes(temp.toLowerCase())))
                    break;
                case 'permit_type':
                    setPermitInfo(permits.filter((item) => item.permit_type.toLowerCase().includes(temp.toLowerCase())))
                    break;
                case 'valid_until':
                    setPermitInfo(permits.filter((item) => item.valid_until.toLowerCase().includes(temp.toLowerCase())))
                    break;
                default:
                    break;
            }
            if(temp === '') setPermitInfo(permits)
        } else {
            switch (option) {
                case 'id':
                    setCarInfo(cars.filter((item) => item.car_id.toString().includes(temp)))
                    break;
                case 'color':
                    setCarInfo(cars.filter((item) => item.car_color.toLowerCase().includes(temp.toLowerCase())))
                    break;
                case 'make':
                    setCarInfo(cars.filter((item) => item.car_make.toLowerCase().includes(temp.toLowerCase())))
                    break;
                case 'model':
                    setCarInfo(cars.filter((item) => item.car_model.toLowerCase().includes(temp.toLowerCase())))
                    break;
                case 'year':
                    setCarInfo(cars.filter((item) => item.car_year.toString().includes(temp)))
                    break;
                case 'license_plate':
                    setCarInfo(cars.filter((item) => item.license_plate.toLowerCase().includes(temp.toLowerCase())))
                    break;
                case 'parked':
                    setCarInfo(cars.filter((item) => {
                        if(temp.toLowerCase() === 'y' || temp.toLowerCase() === 'ye' || temp.toLowerCase() === 'yes') return item.parked === 1
                        else if(temp.toLowerCase() === 'n' || temp.toLowerCase() === 'no') return item.parked === 0
                        else return false
                    }))
                    break;
                case 'permit_id':
                    setCarInfo(cars.filter((item) => item.permit_id.toString().includes(temp)))
                    break;
                default:
                    break;
            }
            if(temp === '') setCarInfo(cars)
        }
    }
    
    const handleOptionChange = (event) => {
        setOption(event.target.value);
    }

    const handleToggleParked = async (plate, value) => {
        const parked = value === 1 ? 0 : 1;
        await fetch('http://localhost:8081/toggleparked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ license_plate: plate, parked: parked})
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                setCarInfo(carInfo.map((item) => {
                    if(item.license_plate === plate) {
                        item.parked = parked
                    }
                    return item
                }))
            }
        })
    }

    return (
        <div className="App">
            <CarCount
                carCountTotal={carInfo.length}
                carCountGarage={cars.filter(item => (item.parked === 1)).length}/>
            <TableOption
                setTable={setTable}
                setOption={setOption}
                table={table} />
            <SearchBar
                handleOptionChange={handleOptionChange}
                handleSearch={handleSearch}
                table={table} />
            <Table
                permitInfo={permitInfo}
                carInfo={carInfo}
                setSelectedItem={setSelectedItem}
                table={table}
                handleToggleParked={handleToggleParked}/>
            <SelectedPermit
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                permitInfo={permitInfo}
                carInfo={carInfo}
                handleToggleParked={handleToggleParked}/>
            <Logs
                setSelectedItem={setSelectedItem}
                setCarPicture={setCarPicture}
                entering={entering}
                exiting={exiting} />
            <CarPicture
                carPicture={carPicture}
                setCarPicture={setCarPicture} />
        </div>
    );
}

export default App;
