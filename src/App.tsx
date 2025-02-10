import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import FileManagerContainer from './container/FileManager';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileManagerContainer />} />
      </Routes>
    </Router>
  );
}
