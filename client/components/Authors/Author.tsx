import { SafeAreaView, Text, View, Pressable, Alert } from "react-native";
import { AuthorType } from "../../style/dbTypes";
import styles from "../../style/styles";
import { useContext, useState } from "react";
import SendRequest from "../../apis/apis";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../Context/context";

interface propType {
    data: AuthorType,

}
export default function AuthorDisplay({ data }: propType) {
    const {AuthorState, setAuthorState} = useContext(GlobalContext)
    const [toggle, setToggle] = useState(false)
    const onClick = () => {
        setToggle(!toggle)
    }
    const nav = useNavigation();
    const ToEdit = () => {
        nav.navigate('Edit-Author', data)
    }

    const Delete = async () => {

        const res = await SendRequest.deleteData("authors", data.id)
        if (res! === true) {
            setAuthorState(AuthorState.filter(i => i.id !== data.id))
            Alert.alert("Author Deleted")
        } else
            Alert.alert("Unable to Delete!")
    }

    const onDelete = () => {
        Alert.alert("", "Are you sure you want to delete this Author?", [
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
        <Pressable onPress={onClick}>
            <View style={styles.containList}>
                <View style={styles.row}>
                    <View style={styles.TextHeadline}>

                        <Text style={styles.TextHeadline}>{data.name}</Text>
                    </View>
                    <View style={styles.TextHeadline}>
                        <Text style={styles.TextHeadline}>{data.phone}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.TextHeadline}>
                        <Text style={styles.TextHeadline}>{data.email}</Text>
                    </View>
                    <View style={styles.TextHeadline}>
                        <Text style={styles.TextHeadline}>ID# {data.id}</Text>
                    </View>
                </View>
                {toggle && <View style={[styles.rowButton, {justifyContent: "space-evenly"}]}>


                    <Pressable onPress={ToEdit}>
                        <MaterialCommunityIcons color="#98fb98" size={24} name="account-edit-outline" />
                        <Text style={styles.DetailText}>Edit</Text>
                    </Pressable>

                    <Pressable onPress={onDelete}>
                        <MaterialCommunityIcons color="red" size={24} name="delete" />
                        <Text style={styles.DetailText}>Delete</Text>
                    </Pressable>

                </View>}
            </View>

        </Pressable>
    )
}