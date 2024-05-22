
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import HomePage from './components/HomePage';
import Data from './components/Data';
import AddData from './components/AddData';
import EditData from './components/EditData';


function App() {
  return (
    <div className="App">
   
     
     <Router>

     <Routes>

        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/datapage' element={<Data />} />
       <Route path='/AddData' element={<AddData />} />
       <Route path='/editform/:id' element={<EditData />} />
      </Routes>

     </Router>
    </div>
  );
}

export default App;
