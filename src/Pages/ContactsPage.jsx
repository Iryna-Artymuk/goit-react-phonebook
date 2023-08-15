import ContactsListOptions from 'components/ContactListOptions/ContactsListOptions';
import { ContactsList } from 'components/ContactsList/ContactsList';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import { Filter } from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Navigate } from 'react-router';


import {
  contacts,
  getError,
  getIsAuthorizated,
  getIsLoading,

} from 'redux/selectors';

function ContactsPage({ activateAddForm, toggleModal, activateChangeForm }) {

  const isAuthorizated = useSelector(getIsAuthorizated);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  // const token = useSelector(getToken);
  const [showFilter, setShowFilter] = useState(false);

 
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const contactsList = useSelector(contacts);
  if (!isAuthorizated) return <Navigate to="/login" />;

  return (
    <>
      {isLoading && <Loader />}
      {showFilter && <Filter />}

      <ContactsListOptions
        toggleModal={toggleModal}
        toggleFilter={toggleFilter}
        activateAddForm={activateAddForm}
      />
      {error && <ErrorPage />}
      {contactsList.length > 0 ? (
        <ContactsList
          toggleFilter={toggleFilter}
          activateAddForm={activateAddForm}
          toggleModal={toggleModal}
          activateChangeForm={activateChangeForm}
        />
      ) : (
        <p className="error"> You don't have contacts yet </p>
      )}
    </>
  );
}

export default ContactsPage;
