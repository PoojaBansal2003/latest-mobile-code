import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Image 
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import API_BASE_URL from "../config";

const CaregiverLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 const handleLogin = async () => {
  try {
    console.log(API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    navigation.navigate("HomeScreen"); // Navigate to home
    // const data = await response.json();

    // if (response.ok) {
    //   console.log("Login Successful:", data);
    //   alert("Login successful!");
    //   // Token ko local storage ya AsyncStorage me save kar sakti ho
    // } else {
    //   console.log("Login Failed:", data);
    //   alert(data.message || "Invalid credentials");
    // }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Something went wrong, please try again later.");
  }
};

  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL", err));
  };

  return (
    <View style={styles.container}>
      {/* Top Violet Section */}
      <View style={styles.topSection}>
        <View style={styles.iconContainer}>
          <Image 
            source={require("../../assets/login.jpg")} 
            style={styles.image} 
            resizeMode="cover"
          />
        </View>
      </View>

      {/* White Login Section */}
      <View style={styles.bottomSection}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* OR Section */}
        <Text style={styles.orText}>Or</Text>

        {/* Social Login Options */}
        <View style={styles.socialIcons}>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: "#DB4437" }]} 
            onPress={() => openURL("https://accounts.google.com")}
          >
            <FontAwesome name="google" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: "#1DA1F2" }]} 
            onPress={() => openURL("https://twitter.com/login")}
          >
            <FontAwesome name="twitter" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: "#1877F2" }]} 
            onPress={() => openURL("https://www.facebook.com/login")}
          >
            <FontAwesome name="facebook" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Signup Option */}
<TouchableOpacity 
  style={styles.signupContainer} 
  onPress={() => navigation.navigate("CaregiverSignupScreen")}
>
  <Text style={styles.signupText}>Don't have an account? </Text>
  <Text style={styles.signupLink}>Sign up</Text>
</TouchableOpacity>

      </View>
    </View>
  );
};

export default CaregiverLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    backgroundColor: "#800080",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    color: "#800080",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#800080",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#FFD750",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    // marginVertical: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 25
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 100,
    
  },
  signupText: {
    fontSize: 16,
    color: "#555",
  },
  signupLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
});
