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