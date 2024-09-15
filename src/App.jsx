import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import contactData from './components/data/contactData.json';

function App() {
  const [userContacts, setUserContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contactUser')) ?? contactData
    );
  });
  const [filteredContacts, setFilteredContacts] = useState(contactData);
  const [serchUser, setSerchUser] = useState('');

  useEffect(() => {
    if (serchUser === '') {
      setFilteredContacts(userContacts);
    } else {
      setFilteredContacts(prev =>
        prev.filter(item => item.name.toLowerCase().includes(serchUser))
      );
    }
  }, [serchUser, userContacts]);

  useEffect(() => {
    window.localStorage.setItem('contactUser', JSON.stringify(userContacts));
  }, [userContacts]);

  const handleDeleteContactUser = id => {
    setUserContacts(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <h1 className='pageTitle'>Phonebook</h1>
      <ContactForm setUserContacts={setUserContacts} />
      <SearchBox serchUser={serchUser} setSerchUser={setSerchUser} />
      <ContactList
        userContacts={filteredContacts}
        handleDeleteContactUser={handleDeleteContactUser}
      />
    </>
  );
}

export default App;
