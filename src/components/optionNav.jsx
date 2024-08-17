import React from 'react';
import { NavLink } from 'react-bootstrap';

const OptionNav = ({ url, name }) => {
  return (
    <NavLink className='body' href={url}>{name}</NavLink>
  );
};

export default OptionNav;
