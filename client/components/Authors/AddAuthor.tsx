import { useContext, useState } from "react";
import { StyleSheet, TextInput, Pressable, Text, Alert, View } from "react-native";

import axios from "axios";
import { AuthorType } from "../../style/dbTypes";

import { useNavigation } from "@react-navigation/native";
import SendRequest from "../../apis/apis";
import GlobalContext from "../Context/context";


export default function AddAuthor() {
    const nav = useNavigation()   

    const {AuthorState, setAuthorState} = useContext(GlobalContext)
    const [author, setAuthor] = useState<AuthorType>({
        id: '',
        name: '',
        phone: '',
        email: '',
     
    })

 

   

    const onSubmit = async () => {
        try {
            const response = await SendRequest.PostData("authors", author)
            if (response) {
              setAuthorState([...AuthorState, author])
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

            } else {
                Alert.alert('Failed!')
            }


        } catch (error) {

        }




    }
    return (
        < View style={styles.container}>
            <TextInput placeholder="Id" style={styles.input} onChangeText={(text: string) => setAuthor({ ...author!, id: text })} />
            <TextInput placeholder="Name" style={styles.input} onChangeText={(text: string) => setAuthor({ ...author!, name: text })} />
            <TextInput placeholder="Email" style={styles.input} onChangeText={(text: string) => setAuthor({ ...author!, email: text })} />
            <TextInput placeholder="Phone" style={styles.input} onChangeText={(text: string) => setAuthor({ ...author!, phone: text })} />
           
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