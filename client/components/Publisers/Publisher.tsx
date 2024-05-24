import { FlatList, SafeAreaView, Text, View, Pressable } from "react-native"
import styles from "../../style/styles"
import dataList from "../data"
import PublisersDisplay from "./PubliserList"
import { useContext, useState } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import GlobalContext from "../Context/context"

export default function PublisersList() {
    const {PublisherState} = useContext(GlobalContext);

    const nav = useNavigation();
    
    const ToAdd = () => {
        nav.navigate('Add-Publisher')
    }
    return (
        <SafeAreaView >
            <View style={styles.headContainer}>
                <Text style={styles.header}>Publishers</Text>
                <Text>Add Publisher</Text>
                <Pressable style={{ marginTop: "2%", marginBottom: '2%' }} onPress={ToAdd}>
                 <MaterialCommunityIcons color='green' name="plus-circle" size={35} />
                 
                    </Pressable>
            </View>

            <FlatList
                data={PublisherState}
                renderItem={({ item, index }) => <PublisersDisplay data={item} key={index} />}

            />
        </SafeAreaView>
    )
}