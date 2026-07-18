import {BrowserRouter,Route,Routes} from "react-router-dom";
import InvoiceForm from "./components/Bill";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import InvoiceScript from "./components/InvoiceandDownload";
import { InvoiceProvider } from "./components/InvoiceContext";

const App = ()=>{

  return(
    <>
   
     <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path ="/" element= {<Home/>}/>
        <Route path ="/bill" element= {<InvoiceForm/>}/>
        <Route path ="/invoice&download" element= {<Bill />}/>
    </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App