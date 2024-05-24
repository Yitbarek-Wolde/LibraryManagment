import { FlatList, SafeAreaView, Text, View, Pressable } from "react-native"
import styles from "../../style/styles"
import MemberDisplay from "./MemberList"
import { useContext, useState } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import GlobalContext from "../Context/context"

export default function MemberList() {
 
   const { MemberState } = useContext(GlobalContext)
   
    const nav = useNavigation()
    const ToAdd = () => {
        nav.navigate('Add-Member')
    }
    return (
        <SafeAreaView >
            <View style={styles.headContainer}>
                <Text style={styles.header}>Members</Text>
                <Text>Add Member</Text>
                <Pressable style={{ marginTop: "2%", marginBottom: '2%' }} onPress={ToAdd}>
                 <MaterialCommunityIcons color='green' name="plus-circle" size={35} />
                 
                    </Pressable>
            </View>

            <FlatList
                data={MemberState}
                renderItem={({ item, index }) => <MemberDisplay data={item} key={index} />}
            />
        </SafeAreaView>
    )
}