import { Alert, Modal, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { BookType, MemberType } from "../../style/dbTypes";
import styles from "../../style/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SendRequest from "../../apis/apis";
import GlobalContext from "../Context/context";

interface propType {
    data: MemberType,

}
export default function MemberDetails({ data }: propType) {
const {MemberState, setMemberState} = useContext(GlobalContext)

    const nav = useNavigation();
    const ToEdit = () => {
        nav.navigate('Edit-Member', data)
    }


    const Delete = async () => {
        const res = await SendRequest.deleteData("members", data.id)
        if (res) {
            setMemberState(MemberState.filter( i => i.id !== data.id))
            Alert.alert("Member Deleted")
        } else
            Alert.alert("Unable to Delete!")
    }

    const onDelete = () => {
        Alert.alert("", "Are you sure you want to delete this Member?", [
            {
                text: "Cancel",
                onPress: () => { }
            },
            {
                text: "Delete",
                onPress: Delete
            }
        ]);
    };


    return (
        <View>

            <View style={styles.containListInside}>
                <View style={styles.row}>

                    <View>
                        <Text style={styles.DetailText}>Email</Text>
                        <Text> {data.email} </Text>
                    </View>

                    <View>
                        <Text style={styles.DetailText}>Phone</Text>
                        <Text># {data.phone}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.DetailText}>Address</Text>
                        <Text>{data.address} </Text>
                    </View>
                </View>

            </View>
         

            <View style={[styles.rowButton, {justifyContent: "space-evenly"}]}>


                <Pressable onPress={ToEdit}>
                    <MaterialCommunityIcons color="#98fb98" size={24} name="account-edit-outline" />
                    <Text style={styles.DetailText}>Edit</Text>
                </Pressable>

                <Pressable onPress={onDelete}>
                    <MaterialCommunityIcons color="red" size={24} name="delete" />
                    <Text style={styles.DetailText}>Delete</Text>
                </Pressable>

            </View>



        </View>


  
    )
}