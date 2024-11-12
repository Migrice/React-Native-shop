import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { fsv, wp, hp } from "@/utilities/responsives";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "react-native";
import { CATEGORIES } from "../../assets/categories";
import { Link } from "expo-router";
import { useCartStore } from "@/store/cart-store";

const ListHeader = () => {
  const { getItemCount } = useCartStore();
  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>

        <FontAwesome name="user" size={24} color="black"   />
          </View>
          {/* <Image
            style={styles.avatar}
            source={{ uri: "https://via.placeholder.com/40" }}
          /> */}
          <Text> Hello Emelda!</Text>
        </View>

        <View style={styles.headerRight}>
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome
                    size={24}
                    name="shopping-cart"
                    color="black"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{getItemCount()}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity>
            <FontAwesome name="sign-out" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.heroContainer}>
        <Image
          style={styles.heroimage}
          source={require("../../assets/images/hero.png")}
        />
      </View>

      <View>
        <Text style={styles.categories_title}>Categories</Text>
        <View style={styles.categories}>
          <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatlistcontainer}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center" }}>
                <Link asChild href={`/categories/${item.slug}`}>
                  <Pressable>
                    <View style={styles.categoryImageContainer}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.category_image}
                      />
                    </View>

                    <Text style={styles.category_name}>{item.name}</Text>
                  </Pressable>
                </Link>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: fsv(5),
    gap: 25,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    backgroundColor: "gray",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems:"center",
    justifyContent:"center"
  },
  headerRight: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  heroContainer: {
    height: 200,
  },
  heroimage: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  categories_title: {
    fontWeight: "bold",
    fontSize: fsv(20),
    marginBottom: 10,
  },
  categories: {
    marginBottom: 20,
    alignItems: "center",
  },
  categoryImageContainer: {
    height: 60,
    width: 60,
  },
  category_image: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  flatlistcontainer: {
    gap: 20,
  },
  category_name: {
    fontSize: fsv(12),
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    left: 10,
    backgroundColor: "#1BC464",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
