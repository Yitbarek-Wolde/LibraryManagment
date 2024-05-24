import { useContext, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput, Pressable, Text, Alert, ScrollView, View } from "react-native";

import axios from "axios";
import { PublisherType } from "../../style/dbTypes";

import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../Context/context";
import SendRequest from "../../apis/apis";


export default function EditPublisher({ route }: any) {
    const data: PublisherType = route.params;
    const {PublisherState, setPublisherState} = useContext(GlobalContext);
    const [publisher, setPublisher] = useState<PublisherType>(data)
    const nav = useNavigation()
    const onSubmit = async () => {
        try {

            const response = await SendRequest.EditData("publishers", publisher!.id, publisher)
            if (response) {
                const index = PublisherState.filter( i => i.id === publisher.id)
                index.push(publisher)
                setPublisherState(index)
                Alert.alert('', "Publisher Edited",
                    [
                        {
                            text: "Done",
                            onPress: () => nav.goBack()
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

            <TextInput placeholder={data.id} style={styles.input} editable={false} />
            <TextInput placeholder={data.name} style={styles.input} onChangeText={(text: string) => setPublisher({ ...publisher!, name: text })} />
            <TextInput placeholder={data.email} style={styles.input} onChangeText={(text: string) => setPublisher({ ...publisher!, email: text })} />
            <TextInput placeholder={data.phone} style={styles.input} onChangeText={(text: string) => setPublisher({ ...publisher!, phone: text })} />
            <TextInput placeholder={data.address} style={styles.input} onChangeText={(text: string) => setPublisher({ ...publisher!, address: text })} />

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