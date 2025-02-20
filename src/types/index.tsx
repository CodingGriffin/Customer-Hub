export type HubType = 'customer' | 'vendor';

export type TabType = 'orders' | 'contacts' | 'addresses';

export type FileItemType = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
  hidden?: boolean;
  aiRecommendation?: {
    type: 'rename' | 'delete';
    newName?: string;
  };
};

export interface OrderJob {
  id: string;
  version: number;
  section: 'packaging' | 'artwork' | 'data';
  type: 'setup' | 'upload' | 'view' | 'approve' | 'approve-sample' | 'approve-live';
  title: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'active' | 'completed' | 'on-hold';
  createdAt: string;
  jobs: OrderJob[];
  productName?: string;
  productConfig?: string;
  productImage?: string;
}

export type ArtworkManagerItemType = {
  id: string;
  name: string;
  type: 'file';
  size?: string;
  modified?: string;
  hidden?: boolean;
  printLocation?: string;
  comment?: string;
  aiRecommendation?: {
    type: 'rename' | 'delete';
    newName?: string;
  };
};

export type Contact = {
  contact_id: number;
  contact_name: string;
  emails: string;
  phone_numbers: string;
  enabled: boolean;
}

export type Address = {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface VersionsContext {
  selectedSection: 'packaging' | 'artwork' | 'data' | 'shipments' | null;
  setSelectedStep: (step: number) => void;
}
