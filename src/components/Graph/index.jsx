import BarChart from '../BarChart'
import LineChart from '../LineChart'

function Graph({ type, timeOption, isDarkMode }) {
    return (
        <div className='graph' style={{ 
            width: "100%",
            height: "50%",
            paddingTop: 50
         }}>
            {type === 1 && <BarChart timeOption={timeOption} isDarkMode={isDarkMode}/>}
            {type === 2 && <LineChart timeOption={timeOption} isDarkMode={isDarkMode}/>}
        </div>
    )
}

export default Graph;