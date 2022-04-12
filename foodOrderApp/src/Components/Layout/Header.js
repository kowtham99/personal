import React, { Fragment } from "react";
import mealsImg from "../../Assests/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Zamindar</h1>
        <HeaderCartButton onClick={props.onOpen} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="A table full of delicious Food" />
      </div>
    </Fragment>
  );
};

export default Header;
