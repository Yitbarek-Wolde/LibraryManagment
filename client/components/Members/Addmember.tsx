import { useContext, useState } from "react";
import { StyleSheet, TextInput, Pressable, Text, Alert, View } from "react-native";

import axios from "axios";
import {  MemberType } from "../../style/dbTypes";
 
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../Context/context";
import SendRequest from "../../apis/apis";


export default function AddMember() {
const {MemberState, setMemberState} = useContext(GlobalContext);
    const [member, setMember] = useState<MemberType>({ id: '',
    residentID: '',
    firstname: '',
    lastname: '',
    address: '',
    phone: '',
    email: '',
  })
const nav = useNavigation()
    const onSubmit = async () => {
        try {
            const response = await SendRequest.PostData("members", member)
            if (response) {
                setMemberState([...MemberState, member])
                Alert.alert('', "Member Added",
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

<TextInput placeholder="Firstname" style={styles.input} onChangeText={(text: string) => setMember({ ...member!, firstname: text })} />
            <TextInput placeholder="Lastname" style={styles.input} onChangeText={(text: string) => setMember({ ...member!, lastname: text })} />
            <TextInput placeholder="Email" style={styles.input} onChangeText={(text: string) => setMember({ ...member!, email: text })} />
            <TextInput placeholder="Phone" style={styles.input} onChangeText={(text: string) => setMember({ ...member!, phone: text })} />
            <TextInput placeholder="Address" style={styles.input} onChangeText={(text: string) => setMember({ ...member!, address: text })} />
            <TextInput placeholder="Id" style={styles.input} onChangeText={(text: string) => setMember({ ...member!, id: text })} />
            <TextInput placeholder="Resident ID" style={styles.input} onChangeText={(text: string) => setMember({ ...member!, residentID: text })} />
                <Pressable style={styles.button} onPress={onSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={()=>nav.goBack()}>
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
        color:"red",
        width: "80%",
        margin: 5
    },
    buttonText: {
        fontSize: 30
    }
})