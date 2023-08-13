import { useSelector } from 'react-redux';
import { Contact } from '../ContactItem/ContactItem';
import { contacts } from '../../redux/selectors';
import { getStoreFilter } from '../../redux/selectors';
import { StyledList } from './StyledList';
import ContactsListOptions from 'components/ContactListOptions/ContactsListOptions';

export const ContactsList = ({
  toggleModal,
  activateChangeForm,
  activateAddForm,
  toggleFilter,
}) => {
  const contactsList = useSelector(contacts);
  // console.log('contactsList : ', contactsList);
  const filter = useSelector(getStoreFilter);
  // console.log('filter: ', filter);

  const filteredContacts = contactsList?.filter(contact =>
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
