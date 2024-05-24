import { useContext, useState } from "react";
import { StyleSheet, TextInput, Pressable, Text, Alert, View } from "react-native";

import axios from "axios";
import { PublisherType } from "../../style/dbTypes";

import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../Context/context";
import SendRequest from "../../apis/apis";


export default function AddPublisher() {
    const { PublisherState, setPublisherState } = useContext(GlobalContext);
    const [publisher, setPublisher] = useState<PublisherType>({
        id: "",
        name: "",
        phone: "",
        email: "",
        address: ""
    })
    const nav = useNavigation()
    const onSubmit = async () => {
        try {
            const response = await SendRequest.PostData("publishers", publisher)
            if (response) {
                setPublisherState([...PublisherState, publisher])
                Alert.alert('', "Publisher Added",
                    [
                        {
                            text: "Done",
                            //  onPress: () => navigation.goBack()
                        },
                        {
                            text: "Add another",
                            onPress: () => { }
                        }
                    ])

            }


        } catch (error) {

        }




    }
    return (
        < View style={styles.container}>

            <TextInput placeholder="Id" style={styles.input} onChangeText={(text: string) => setPublisher({ ...publisher!, id: text })} />
            <TextInput placeholder="Name" style={styles.input} onChangeText={(text: string) => setPublisher({ ...publisher!, name: text })} />
            <TextInput placeholder="Email" style={styles.input} onChangeText={(text: string) => setPublisher({ ...publisher!, email: text })} />
            <TextInput placeholder="Phone" style={styles.input} onChangeText={(text: string) => setPublisher({ ...publisher!, phone: text })} />
            <TextInput placeholder="Address" style={styles.input} onChangeText={(text: string) => setPublisher({ ...publisher!, address: text })} />

            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => nav.goBack()}>
                <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>


        </ View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: "80%",
        margin: 5,
        fontSize: 30,
        padding: 5
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
        margin: 5
    },
    buttonCancel: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: "red",
        width: "80%",
        margin: 5
    },
    buttonText: {
        fontSize: 30
    }
})