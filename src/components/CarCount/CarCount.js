import './CarCount.css'

const CarCount = ({ carCountTotal, carCountGarage  }) => {
    return (
        <div className="car-count">
            <span className="car-count-number"># of cars in the system: {carCountTotal}</span>
            <span className="car-count-number"># of cars in the garage: {carCountGarage}</span>
        </div>
    )
}

export default CarCount;
    