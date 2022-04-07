import { Route, Routes, BrowserRouter } from 'react-router-dom';
import EditProject from './components/EditProject';
import Main from './components/Main';
import NewProject from './components/NewProject';
import ViewProject from './components/ViewProject';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/view-project" element={<ViewProject />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/edit-project" element={<EditProject />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
