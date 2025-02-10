import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  emails: Array<{ id: string; email: string; disabled: boolean }>;
  phones: Array<{ id: string; number: string; disabled: boolean }>;
}

export default function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Smith',
      emails: [
        { id: 'e1', email: 'john.smith@example.com', disabled: false },
        { id: 'e2', email: 'john.s.work@example.com', disabled: true }
      ],
      phones: [
        { id: 'p1', number: '(555) 123-4567', disabled: false },
        { id: 'p2', number: '(555) 987-6543', disabled: true }
      ]
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      emails: [
        { id: 'e3', email: 'sarah.j@example.com', disabled: false },
        { id: 'e4', email: 'sjohnson@example.com', disabled: false }
      ],
      phones: [
        { id: 'p3', number: '(555) 234-5678', disabled: false }
      ]
    }
  ]);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const addContact = () => {
    const newContact: Contact = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      emails: [{ id: Math.random().toString(36).substr(2, 9), email: '', disabled: false }],
      phones: [{ id: Math.random().toString(36).substr(2, 9), number: '', disabled: false }],
    };
    setContacts([...contacts, newContact]);
    setIsEditing(newContact.id);
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Contacts</h2>
        <button
          onClick={addContact}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </button>
      </div>

      <div className="space-y-4">
        {contacts.map(contact => (
          <div key={contact.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              {isEditing === contact.id ? (
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => updateContact(contact.id, { name: e.target.value })}
                  className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contact Name"
                />
              ) : (
                <h3 className="text-lg font-medium">{contact.name || 'Unnamed Contact'}</h3>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(isEditing === contact.id ? null : contact.id)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {isEditing === contact.id ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Email Addresses</h4>
                {contact.emails.map((email, index) => (
                  <div key={email.id} className="flex items-center space-x-2 mb-2">
                    <input
                      type="email"
                      value={email.email}
                      onChange={(e) => {
                        const newEmails = [...contact.emails];
                        newEmails[index].email = e.target.value;
                        updateContact(contact.id, { emails: newEmails });
                      }}
                      disabled={!isEditing}
                      className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => {
                        const newEmails = [...contact.emails];
                        newEmails[index].disabled = !newEmails[index].disabled;
                        updateContact(contact.id, { emails: newEmails });
                      }}
                      className={`px-2 py-1 text-sm rounded ${
                        email.disabled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {email.disabled ? 'Disabled' : 'Active'}
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Phone Numbers</h4>
                {contact.phones.map((phone, index) => (
                  <div key={phone.id} className="flex items-center space-x-2 mb-2">
                    <input
                      type="tel"
                      value={phone.number}
                      onChange={(e) => {
                        const newPhones = [...contact.phones];
                        newPhones[index].number = e.target.value;
                        updateContact(contact.id, { phones: newPhones });
                      }}
                      disabled={!isEditing}
                      className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => {
                        const newPhones = [...contact.phones];
                        newPhones[index].disabled = !newPhones[index].disabled;
                        updateContact(contact.id, { phones: newPhones });
                      }}
                      className={`px-2 py-1 text-sm rounded ${
                        phone.disabled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {phone.disabled ? 'Disabled' : 'Active'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}