import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Rawmaterielsupplier from "../../components/datatable/Rawmaterielsupplier"

const FactoryList = () => { 
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Rawmaterielsupplier/>
      </div>
    </div>
  )
}

export default FactoryList