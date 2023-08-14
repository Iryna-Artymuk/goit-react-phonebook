import { ContactsList } from 'components/ContactsList/ContactsList';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import { Filter } from 'components/Filter/Filter';
import Loader from 'components/Loader';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { contacts, getError, getIsLoading } from 'redux/selectors';

function ContactsPage({ activateAddForm, toggleModal, activateChangeForm }) {
  const [showFilter, setShowFilter] = useState(false);

  const isLoading = useSelector(getIsLoading);

  const error = useSelector(getError);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const contactsList = useSelector(contacts);
  return (
    <>
      {error && <ErrorPage />}
      {isLoading && <Loader />}
      {showFilter && <Filter />}
      {contactsList.length > 0 ? (
        <ContactsList
          toggleFilter={toggleFilter}
          activateAddForm={activateAddForm}
          toggleModal={toggleModal}
          activateChangeForm={activateChangeForm}
        />
      ) : (
        <p className="error"> You don't have favourite contacts yet </p>
      )}
    </>
  );
}

export default ContactsPage;
