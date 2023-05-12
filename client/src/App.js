import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"

function App() {  
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
    </Routes>
  </BrowserRouter>
)
}

export default App;
