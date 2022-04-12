import { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Components/store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const closeHandler = () => {
    setCartIsShown(false);
  };
  const openHandler = () => {
    setCartIsShown(true);
  };
  return (
    <CartProvider>
      <Header onOpen={openHandler} onClose={closeHandler} />
      {cartIsShown && <Cart onClose={closeHandler} />}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
