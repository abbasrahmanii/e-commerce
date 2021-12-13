import React, { Fragment, useContext } from "react";
import { Store } from "../context/Store";

const Menu = () => {
  const { state, dispatch } = useContext(Store);
  //   const { menuStatus } = state;

  //   const menuStyle = (menuStaus) => {
  //     if (menuStaus) {
  //       return `transform: translateX(30%)`;
  //     } else {
  //       return `transform: translateX(100%)`;
  //     }
  //   };
  return (
    <Fragment>
      <div className="w-full bg-red-400 absolute top-0 z-50">Menu</div>
    </Fragment>
  );
};

export default Menu;
