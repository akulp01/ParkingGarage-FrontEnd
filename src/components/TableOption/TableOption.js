import './TableOption.css'

const TableOption = ({ setTable, setOption, table }) => {
    return (
        <div className='table-options'>
            <div
                className={`${table === 'Permits' ? 'selected' : 'unselected'}`}
                onClick={() => {
                    setOption('id')
                    setTable('Permits')
                }
                }
                >
                    Permits</div>
                <div
                    className={`${table === 'Cars' ? 'selected' : 'unselected'}`}
                    onClick={() => {
                        setOption('id')
                        setTable('Cars')
                    }
                    }
                >
                    Cars</div>
        </div>
    );
}

export default TableOption;