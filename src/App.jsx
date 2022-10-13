import './App.css';
import Home from './routes/Home';
import Login from './routes/Login';
import { useSelector } from 'react-redux';

function App() {
  const currentTeacher = useSelector(store => store?.teacher?.currentTeacher)
  return (
    <div>
      <div>
        {currentTeacher ? <Home /> : <Login />}
      </div>
    </div>
  );
}

export default App;
