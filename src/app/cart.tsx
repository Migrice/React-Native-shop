import { useCartStore } from "@/store/cart-store";
import { fsv } from "@/utilities/responsives";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

type CartItemType = {
  id: number;
  title: string;
  image: any;
  price: number;
  quantity: number;
  maxQuantity: number;
};

type CartItemProps = {
  item: CartItemType;
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

const CartItem = ({
  item,
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemProps) => {
  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.itemLeft}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        </View>
        <View style={{ flexDirection: "column", gap: 2 }}>
          <Text style={{ fontSize: fsv(12), fontWeight: "bold" }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: fsv(12) }}>${item.price}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onDecrement(item.id)}
              disabled={item.quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>

            <Text> {item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onIncrement(item.id)}
              disabled={item.quantity >= item.maxQuantity}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRemove(item.id)}
        >
          <Text style={{ color: "white" }}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Cart = () => {
  const { items, removeItem, incrementItem, decrementItem, getTotalPrice } =
    useCartStore();

  return (
    <View style={styles.container}>
      <StatusBar />
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 15, margin: 15 }}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={removeItem}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
          />
        )}
      />

      <View style={styles.footer}>
        <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: fsv(18) }}>
          Total: ${getTotalPrice()}
        </Text>
        <TouchableOpacity>
          <Text style={styles.checkout}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  cartItemContainer: {
    backgroundColor: "#f1f3f4",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  itemLeft: {
    gap: 10,
    flexDirection: "row",
  },
  itemRight: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "crimson",
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  quantityButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    backgroundColor: "#a1a4a7",
    borderRadius: 20,
  },
  quantityButtonText: {
    fontSize: fsv(15),
    fontWeight: "bold",
  },
  checkout: {
    color: "white",
    backgroundColor: "green",
    paddingHorizontal: fsv(30),
    paddingVertical: fsv(10),
    borderRadius: 10,
    fontWeight: "bold",
  },
  footer: {
    borderTopColor: "#a1a4a7",
    borderTopWidth: 1,
    borderStyle: "solid",
    marginHorizontal: 15,
    gap: 10,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
