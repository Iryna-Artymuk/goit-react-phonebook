import { useSelector } from 'react-redux';
import { Contact } from '../ContactItem/ContactItem';

import { favouriteContacts, getStoreFilter } from '../../redux/selectors';
import { StyledList } from './StyledList';
import ContactsListOptions from 'components/ContactListOptions/ContactsListOptions';

export const FavouriteContactsList = ({ toggleModal, activateChangeForm,toggleFilter,activateAddForm }) => {
  const favouriteContactsList = useSelector(favouriteContacts);
  // console.log('contactsList : ', contactsList);
  const filter = useSelector(getStoreFilter);
  // console.log('filter: ', filter);

  const filteredContacts = favouriteContactsList?.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
  return (
    <>
    <ContactsListOptions 
      toggleModal={toggleModal}
      toggleFilter={toggleFilter}
      activateAddForm={activateAddForm}
    />
    <StyledList>
      {filteredContacts?.map(contactData => (
        <Contact
          activateChangeForm={activateChangeForm}
          toggleModal={toggleModal}
          key={contactData.id}
          data={contactData}
        />
      ))}
    </StyledList>
  </>
  );
};
