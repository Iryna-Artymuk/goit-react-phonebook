import { FavouriteContactsList } from 'components/ContactsList/FavouriteContactsList';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { favouriteContacts, getError } from 'redux/selectors';

export default function FavouriteContactsPage({
  activateAddForm,
  toggleModal,
  activateChangeForm,
}) {
  const userFavouriteContactsList = useSelector(favouriteContacts);
  //   console.log(' userFavouriteContactsList: ', userFavouriteContactsList);
  const error = useSelector(getError);
  return (
    <>
      {error && <ErrorPage />}
      {userFavouriteContactsList.length > 0 ? (
        <FavouriteContactsList
          activateAddForm={activateAddForm}
          toggleModal={toggleModal}
          activateChangeForm={activateChangeForm}
        ></FavouriteContactsList>
      ) : (
        <p className="error"> You don't have favourite contacts yet </p>
      )}
    </>
  );
}
