import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ListRenderItem,
  Pressable,
} from "react-native";
import { ORDERS } from "../../../../assets/orders";
import { Order, OrderStatus } from "../../../../assets/types/order";
import { Link, Stack } from "expo-router";
import { fsv, hp } from "@/utilities/responsives";

const statusDisplayText: Record<OrderStatus, string> = {
  Pending: "Pending",
  Completed: "Completed",
  Shipped: "Shipped",
  InTransit: "In Transit",
};

const renderItem: ListRenderItem<Order> = ({ item }) => (
  <Link href={`/orders/${item.slug}`} asChild>
    <Pressable>
      <View style={styles.orderContainer}>
        <View style={styles.order}>
          <Text style={styles.itemContain}>{item.item}</Text>
          <Text>{item.details}</Text>
          <Text style={{ color: "gray" }}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, styles[`statusBadge_${item.status}`]]}>
            <Text style={styles.statusText}>
                {statusDisplayText[item.status]}
            </Text>
        </View>
        </View>
    </Pressable>
  </Link>
);

const Orders = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title:"Orders"}}/>
      <FlatList
        data={ORDERS}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: fsv(20),
  },
  orderContainer: {
    backgroundColor: "white",
    height: hp(15),
    padding: fsv(15),
    borderRadius: fsv(10),
    marginHorizontal: fsv(10),
    justifyContent: "space-between",
    flexDirection:"row",
    alignItems:"center"
  },
  order:{
    gap:fsv(3)
  },
  itemContain: {
    fontWeight: "bold",
    fontSize: fsv(18),
  },
  statusBadge_Pending: {
    backgroundColor: "#ffcc00",
  },
  statusBadge_Completed: {
    backgroundColor: "#4caf50",
  },
  statusBadge_Shipped: {
    backgroundColor: "#2196f3",
  },
  statusBadge_InTransit: {
    backgroundColor: "#ff9800",
  },
  statusText:{
    color:"white",
    padding:fsv(5),
    fontSize:fsv(14),
    fontWeight:"bold"
  },
  statusBadge:{
    borderRadius:fsv(4),
    alignSelf:"flex-start"
  }
});
