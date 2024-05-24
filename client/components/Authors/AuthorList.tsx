import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native"
import styles from "../../style/styles"
import dataList from "../data"
import AuthorDisplay from "./Author"
import { useContext, useState } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"
import GlobalContext from "../Context/context"

export default function AuthorList() {
    const {AuthorState} = useContext(GlobalContext);
     
    const nav = useNavigation();

    const ToAdd = () => {
        nav.navigate('Add-Author')
    }
    return (
        <SafeAreaView >
            <View style={styles.headContainer}>
                <Text style={styles.header}>Authors</Text>
                <Text>Add Author</Text>
                <Pressable style={{ marginTop: "2%", marginBottom: '2%' }} onPress={ToAdd}>
                 <MaterialCommunityIcons color='green' name="plus-circle" size={35} />
                 
                    </Pressable>
            </View>

            <FlatList
                data={AuthorState}
                renderItem={({ item, index }) => <AuthorDisplay data={item} key={index} />}
            />
        </SafeAreaView>
    )
}