import React from 'react'
import { Outlet } from "react-router-dom"; // Importando o Outlet
import Menu from './menu';


export const Index = () => {
  return (
    <>
    <Menu>
        <Outlet />
    </Menu>
    </>
  )
}


export default Index;