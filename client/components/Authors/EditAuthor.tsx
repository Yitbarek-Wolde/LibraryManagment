import { useState, useContext } from "react";
import { StyleSheet, TextInput, Pressable, Text, Alert, View } from "react-native";

import axios from "axios";
import { AuthorType } from "../../style/dbTypes";
import GlobalContext from "../Context/context";
import { useNavigation } from "@react-navigation/native";
import SendRequest from "../../apis/apis";


export default function EditAuthor({ route }: any) {
    const nav = useNavigation()
    const {AuthorState, setAuthorState} = useContext(GlobalContext)
    const data : AuthorType = route.params;
    const [author, setAuthor] = useState<AuthorType>(data)

    const onSubmit = async () => {
        try {
            const index = AuthorState.filter( i => i.id !== author.id)
            const response = await SendRequest.EditData("authors", data.id, author)
            if (response) {
                index.push(author)
                setAuthorState(index)
                Alert.alert('', "Author Added",
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
            <TextInput placeholder={data.id} style={styles.input} onChangeText={(text: string) => setAuthor({ ...author!, id: text })} />
            <TextInput placeholder={data.name} style={styles.input} onChangeText={(text: string) => setAuthor({ ...author!, name: text })} />
            <TextInput placeholder={data.email} style={styles.input} onChangeText={(text: string) => setAuthor({ ...author!, email: text })} />
            <TextInput placeholder={data.phone} style={styles.input} onChangeText={(text: string) => setAuthor({ ...author!, phone: text })} />

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