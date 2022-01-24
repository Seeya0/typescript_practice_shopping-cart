import { LinearProgress } from "@material-ui/core";
import { useState } from "react";
import { useQuery } from "react-query";


export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data)

  const getTotalItems = (items: CartItemType[]) => {
    items.reduce((ack: number, item) => ack + item.amount, 0)
  }

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) => {
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        })
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    })
  }

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[]))
  }

  return (
    <div className="App">
      start
    </div>
  );
}

export default App;
