import { MdClose } from 'react-icons/md';
import { BsFillTelephoneFill, BsFillPencilFill } from 'react-icons/bs';
import { AiTwotoneStar } from 'react-icons/ai';

import {
  Card,
  CardAvatar,
  CardInfo,
  CardTitle,
  CardSubtitle,
  Options,
  StyledLabel,
} from './StyledContactItem';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveContactId } from '../../redux/contactsSlice';
import { IconButton } from '../Button/StyledButton';
import { deleteContact } from '../../redux/operations';
import { useState } from 'react';
import { favouriteContacts } from 'redux/selectors';
// import { useEffect } from 'react';
// import { contacts, getActiveContactId } from 'redux/selectors';
export const Contact = ({ data, toggleModal, activateChangeForm }) => {
  const favouriteContactsArr = useSelector(favouriteContacts);
  const id = data.id;
  const getisFavourireStatus = id => {
    const favouritecontact = favouriteContactsArr.find(
      contact => contact.id === data.id
    );
    if (favouritecontact) {
      return true;
    }
    return false;
  };

  const [isFavourite] = useState(() => getisFavourireStatus(id));
  const dispatch = useDispatch();

  const handelDelete = () => {
    dispatch(setActiveContactId(data.id));

    dispatch(deleteContact(data.id));
  };
  const handlFavourite = () => {
    addActiveIdtoStore(data.id);
    dispatch(setActiveContactId(data.id));
    // const index = favouriteContactsArr.contacts.findIndex(
    //   contact => contact.id === data.id
    // );
    // if (index < 0) {
    //   dispatch(addToFavourite(data));
    // }

    // dispatch(removeFromFavourite(data));
  };
  //
  const addActiveIdtoStore = () => dispatch(setActiveContactId(data.id));

  // console.log(data);
  return (
    <li>
      <Card>
        <CardInfo>
          <CardAvatar>{/* <img src={avatar} alt="" /> */}</CardAvatar>
          <CardTitle> {data.name}</CardTitle>
          <CardSubtitle> {data.number}</CardSubtitle>
          <Options>
            <a href={`tel:${data.number}`}>
              <IconButton type="button" onClick={addActiveIdtoStore}>
                <BsFillTelephoneFill size={24} />
              </IconButton>
            </a>

            <IconButton
              type="button"
              onClick={() => {
                activateChangeForm();
                addActiveIdtoStore();
                toggleModal();
              }}
            >
              <BsFillPencilFill size={24} />
            </IconButton>
            <IconButton type="button" onClick={handelDelete}>
              <MdClose size={24} />
            </IconButton>
            <StyledLabel>
              <input
                type="checkbox"
                checked={isFavourite}
                onChange={handlFavourite}
                title="Add to favourite"
              />

              <AiTwotoneStar size={24} />
            </StyledLabel>

            {/* 
         
            <StyledInput
              type="checkbox"
              id="fafourite-toggle"
              value={data.id}
              onChange={data => {
                handlFavourite(data);
              }}
              checked={data.isFavourite}
              // onChange={event => {
              //   console.log('event: ', event);

              //   handlFavourite();
              // }}
            />
            <StyledLabel htmlFor="fafourite-toggle">
              <AiTwotoneStar size={24} />
            </StyledLabel>
            {/* </IconButton> */}
          </Options>
        </CardInfo>
      </Card>
    </li>
  );
};
//  {/* <ContactWrapper>
//       <ContactInfo>
//         <p>{data.name}</p>
//         <p>{data.phone_number}</p>
//       </ContactInfo>

//       <IconButton type="button" onClick={handelClick}>
//         <MdClose size={24} />
//       </IconButton>
//     </ContactWrapper> */}
