import React from 'react';
import { NavLink } from 'react-bootstrap';

const OptionNav = ({ url, name }) => {
  return (
    <NavLink className='menu' href={url}>{name}</NavLink>
  );
};

export default OptionNav;
