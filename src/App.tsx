import { Routes, Route, Navigate } from 'react-router-dom';
import FileManagerContainer from './container/FileManager';
import HubPage from './page';
import OrdersList from './container/Customer/Orders';
import OrderDetail from './container/Customer/Orders/detail';
import ContactsList from './container/Customer/Contacts';
import AddressesList from './container/Customer/Addresses';
import ShipmentsList from './container/Customer/Orders/shipments';
import VersionsWrapper from './page/Customer/OrdersTab/VersionsWrapper';
import StepSetupWrapper from './page/Customer/OrdersTab/StepSetupWrapper';
import StepUploadWrapper from './page/Customer/OrdersTab/StepUploadWrapper';
import DataProof from './page/Customer/OrdersTab/DataProof';
import ArtworkManagerWrapper from './page/Customer/OrdersTab/ArtworkManagerWrapper';
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
              <Route path=":version_id/setup" element={<StepSetupWrapper />} />
              <Route path=":version_id/data-upload" element={<StepUploadWrapper />} />
              <Route path=":version_id/data-proof" element={<DataProof />} />
              <Route path=":version_id/artwork-upload" element={<ArtworkManagerWrapper />} />
              <Route path=":version_id/artwork-proof" element={<ArtworkProofViewer />} />
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
