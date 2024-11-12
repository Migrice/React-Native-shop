import { StyleSheet, View, Text, FlatList } from "react-native";
import { PRODUCTS } from "../../../assets/products";

import { ProductListItem } from "../../components/product-list-item";
import { wp } from "@/utilities/responsives";
import ListHeader from "@/components/list-header";

const Home = () => {
  return (
  
    <View>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        renderItem={({ item }) => (
          <View>
            <ProductListItem product={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: wp(20),
  },
  flatListColumn: {
    justifyContent: "space-between",
    gap: wp(1),
  },
});
