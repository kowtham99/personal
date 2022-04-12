// import classes from './CartItem.module.css'

// const CartItem =(props) => {
//     return (
//         <li className={classes['cart-item']}>
//             <h2>{props.item.name}</h2>
//             <p className={classes.summary}>{props.item.description}</p>
//         </li>
//     )
// }

// export default CartItem;

import classes from "./CartItem.module.css";
import { useContext } from "react";
import CartContext from "../store/cart-context";

const CartItem = (props) => {
  //   const price = `$${props.price.toFixed(2)}`;
  const cct = useContext(CartContext);
  const removeHandler = () => {
    cct.removeItem(props.item.id);
  };
  const addHandler = () => {
    cct.addItem(props.item, 1);
    console.log(props.item);
  };
  console.log(props.item.quantity);
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{props.item.price}</span>
          <span className={classes.amount}>x {props.item.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeHandler}>−</button>
        <button onClick={addHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
