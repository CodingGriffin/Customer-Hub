import { Routes, Route, Navigate } from 'react-router-dom';
import FileManagerContainer from './container/FileManager';
import HubContainer from './container';
import OrdersTab from './page/Customer/OrdersTab';
import OrdersDetail from './page/Customer/OrdersTab/OrdersDetail';
import ContactsTab from './page/Customer/ContactsTab';
import AddressesTab from './page/Customer/AddressesTab';
import CustomerHubPage from './page/Customer';
import VersionsWrapper from './page/Customer/OrdersTab/VersionsWrapper';
import Shipments from './page/Customer/OrdersTab/Shipments';
import StepSetupWrapper from './page/Customer/OrdersTab/StepSetupWrapper';
import StepUploadWrapper from './page/Customer/OrdersTab/StepUploadWrapper';
import ArtworkProofViewer from './page/Customer/OrdersTab/ArtworkProofViewer';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HubContainer />}>
          <Route index element={<Navigate to="/orders" replace />} />
          <Route path="orders">
            <Route index element={<OrdersTab />} />
            <Route path=":orderId" element={<OrdersDetail />}>
              <Route index element={<div>Select a section to begin</div>} />
              <Route path=":section" element={<VersionsWrapper />}>
                <Route path="setup" element={<StepSetupWrapper />} />
                <Route path="upload" element={<StepUploadWrapper />} />
                <Route path="proof" element={<ArtworkProofViewer />} />
              </Route>
              <Route path="shipments" element={<Shipments />} />
            </Route>
          </Route>
          <Route path="contacts" element={<ContactsTab />} />
          <Route path="addresses" element={<AddressesTab />} />
      </Route>
      <Route path="/file_manager" element={<FileManagerContainer />} />
    </Routes>
  );
}
