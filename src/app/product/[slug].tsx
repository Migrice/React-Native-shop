import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { PRODUCTS } from "../../../assets/products";
import { StyleSheet } from "react-native";
import { fsv, hp, wp } from "@/utilities/responsives";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useToast } from "react-native-toast-notifications";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) {
    return <Redirect href="/404" />;
  }

  const toast = useToast();

  const { items, incrementItem, decrementItem, addItem } = useCartStore();

  const cartItem = items.find((item) => item.id === product.id);

  const initialQuantity = cartItem ? cartItem.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  const totalPrice = (product.price * quantity).toFixed(2);

  const increaseQuantity = () => {
    if (quantity < product.maxQuantity) {
      setQuantity((prev) => prev + 1);
      incrementItem(product.id);
    } else {
      toast.show("Cannot add more than maximum quantity", {
        type: "warning",
        placement: "top",
        duration: 1500,
      });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      decrementItem(product.id);
    }
  };

  const addToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      image: product.heroImage,
      quantity: quantity,
      price: product.price,
      maxQuantity: product.maxQuantity,
    });

    toast.show("Added to cart", {
      type: "success",
      placement: "top",
      duration: 1500,
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.slug }} />
      <View style={styles.imageContainer}>
        <Image
          source={product.heroImage}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Title: {product.title}</Text>
        <Text style={styles.slug}>Slug: {product.slug}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}> {`Unit Price: ${product.price}`}</Text>
          <Text style={styles.price}> {`Total Price: ${totalPrice}`}</Text>
        </View>

        <FlatList
          data={product.imagesUrl}
          contentContainerStyle={{ gap: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width: 90, height: 90 }}>
              <Image
                source={item}
                resizeMode="cover"
                style={styles.itemImage}
              />
            </View>
          )}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}> {quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
            disabled={quantity >= product.maxQuantity}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.addToCartButton,
              { opacity: quantity === 0 ? 0.5 : 1 },
            ]}
            onPress={addToCart}
            disabled={quantity === 0}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: hp(30),
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: fsv(18),
    marginBottom: fsv(5),
  },
  slug: {
    fontSize: fsv(15),
    marginBottom: fsv(10),
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: fsv(15),
  },
  price: {
    fontWeight: "bold",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderRadius: fsv(10),
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 100,
    paddingHorizontal: 16,
  },
  quantityButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 20,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    color: "white",
    fontSize: fsv(15),
    fontWeight: "bold",
  },
  quantity: {
    fontSize: fsv(15),
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "green",
    borderRadius: 8,
  },
  addToCartText: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    color: "white",
  },
});

export default ProductDetails;
