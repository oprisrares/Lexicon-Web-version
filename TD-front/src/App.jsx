import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import BookDetails from './pages/BookDetails';
import PdfViewer from './pages/PdfViewer';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/book/:id/pdf" element={<PdfViewer />} />
      </Routes>
    </>
  );
}

export default App;
