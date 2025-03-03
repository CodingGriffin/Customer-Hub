import React, { useState } from 'react';
import { Plus, Trash2, Info } from 'lucide-react';

interface UserManagementProps {
  inviteReviewer: (contactName: string, email: [string], type: string, isApprover: boolean, isUploader: boolean, isData: boolean, isArtwork: boolean) => void;
}
interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

interface Role {
  id: string;
  name: string;
  description: string;
  defaultPermissions: string[];
}

interface Permission {
  id: string;
  name: string;
  required?: boolean;
}

const PERMISSIONS: Permission[] = [
  { id: 'read', name: 'Review', required: true },
  { id: 'upload', name: 'Upload' },
  { id: 'approve', name: 'Approve' }
];

const ROLES: Role[] = [
  {
    id: 'artwork',
    name: 'Artwork',
    description: 'Can review and approve artwork-related content',
    defaultPermissions: ['read']
  },
  {
    id: 'data',
    name: 'Data',
    description: 'Can review and validate data accuracy',
    defaultPermissions: ['read']
  }
];

const getRoleType = (roles: string[]): string => {
  const hasArtwork = roles.includes('artwork');
  const hasData = roles.includes('data');

  if (hasArtwork && hasData) return '00011';
  if (hasArtwork) return '00010';
  if (hasData) return '00001';
  return '00000'; // fallback case
};

export function UserManagement({inviteReviewer}: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    roles: [] as string[],
    permissions: ['read'] as string[]
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const addUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.roles.length === 0) {
      alert('Please select at least one role');
      return;
    }
    
    const roleType = getRoleType(newUser.roles);
    
    setUsers([...users, { ...newUser, id: crypto.randomUUID() }]);
    setNewUser({ name: '', email: '', roles: [], permissions: ['read'] });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    inviteReviewer(
      newUser.name, 
      [newUser.email], 
      roleType, 
      newUser.permissions.includes('approve'), 
      newUser.permissions.includes('upload'),
      newUser.roles.includes('data'),
      newUser.roles.includes('artwork')
    );
  };

  const removeUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const toggleRole = (roleId: string) => {
    setNewUser(prev => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter(r => r !== roleId)
        : [...prev.roles, roleId]
    }));
  };

  const togglePermission = (permissionId: string) => {
    if (permissionId === 'read') return; // Review permission cannot be toggled
    
    setNewUser(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="space-y-6 p-4">
      {showSuccess && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-4 animate-fade-in">
          Reviewer invited successfully!
        </div>
      )}
      
      <form onSubmit={addUser} className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <div>
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                newUser.email && !validateEmail(newUser.email) ? 'border-red-500' : ''
              }`}
              required
            />
            {newUser.email && !validateEmail(newUser.email) && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2 dark:text-white">Role</label>
            <div className="space-y-2">
              {ROLES.map(role => (
                <div key={role.id} className="flex items-center group">
                  <label className="flex items-center space-x-2 flex-1 dark:text-white">
                    <input
                      type="checkbox"
                      checked={newUser.roles.includes(role.id)}
                      onChange={() => toggleRole(role.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-white">{role.name}</span>
                  </label>
                  <div className="relative">
                    <Info 
                      size={16} 
                      className="text-gray-400 cursor-help"
                    />
                    <div className="absolute right-0 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      {role.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2 dark:text-white">User Can:</label>
            <div className="space-y-2">
              {PERMISSIONS.map(permission => (
                <div key={permission.id} className="flex items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newUser.permissions.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                      disabled={permission.required}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-700 dark:text-white">{permission.name}</span>
                    {permission.required && (
                      <span className="text-xs text-gray-500">(Required)</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full justify-center"
        >
          <Plus size={16} />
          Add User
        </button>
      </form>

      {users.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Pending Invites</h3>
          <div className="space-y-2">
            {users.map(user => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    {user.roles.map(roleId => 
                      ROLES.find(r => r.id === roleId)?.name
                    ).join(', ')}
                  </p>
                  <p className="text-xs text-gray-500">
                    Can: {user.permissions.map(p => 
                      PERMISSIONS.find(perm => perm.id === p)?.name
                    ).join(', ')}
                  </p>
                </div>
                <button
                  onClick={() => removeUser(user.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Remove invite"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
