import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './Pages/LandingPage';
import CitationMachine from './Pages/CitationMachine';
import CitationList from './Pages/CitationList';
import EditCitation from './Pages/EditCitation';
import ArticleFinder from './Pages/ArticleFinder';
import AiDetector from './Pages/AiDetector';
import Airesults from './Pages/Airesults'
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route exact path='/' element={<LandingPage />}></Route>
      <Route exact path='/cite' element={<CitationMachine />}></Route>
      <Route exact path='/citelist' element={<CitationList />}></Route>
      <Route exact path='/manual' element={<EditCitation />}></Route>
      <Route exact path='/article' element={<ArticleFinder />}></Route>
      <Route exact path='/detect' element={<AiDetector />}></Route>
      <Route exact path='/results' element={<Airesults />}></Route>
      <Route path='*' element={<NotFound />}></Route>

     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
