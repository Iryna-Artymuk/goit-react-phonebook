// import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Wrapper } from './StyledErrorPage';
import { getError } from 'redux/selectors';
import { useSelector } from 'react-redux';

export default function ErrorPage() {
  const error = useSelector(getError);

  const [text, setText] = useState('');
  useEffect(() => {
    const switchErrorText = () => {
      switch (error) {
        case ' Request failed with status code 404':
          // [error?.response.status] = 404;
          setText(
            'Sorry,something went wrong  we lost a page :(   please refresh page and try again'
          );
          break;

        default:
          setText(`Sorry,something went wrong :(
            ${error} refresh page and try again`);
      }
    };
    switchErrorText();
  }, [error]);
  return (
    <Wrapper>
      <p>{text}</p>
    </Wrapper>
  );
}
