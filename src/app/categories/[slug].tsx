import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";

import { CATEGORIES } from "../../../assets/categories";
import { Category as CategorySchema } from "../../../assets/types/category";
import { fsv, hp, wp } from "@/utilities/responsives";
import { ProductListItem } from "@/components/product-list-item";


const Category = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const category = CATEGORIES.find(
    (category: CategorySchema) => category.slug === slug
  );
  if (!category) return <Redirect href="/404" />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: category.name }} />

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: category.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>

      <FlatList
        data={category.products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        style={{ paddingVertical: 5 }}
        renderItem={({ item }) => (
          <View>
            <ProductListItem product={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    padding: wp(2),
    gap: wp(1),
  },
  imageContainer: {
    height: hp(30),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  categoryName: {
    fontWeight: "bold",
    fontSize: fsv(20),
  },
  flatListContent: {
    paddingBottom: wp(20),
  },
  flatListColumn: {
    justifyContent: "space-between",
    gap: 2,
  },
});
