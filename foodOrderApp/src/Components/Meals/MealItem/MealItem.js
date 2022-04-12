import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const MealItem = (props) => {
  const cct = useContext(CartContext);
  const price = `₹${props.price.toFixed(2)}`;
  const itemAddHandler = (quantity) => {
    const item = {
      name: props.name,
      description: props.description,
      price: props.price,
      id: props.id,
      quantity: parseInt(quantity),
    };
    cct.addItem(item, parseInt(quantity));
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAdd={itemAddHandler} />
      </div>
    </li>
  );
};

export default MealItem;
