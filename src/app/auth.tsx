import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fsv, wp } from "@/utilities/responsives";
import React from "react";
import { supabase } from "@/lib/supabase";
import { Toast } from "react-native-toast-notifications";
import { Redirect } from "expo-router";

const authSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const Auth = () => {
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = async(data: zod.infer<typeof authSchema>) => {

    const {data: {session}, error} = await supabase.auth.signInWithPassword(data)

    if (error) {
      Alert.alert(error.message)}
    else {
      Toast.show("Sign In successfully", {
        type: "success", 
        placement: "top"
      })
      reset()
    }

    console.log(data);
    reset()
  };
  const  signUp = async(data: zod.infer<typeof authSchema>) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (error) {
      Alert.alert(error.message)}
    else {
      Toast.show("Sign Up successfully", {
        type: "success", 
        placement: "top",
        duration: 1500,
        
      })
      
      reset()

    }
    console.log(data);
  
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Please Authenticate to continue</Text>

          <Controller
            control={control}
            name="email"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  placeholder="email"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderTextColor="#aaa"
                  editable={!formState.isSubmitting}
                  autoCapitalize="none"
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
          
          <Controller
            control={control}
            name="password"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderTextColor="#aaa"
                  editable={!formState.isSubmitting}
                  secureTextEntry
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit(signIn)} disabled={formState.isSubmitting}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSubmit(signUp)} disabled={formState.isSubmitting}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>


        </View>
      </View>
    </ImageBackground>
  );
};

export default Auth;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: fsv(16),
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: fsv(30),
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#ddd",
    marginBottom: 32,
    fontSize: fsv(16),
  },
  input:{
    backgroundColor:"rgba(255,255,255,0.9)",
    width: wp(90),
    padding:fsv(12),
    borderRadius:fsv(8),
    fontSize:fsv(16),
    color:"#000",
    marginBottom:fsv(16)
  },
  error:{
    color:"red",
    fontSize:fsv(12),
    marginBottom:fsv(16),
    textAlign:"left",
    width:wp(90)
  },
  button:{
    width:wp(90),
    alignItems:"center",
    justifyContent:'center',
    borderRadius:fsv(8),
    padding:fsv(14),
    marginBottom:fsv(16),
    backgroundColor:"#6a1b9a"
  },
  buttonText:{
    color:"white",
    fontWeight:"bold",
    fontSize:fsv(16)
  },
  signUpButton:{
    borderWidth:1,
    borderStyle:"solid",
    borderColor:"white",
    backgroundColor:"transparent"
  },
  
});
