import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
// ...import other components...

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Add other routes here */}
        </Routes>
    )
}

export default App