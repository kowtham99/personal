import CartContext from "./cart-context";
import { useState } from "react";

const CartProvider = (props) => {
  console.log("cartProvider");
  const [items, setItems] = useState([]);
  const [quantityAmount, setQuantityAmount] = useState({
    totalQuantity: 0,
    totalAmount: 0,
  });
  const addItemHandler = (item, quantity) => {
    const isPresent = items.findIndex((it) => item.id === it.id);
    const updateItem = items[isPresent]; //
    if (updateItem) {
      // updateItem.quantity += quantity;
      items[isPresent].quantity += quantity;
      console.log(items);
      setItems(items);
      setQuantityAmount({
        totalQuantity: quantityAmount.totalQuantity + quantity,
        totalAmount: quantityAmount.totalAmount + quantity * item.price,
      });
    } else {
      setItems((prev) => {
        return [...prev, item];
      });
      setQuantityAmount({
        totalQuantity: quantityAmount.totalQuantity + quantity,
        totalAmount: quantityAmount.totalAmount + quantity * item.price,
      });
    }
  };
  const removeItemHandler = (id) => {
    const isPresent = items.findIndex((it) => id === it.id);
    const updateItem = items[isPresent];
    if (updateItem) {
      if (updateItem.quantity === 1) {
        setQuantityAmount({
          totalQuantity: quantityAmount.totalQuantity - 1,
          totalAmount: quantityAmount.totalAmount - updateItem.price,
        });
        const new_items = items.filter((item) => item.id !== id);
        setItems(new_items);
      } else {
        // updateItem.quantity -= 1;
        items[isPresent].quantity -= 1;
        setItems(items);
        setQuantityAmount({
          totalQuantity: quantityAmount.totalQuantity - 1,
          totalAmount: quantityAmount.totalAmount - updateItem.price,
        });
      }
    }
  };

  const checkoutHandler = () => {
    setItems([]);
    setQuantityAmount({ totalQuantity: 0, totalAmount: 0 });
  };
  const checkQuantityHandler = (id) => {
    const isPresent = items.findIndex((it) => id === it.id);
    const updateItem = items[isPresent];
    if (updateItem) {
      return updateItem.quantity;
    }
  };
  const cartContext = {
    items: items,
    totalAmount: quantityAmount.totalAmount,
    totalQuantity: quantityAmount.totalQuantity,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    checkQuantity: checkQuantityHandler,
    checkoutHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// const [totalQuantity, setTotalQuantity] = useState(0);      //states for total quantity and total amount
// const [totalAmount,setTotalAmount] = useState(0);

//add items to the cart
// if(items.length === 0){
//     setQuantityAmount({totalQuantity: quantityAmount.totalQuantity + quantity , totalAmount : quantityAmount.totalAmount + (quantity*item.price)})
//     // setTotalAmount(totalAmount + (quantity*item.price));
//     // setTotalQuantity(totalQuantity+quantity);
//     setItems((prev) =>{
//         return [item,...prev];
//     })
// }
// else{
//     for(let i of items){
//         count += 1;
//         if(i.id === item.id){
//             i.quantity += quantity;
//             setQuantityAmount({totalQuantity: quantityAmount.totalQuantity + quantity , totalAmount : quantityAmount.totalAmount + (quantity*item.price)})
//             // setTotalAmount(totalAmount + (quantity*item.price));
//             // setTotalQuantity(totalQuantity + quantity);
//             break;
//         }
//         else{
//             if(count === items.length){
//                 setQuantityAmount({totalQuantity: quantityAmount.totalQuantity + quantity , totalAmount : quantityAmount.totalAmount + (quantity*item.price)})
//                 // setTotalAmount(totalAmount + (quantity*item.price));
//                 // setTotalQuantity(totalQuantity+quantity);
//                 setItems((prev) =>{
//                     return [item,...prev];
//                 })
//                 break;
//             }
//         }
//     }
// }

// remove items from the cart
// for(let i in items){
//     if(items[i].id === id){
//         if(items[i].quantity === 1){
//             const new_items= items.filter(item => item.id !== id);
//             setItems(new_items);
//             setQuantityAmount({totalQuantity: quantityAmount.totalQuantity -1 , totalAmount : quantityAmount.totalAmount - items[i].price})
//             // setTotalAmount(totalAmount-items[i].price);
//             // setTotalQuantity(totalQuantity-1)
//             break;
//         }
//         else{
//             items[i].quantity -= 1;
//             setQuantityAmount({totalQuantity: quantityAmount.totalQuantity + 1 , totalAmount : quantityAmount.totalAmount - items[i].price})
//             // setTotalAmount(totalAmount-items[i].price);
//             // setTotalQuantity(totalQuantity-1)
//             break;
//         }
//         // setTotalAmount(totalAmount-i.price);
//         // setTotalQuantity(totalQuantity-1);
//     }

// }
