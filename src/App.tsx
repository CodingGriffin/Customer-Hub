import { Routes, Route, Navigate } from 'react-router-dom';
import FileManagerContainer from './container/FileManager';
import HubPage from './page';
import CustomerHubPage from './page/Customer';
import OrdersList from './container/Customer/Orders';
import OrderDetail from './container/Customer/Orders/detail';
import ContactsList from './container/Customer/Contacts';
import AddressesList from './container/Customer/Addresses';
import ShipmentsList from './container/Customer/Orders/Shipments';
import VersionsContainer from './container/Customer/Versions';
import StepSetupContainer from './container/Customer/StepSetup';
import StepUploadContainer from './container/Customer/StepUpload';
import DataProof from './page/Customer/OrdersTab/DataProof';
import ArtworkUpload from './container/Customer/ArtworkUpload';
import ArtworkProof from './container/Customer/ArtworkProof';
import ArtworkPhotoSample from './page/Customer/OrdersTab/ArtworkPhotoSample';

import VendorOrdersTab from './container/Vendor/Orders';
import VendorOrderDetail from './container/Vendor/Orders/detail';
import VendorVersionContainer from './container/Vendor/Versions';
import VendorFiles from './container/Vendor/Files';
import VendorPhotoSample from './container/Vendor/PhotoSamples';
import VendorProduction from './container/Vendor/Production';
import VendorShipmentsList from './container/Vendor/Orders/Shipments';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HubPage />}>
        <Route index element={<Navigate to="customer" replace />} />
        <Route path="customer" element={<CustomerHubPage />}>
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders">
            <Route index element={<OrdersList />} />
            <Route path=":orderId" element={<OrderDetail />}>
              <Route index element={<VendorShipmentsList />} />
              <Route path=":section" element={<VersionsContainer />}>
                <Route path=":version_id/setup" element={<StepSetupContainer />} />
                <Route path=":version_id/data-upload" element={<StepUploadContainer />} />
                <Route path=":version_id/data-proof" element={<DataProof />} />
                <Route path=":version_id/artwork-upload" element={<ArtworkUpload />} />
                <Route path=":version_id/artwork-proof" element={<ArtworkProof />} />
                <Route path=":version_id/artwork-photo-sample" element={<ArtworkPhotoSample />} />
              </Route>
              <Route path="shipments" element={<ShipmentsList />} />
            </Route>
          </Route>
          <Route path="contacts" element={<ContactsList />} />
          <Route path="addresses" element={<AddressesList />} />
        </Route>
        <Route path="vendor">
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders">
            <Route index element={<VendorOrdersTab />} />
            <Route path=":orderId" element={<VendorOrderDetail />}>
              <Route index element={<VendorShipmentsList />} />
              <Route path=":section" element={<VendorVersionContainer />}>
                <Route path=":version_id/files" element={<VendorFiles />} />
                <Route path=":version_id/samples" element={<VendorPhotoSample />} />
                <Route path=":version_id/production" element={<VendorProduction />} />
              </Route>
              <Route path="shipments" element={<VendorShipmentsList />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/file_manager" element={<FileManagerContainer />} />
    </Routes>
  );
}
