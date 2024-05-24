import { useContext, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput, Pressable, Text, Alert, ScrollView, View } from "react-native";

import axios from "axios";
import { MemberType } from "../../style/dbTypes";
import dataList from "../data";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../Context/context";
import SendRequest from "../../apis/apis";


export default function EditMember({ route }: any) {
    const data: MemberType = route.params
    const { MemberState, setMemberState } = useContext(GlobalContext);
    const [member, setMember] = useState<MemberType>(data)
    const nav = useNavigation()
    const onSubmit = async () => {
        try {
            const response = await SendRequest.EditData("members", member.id, member)
            if (response) {
                const index = MemberState.filter(i => i.id !== member.id)
                index.push(member)
                setMemberState(index)
                Alert.alert('', "Member Edited",
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
                Alert.alert("Failed")
            }


        } catch (error) {

            console.log(error)

        }




    }
    return (
        < View style={styles.container}>


            <TextInput placeholder={data.firstname} style={styles.input} onChangeText={(text: string) => setMember({ ...member!, firstname: text })} />
            <TextInput placeholder={data.lastname} style={styles.input} onChangeText={(text: string) => setMember({ ...member!, lastname: text })} />
            <TextInput placeholder={data.email} style={styles.input} onChangeText={(text: string) => setMember({ ...member!, email: text })} />
            <TextInput placeholder={data.phone} style={styles.input} onChangeText={(text: string) => setMember({ ...member!, phone: text })} />
            <TextInput placeholder={data.address} style={styles.input} onChangeText={(text: string) => setMember({ ...member!, address: text })} />

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