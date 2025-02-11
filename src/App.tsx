import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FileManagerContainer from './container/FileManager';
import HubContainer from './container';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HubContainer />} />
        <Route path="/file_manager" element={<FileManagerContainer />} />
      </Routes>
    </Router>
  );
}
