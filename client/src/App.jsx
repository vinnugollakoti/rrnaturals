import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Components/Home"
import Owner from "./Components/Owner"
import Checkout from "./Components/Checkout"
import "./App.css"
import "./index.css"
import "./style.css"
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/owner" element={<Owner />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
