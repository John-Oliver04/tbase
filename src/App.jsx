import MaterialTable from './components/MaterialTable';
import './App.css';

function App() {
  return (
    <div className="App">
       <Header/>
       <Welcome/>
       <MaterialTable/>
    </div>
  );
}



function Header(){
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="navbar-logo h5 text-white mx-5">TBase</div>
      <ul className="nav">
        <li className="nav-item"><a href="" className="nav-link">Home</a></li>
        <li className="nav-item"><a href="" className="nav-link">Database</a></li>
        <li className="nav-item"><a href="" className="nav-link">Upload</a></li>
        <li className="nav-item"><a href="" className="nav-link">About</a></li>
        
      </ul>
    </nav>
  );
}

const Welcome = ()=>{
  return (
    <div className="mt-5">
       <h1>Welcome to TBase System</h1>
    </div>
   
  )
  
}

export default App;
