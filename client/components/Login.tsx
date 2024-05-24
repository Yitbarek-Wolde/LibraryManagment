import { Alert, KeyboardAvoidingView, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import styles from "../style/styles";
import { useState } from "react";
import SendRequest from "../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header.ios";

interface prop {
    setLoggedIn: (login: boolean) => void;
}

export default function LoginUser({ setLoggedIn }: prop) {
    const [email, setEmail] = useState("");
    const onLogin = async () => {
        try {
            if (email.trim() === "") {
                return Alert.alert("Please enter email");
            }
            const res = await SendRequest.isAUser(email);
            if (res) {
                await AsyncStorage.setItem("loginKey", JSON.stringify({ loggedIn: true }))
                setLoggedIn(true);
            } else {
                return Alert.alert("Wrong email");
            }
        } catch (error) { }
    };

    return (
        < View style={styles.LoginContainer}>
            <Header />
            <TextInput placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize="none"
                style={styles.input} />
            <Pressable style={styles.button} onPress={onLogin}>
                <Text style={styles.buttonText}>
                    Login
                </Text>
            </Pressable>
        </ View>
    )
}

