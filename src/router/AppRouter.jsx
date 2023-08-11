import { Route, Routes } from "react-router-dom"
import { Navbar } from "../ui/Navbar"
import App from "../App"
import DataList from "../DataList"

export const AppRouter = () => {
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path='' element={<App/>}/>
            <Route path='data' element={<DataList/>}/>
        </Routes>
    </>
  )
}
