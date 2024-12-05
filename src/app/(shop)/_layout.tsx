import { Redirect, Tabs } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "@/providers/auth-provider";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}){
  return <FontAwesome size={24} {...props} style={{color:"#1BC464"}}/>
}

const TabsLayout = () => {

  const {session, mouting, user} = useAuth()

  if (mouting) return <ActivityIndicator/>
  if (!session) return <Redirect href="/auth"/>
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor:"#1BC464",
          tabBarInactiveTintColor:"gray",
          tabBarLabelStyle:{fontSize:16},
          
          tabBarStyle:{
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            paddingTop:10, 
            paddingBottom:5,
            height:65
          },
          headerShown:false
        }}
      >
        <Tabs.Screen name="index" options={{
          title:"Shop",
            tabBarIcon(props){
              return <TabBarIcon {...props} name="shopping-cart" />
            }
         }} />
        <Tabs.Screen name="orders" options={{
          title:"Orders",
          tabBarIcon(props){
            return <TabBarIcon {...props} name="book" />
          }

        }} />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea:{
    flex:1, 
  }

})
