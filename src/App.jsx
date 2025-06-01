import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import CreateForm from './pages/createForm'
// ...import other components...

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/forms/add" element={<CreateForm />} />
            {/* Add other routes here */}
        </Routes>
    )
}

export default App