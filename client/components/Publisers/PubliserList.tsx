import { SafeAreaView, Text, View, Pressable, Alert } from "react-native";
import { PublisherType } from "../../style/dbTypes";
import styles from "../../style/styles";
import { useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SendRequest from "../../apis/apis";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../Context/context";

interface propType {
    data: PublisherType,

}
export default function PublisersDisplay({ data }: propType) {
    const [toggle, setToggle] = useState(false)
    const {PublisherState, setPublisherState} = useContext(GlobalContext);

    const nav = useNavigation();
    const ToEdit = () => {
        nav.navigate('Edit-Publisher', data)
    }


    const Delete = async () => {
        const res = await SendRequest.deleteData("publishers", data.id)
        if (res! === true) {
            setPublisherState(PublisherState.filter(i => i.id !== data.id))
            Alert.alert("Publisher Deleted")
        } else
            Alert.alert("Unable to Delete!")
    }

    const onDelete = () => {
        Alert.alert("", "Are you sure you want to delete this Publisher?", [
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
    const onClick = () => {
        setToggle(!toggle)
    }
    return (
        <Pressable onPress={onClick}>
            <View style={styles.containList}>
                <View style={styles.row}>
                    <View style={styles.TextHeadline}>

                        <Text style={styles.TextHeadline}>{data.name}</Text>
                    </View>
                    <View style={styles.TextHeadline}>
                        <Text style={styles.TextHeadline}>ID# {data.id}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.TextHeadline}>
                        <Text style={styles.DetailText}>Email</Text>
                        <Text style={styles.TextHeadline}>{data.email}</Text>
                    </View>
                    <View style={styles.TextHeadline}>
                        <Text style={styles.DetailText}>Phone</Text>
                        <Text style={styles.TextHeadline}>{data.phone}</Text>

                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.TextHeadline}>
                        <Text style={styles.DetailText}>Address</Text>
                        <Text style={styles.TextHeadline}>{data.address}</Text>
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