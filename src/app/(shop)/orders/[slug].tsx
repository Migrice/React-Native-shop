import { Redirect, Stack, useLocalSearchParams } from "expo-router"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import { ORDERS } from "../../../../assets/orders"
import { fsv } from "@/utilities/responsives"
import { OrderStatus } from "../../../../assets/types/order"

const OrderDetails = () => {

    const statusDisplayText: Record<OrderStatus, string> = {
        Pending: "Pending",
        Completed: "Completed",
        Shipped: "Shipped",
        InTransit: "In Transit",
      };
    const {slug} = useLocalSearchParams<{slug: string}>()
    const order = ORDERS.find((order) => order.slug === slug)

    if (!order){
        return <Redirect href="/404" />;

    }
    
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: order?.item}}/>

            <Text style={{fontWeight:"bold", fontSize:fsv(20)}}> {order.item}</Text>
            <Text style={{fontWeight:"bold"}}> {order.details}</Text>
            <View style={[styles.statusBadge, styles[`statusBadge_${order.status}`]]}>
                <Text style={styles.statusText}>
                    {statusDisplayText[order.status]}
                </Text>
            </View>
            <Text style={{color:"gray"}}> {order.date}</Text>
            <Text style={{fontWeight:"bold", fontSize:fsv(18)}}>Items Ordered:</Text>

            <FlatList
                 data={order.items}
                 keyExtractor={item => item.id.toString()}
                 showsVerticalScrollIndicator={false}
                 contentContainerStyle={{gap:fsv(8)}}
                 renderItem={({item}) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}  resizeMode="cover" source={item.heroImage}/>
                        </View>
                        <View>
                            <Text>{item.title}</Text>
                            <Text>Price: ${item.price}</Text>
                        </View>

                    </View>
                 )}
            />

        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:fsv(16),
        backgroundColor:"#fff",
        gap: fsv(10)
    },
    statusBadge_Pending: {
    backgroundColor: "orange",
  },
  statusBadge_Completed: {
    backgroundColor: "green",
  },
  statusBadge_Shipped: {
    backgroundColor: "blue",
  },
  statusBadge_InTransit: {
    backgroundColor: "purple",
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
  },
  imageContainer:{
    width:80,
    height:80
  },
  image:{
    width:"100%",
    height:"100%",
    marginLeft:20,
    borderRadius:fsv(10)
  },
  itemContainer:{
    backgroundColor:"#EFF1F3",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:fsv(10),
    borderRadius:fsv(8)
  }
})