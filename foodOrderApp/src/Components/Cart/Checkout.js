import classes from "./Checkout.module.css";
import { useState, useContext } from "react";
import useInput from "../../hooks/use-input";
import CartContext from "../store/cart-context";

const Checkout = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cct = useContext(CartContext);
  const addMealsData = async (order) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://foodorder-5c7d1-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: order, meals: cct.items }),
          headers: {
            "content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request Failed");
      }
    } catch (err) {
      setError(err.message || "something went wromg !");
    }
    setIsLoading(false);
  };
  const {
    value: enteredName,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
    isValid: enteredNameIsValid,
    hasError: enteredNameIsInValid,
  } = useInput((value) => value.trim().length !== 0);

  const {
    value: enteredStreet,
    changeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
    reset: streetReset,
    isValid: enteredStreetIsValid,
    hasError: enteredStreetIsInValid,
  } = useInput((value) => value.trim().length !== 0);

  const {
    value: enteredCity,
    changeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
    reset: cityReset,
    isValid: enteredCityIsValid,
    hasError: enteredCityIsInValid,
  } = useInput((value) => value.trim().length !== 0);

  const {
    value: enteredPostal,
    changeHandler: postalChangeHandler,
    blurHandler: postalBlurHandler,
    reset: postalReset,
    isValid: enteredPostalIsValid,
    hasError: enteredPostalIsInValid,
  } = useInput((value) => value.trim().length === 6);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredPostalIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    // const data = {
    //   customerName: enteredName,
    //   street: enteredStreet,
    //   postalCode: enteredPostal,
    //   city: enteredCity,
    //   meals: cct.items,
    // };

    addMealsData({
      customerName: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    });
    cct.checkoutHandler();
    nameReset();
    streetReset();
    cityReset();
    postalReset();
    props.onCancel();
  };

  const nameControlClasses = `${classes.control} ${
    enteredNameIsInValid ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    enteredStreetIsInValid ? classes.invalid : ""
  }`;
  const postalControlClasses = `${classes.control} ${
    enteredPostalIsInValid ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    enteredCityIsInValid ? classes.invalid : ""
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          input="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {enteredNameIsInValid && <p>Please enter a Valid Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          input="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
        {enteredStreetIsInValid && <p>Please enter a Valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal code</label>
        <input
          input="text"
          id="postal"
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
          value={enteredPostal}
        />
        {enteredPostalIsInValid && (
          <p>Please enter a Valid Postal Code (6 characters)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          input="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {enteredCityIsInValid && <p>Please enter a Valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default Checkout;
