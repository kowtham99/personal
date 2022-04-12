import classes from "./MealItemForm.module.css";
import { useContext, useRef, useState } from "react";
import Input from "../../UI/Input";
import CartContext from "../../store/cart-context";

const MealItemForm = (props) => {
  const [isValid, setIsValid] = useState("true");
  const [message, setMessage] = useState("");
  const quantityRef = useRef();
  const cct = useContext(CartContext);
  const submitHandler = (event) => {
    event.preventDefault();
    const presentQuantity = cct.checkQuantity(props.id);
    if (presentQuantity === 5) {
      setIsValid(false);
      setMessage(`you can't add any more items to the cart`);
    } else if (presentQuantity !== 5) {
      if (quantityRef.current.value > 5 - presentQuantity) {
        setIsValid(false);
        setMessage(`you can add only ${5 - presentQuantity} more to the cart`);
      } else {
        setIsValid(true);
        props.onAdd(quantityRef.current.value);
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={quantityRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      {!isValid && <p>{message}</p>}
      <button type="submit">Add</button>
    </form>
  );
};

export default MealItemForm;
