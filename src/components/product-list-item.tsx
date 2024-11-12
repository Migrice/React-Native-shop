import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Product } from "../../assets/types/product";
import { fsv, wp } from "@/utilities/responsives";
import { Link } from "expo-router";

export const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <Link asChild href={`/product/${product.slug}`}>
        <Pressable style={styles.item}>
          <View style={styles.itemImageContainer}>
            <Image source={product.heroImage} style={styles.itemImage} />
          </View>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>{product.title}</Text>
            <Text style={styles.itemPrice}>${product.price.toFixed(2)}</Text>
          </View>
        </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    marginVertical: wp(2),
    borderRadius: 10,
    overflow: "hidden",
    width: wp(44),
  },
  itemImageContainer: {
    borderRadius: 10,
    width: "100%",
    height: 150,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemTextContainer: {
    padding: 8,
    alignItems: "flex-start",
    gap: 4,
  },
  itemTitle: {
    fontSize: fsv(13),
    color: "#888",
  },
  itemPrice: {
    fontSize: fsv(11),
    fontWeight: "bold",
  },
});
