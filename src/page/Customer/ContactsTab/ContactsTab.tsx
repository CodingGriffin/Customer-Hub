import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X, Mail, Phone } from 'lucide-react';

import { Contact } from '../../../types';
import ContactForm from './ContactForm';

interface ContactsTabProps {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
}

export default function ContactsTab({contacts, setContacts}: ContactsTabProps) {

  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const addContact = () => {
    // const newContact: Contact = {
    //   id: Math.random().toString(36).substr(2, 9),
    //   name: '',
    //   emails: [{ id: Math.random().toString(36).substr(2, 9), email: '', disabled: false }],
    //   phones: [{ id: Math.random().toString(36).substr(2, 9), number: '', disabled: false }],
    // };
    // setContacts([...contacts, newContact]);
    // setIsEditing(newContact.id);
  };

  const handleAddContact = () => {
    setIsAddingContact(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = async (contactId: number) => {
    // Implement delete functionality
    console.log('Delete contact:', contactId);
  };

  const handleCancel = () => {
    setIsAddingContact(false);
    setEditingContact(null);
  };

  const handleSubmit = async(dataParam:any) => {
    // const data = {
    //   mode:'insert',
    //   entities_id:entityId,
    //   contact_name:dataParam.contact_name,
    //   contact_acl:dataParam.contact_acl,
    //   email:dataParam.email,
    //   phone_types_id:dataParam.phone_types_id,
    //   phone_number:dataParam.phone_number
    // }
    // const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    // try{
    //   const response = await axios.post(baseUrl + '/j/inc/class/class.contacts.php', qs.stringify(data), {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   });
    //   console.log(response);
    //   setIsAddingContact(false);
    //   getAllContacts();
    // } catch (error) {
    //   console.log('ajax call error:', error);
    // }
  }

  const handleSubmit2Edit = async(dataParam:any) => {
    // const data = {
    //   mode:'edit',
    //   entities_id:entityId,
    //   contacts_id:editingContact?.contact_id,
    //   contact_name:dataParam.contact_name,
    //   contact_acl:dataParam.contact_acl,
    //   email:dataParam.email,
    //   phone_types_id:dataParam.phone_types_id,
    //   phone_number:dataParam.phone_number
    // }
    // const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    // try{
    //   const response = await axios.post(baseUrl + '/j/inc/class/class.contacts.php', qs.stringify(data), {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   });
    //   console.log(response);
    //   setEditingContact(null);
    //   getAllContacts();
    // } catch (error) {
    //   console.log('ajax call error:', error);
    // }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Contacts</h2>
        <button
          onClick={handleAddContact}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </button>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.contact_id}
            className="bg-gray-50 rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <h4 className="font-medium">{contact.contact_name}</h4>
              <div className="mt-1 space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {contact.emails}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {contact.phone_numbers}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditContact(contact)}
                className="text-gray-400 hover:text-gray-500"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteContact(contact.contact_id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAddingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <ContactForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isEdit={false}
            />
          </div>
        </div>
      )}

      {editingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <ContactForm
              onSubmit={handleSubmit2Edit}
              onCancel={handleCancel}
              initialData={editingContact}
              isEdit={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}