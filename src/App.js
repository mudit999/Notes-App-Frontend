import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import MyNotes from './screens/MyNotes/MyNotes'
import CreateNote from './screens/CreateNote/CreateNote';
import EditNote from './screens/EditNote/EditNote';
import {Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
      <>
        <Header />
          <main>
              <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<LoginScreen/>} />
                <Route path="/register" element={<RegisterScreen/>} />
                <Route path="/mynotes" element={<MyNotes/>} />
                <Route path="/mynotes/createNote" element={<CreateNote/>} />
                <Route path="/mynotes/editNote/:noteid" element={<EditNote/>} />
              </Routes>
          </main>
        <ToastContainer />
        <Footer />
      </>
  );
}

export default App;