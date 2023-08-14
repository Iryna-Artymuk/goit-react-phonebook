import { avatars } from 'Images/usersAvatars';
import { useState } from 'react';

export const SetRandomAvatar = () => {
  const [index] = useState(0);

  const randomUrlIndex = () => {
    let randomNumber = Math.floor(Math.random() * avatars.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    return randomNumber;
  };
  //   console.log('randomUrlIndex: ', randomUrlIndex());

  return avatars[randomUrlIndex()];
};
