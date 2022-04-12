import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cct = useContext(CartContext);
  const cartItems = (
    <ul>
      {cct.items.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </ul>
  );

  const orderMealsHandler = () => {
    setShowCheckout(true);
  };

  const closeHandler = () => {
    setShowCheckout(false);
  };

  const ModalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      <button className={classes.button} onClick={orderMealsHandler}>
        Order
      </button>
    </div>
  );

  return (
    <Modal onClose={props.onClose} onSubmit={orderMealsHandler}>
      <div className={classes["cart-items"]}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{`₹${cct.totalAmount.toFixed(2)}`}</span>
        </div>
        {showCheckout && <Checkout onCancel={closeHandler} />}
        {!showCheckout && ModalActions}
      </div>
    </Modal>
  );
};

export default Cart;
