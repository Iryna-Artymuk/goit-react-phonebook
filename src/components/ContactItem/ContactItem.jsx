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
import {
  addToFavourite,
  removeFromFavourite,
  setActiveContactId,
} from '../../redux/contactsSlice';
import { IconButton } from '../Button/StyledButton';
import { deleteContact } from '../../redux/operations';
import { useState } from 'react';
import { favouriteContacts, getActiveContactId } from 'redux/selectors';
import { useEffect } from 'react';
import { SetRandomAvatar } from 'Servises/SetUserAvatar';

export const Contact = ({ data, toggleModal, activateChangeForm }) => {
  const dispatch = useDispatch();
  const [isFavourite, setIsFavourite] = useState(false);
  // console.log('isFavourite: ', isFavourite);
  const userFavouriteContacts = useSelector(favouriteContacts);
  // console.log(' userFavouriteContacts: ', userFavouriteContacts);
  const activeContactId = useSelector(getActiveContactId);

  useEffect(() => {
    const getFavourireStatus = () => {
      const isContsctFavourite = userFavouriteContacts.find(
        contact => contact.id === data.id
      );

      if (isContsctFavourite) {
        return setIsFavourite(true);
      }
      return setIsFavourite(false);
    };
    getFavourireStatus(data.id);
  }, [userFavouriteContacts, data.id]);

  const handlFavourite = () => {
    const index = userFavouriteContacts.findIndex(
      contact => contact.id === data.id
    );
    if (index < 0) {
      dispatch(addToFavourite(data));
    } else if (index > 0 || index === 0) {
      dispatch(removeFromFavourite(data));
    }
  };
  const handelDelete = () => {
    dispatch(deleteContact(activeContactId));
  };
  const addActiveIdtoStore = () => dispatch(setActiveContactId(data.id));

  return (
    <li>
      <Card>
        <CardInfo>
          <CardAvatar avatar={SetRandomAvatar()}> </CardAvatar>
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
                addActiveIdtoStore();
                activateChangeForm();
                toggleModal();
              }}
            >
              <BsFillPencilFill size={24} />
            </IconButton>

            <IconButton
              type="button"
              onClick={() => {
                addActiveIdtoStore();
                console.log('data.id: ', data.id);

                handelDelete(data.id);
              }}
            >
              <MdClose size={24} />
            </IconButton>

            <StyledLabel>
              <input
                type="checkbox"
                checked={isFavourite}
                onChange={() => {
                  // getFavourireStatus(data.id);
                  addActiveIdtoStore();
                  handlFavourite(data.id);
                }}
                title="Add to favourite"
              />
              <AiTwotoneStar size={24} />
            </StyledLabel>
          </Options>
        </CardInfo>
      </Card>
    </li>
  );
};
