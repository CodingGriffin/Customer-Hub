import { useState } from "react";
import ContactsTab from "../../../page/Customer/ContactsTab"
import { Contact } from '../../../types';

function ContactsList() {
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
  
  return (
    <ContactsTab contacts={contacts} setContacts={setContacts} />
  )
}

export default ContactsList