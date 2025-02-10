import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import FileManagerContainer from './container/FileManager';
import HubContainer from './container/Hub';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HubContainer />} />
      </Routes>
    </Router>
  );
}
