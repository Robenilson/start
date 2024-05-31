import React from 'react'
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const optionNav = (props) => {
  return ( 
  <div><Nav.Link><Link  className="text-black text-decoration-none"  to={props.url}>{props.name}</Link></Nav.Link></div>
   )
}
export default optionNav