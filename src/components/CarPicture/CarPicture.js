import Magnifier from 'react-magnifier';
import './CarPicture.css'

const CarPicture = ({ carPicture, setCarPicture }) => {
    const imgURL = `data:image/jpg;base64,${carPicture}`
    return (
        <>
            {carPicture !== '' ? (
                <div className='car-picture-wrap'>
                    <div className='car-picture'>
                        <div className="top-bar">
                            <span class="close-button" onClick={() => setCarPicture('')}>&times;</span>
                        </div>
                        <div className='car-image'>
                            <Magnifier className="item-main-picture"
                                    src={imgURL}
                                    width={900}
                                    mgShape='square'
                                    zoomFactor={2}
                                    mgWidth={250}
                                    mgHeight={250}
                                />
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            </>
    );
}

export default CarPicture;