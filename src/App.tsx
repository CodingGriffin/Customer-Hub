import { Routes, Route, Navigate } from 'react-router-dom';
import FileManagerContainer from './container/FileManager';
import HubPage from './page';
import OrdersList from './container/Customer/Orders';
import OrderDetail from './container/Customer/Orders/detail';
import ContactsList from './container/Customer/Contacts';
import AddressesList from './container/Customer/Addresses';
import ShipmentsList from './container/Customer/Orders/Shipments';
import VersionsWrapper from './page/Customer/OrdersTab/VersionsWrapper';
import StepSetupWrapper from './page/Customer/OrdersTab/StepSetupWrapper';
import StepUploadWrapper from './page/Customer/OrdersTab/StepUploadWrapper';
import ArtworkProofViewer from './page/Customer/OrdersTab/ArtworkProofViewer';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HubPage />}>
        <Route index element={<Navigate to="/orders" replace />} />
        <Route path="orders">
          <Route index element={<OrdersList />} />
          <Route path=":orderId" element={<OrderDetail />}>
            <Route index element={<div>Select a section to begin</div>} />
            <Route path=":section" element={<VersionsWrapper />}>
              <Route path="setup" element={<StepSetupWrapper />} />
              <Route path="upload" element={<StepUploadWrapper />} />
              <Route path="proof" element={<ArtworkProofViewer />} />
            </Route>
            <Route path="shipments" element={<ShipmentsList />} />
          </Route>
        </Route>
        <Route path="contacts" element={<ContactsList />} />
        <Route path="addresses" element={<AddressesList />} />
      </Route>
      <Route path="/file_manager" element={<FileManagerContainer />} />
    </Routes>
  );
}
