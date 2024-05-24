import { FlatList, Pressable, SafeAreaView, Text, TextInput, View, Modal, StyleSheet } from "react-native"
import styles from "../../style/styles"
import dataList from "../data"
import BookDisplay from "./Book"
import { useContext, useEffect, useState } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import SelectDropdown from 'react-native-select-dropdown';

import GlobalContext from "../Context/context"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { CatalogType, TransactionType } from "../../style/dbTypes"
import SendRequest from "../../apis/apis"


export default function BookList() {
    const { BookState, setLoggedIn, CatalogState, setCatalogState } = useContext(GlobalContext);
    const [display, setDisplay] = useState(BookState);
    const [modalVisible, setModalVisible] = useState(false);
    const [transState, setTransState] = useState<TransactionType[]>([])
    const [selectedValue, setSelectedValue] = useState<TransactionType | null>(null);


    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setDisplay(BookState)
    }, [BookState])
    const nav = useNavigation()
    const onSearch = (text: string) => {

        const arr = BookState.filter(x =>
            x.title.toLowerCase().includes(text.trim().toLowerCase())
        );
        setDisplay(arr);
        setSearchText(text);
    };

    const ToAdd = () => {
        nav.navigate('Add-book')
    }
    const onLogout = async () => {
        try {
            await AsyncStorage.removeItem('loginKey');
            setLoggedIn(false);
        } catch (error) {

        }
    }
    const BorrowOrReturn = async () => {
        setModalVisible(!modalVisible)
        try {
            const res: TransactionType[] = await SendRequest.getData("transactions")
            if (res.length > 0) {
                setTransState(res)
                //     setTransState(res.data.filter((i: TransactionType) => i.returnedDate !== "N/A"))


            }
        } catch (error) {

        }
    }

    const onReturn = async () => {
        try {
            const date = new Date()
            const updateTrans = { ...selectedValue, returnedDate: date.getFullYear + "-" + date.getMonth + "-" + date.getDay }
            const res = await SendRequest.EditData("transactions", selectedValue!.id, updateTrans)
            if (res) {
                const index = CatalogState.findIndex((book: CatalogType) => book.bookId === selectedValue?.bookId)
                const newCatalog = { ...CatalogState[index], availableCopies: CatalogState[index].availableCopies + 1 }
                const res = await SendRequest.EditData(" catalogs", CatalogState[index].id, newCatalog)
                if (res) {
                    setTransState([])
                }

            }
        } catch (error) {
            console.log(error)

        }
    }



    return (
        <SafeAreaView >

            <View style={styles.Popup}>
                <Modal

                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}
                ><View style={styles.Popup}>
                        <View style={styles.modalView}>





                            <View style={stylesDropDown.container}>
                                <SelectDropdown
                                    data={transState}
                                    onSelect={(selectedItem: TransactionType, index) => {
                                        setSelectedValue(selectedItem);

                                    }}
                                    renderButton={(selectedItem: TransactionType, isOpened) => (
                                        <View style={stylesDropDown.dropdownButtonStyle}>
                                            <Text style={stylesDropDown.dropdownButtonTextStyle}>
                                                {'Select Member'}
                                            </Text>
                                        </View>
                                    )}
                                    renderItem={(item: TransactionType, index, isSelected) => (
                                        <View
                                            style={[
                                                stylesDropDown.dropdownItemStyle,
                                                isSelected && { backgroundColor: '#D2D9DF' },
                                            ]}
                                        >
                                            <Text style={stylesDropDown.dropdownItemTextStyle}>Title: {BookState[BookState.findIndex( i => i.id === item.bookId)].title} BookID: {item.bookId}  MemberID:{item.memberId}</Text>
                                        </View>
                                    )}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={stylesDropDown.dropdownMenuStyle}
                                />
                                {selectedValue && (
                                    <Text style={stylesDropDown.selectedValueText}>TransID: {selectedValue.id}</Text>
                                )}
                            </View>







                            <View style={styles.row}>
                                <View style={{ marginRight: "5%" }}>
                                    <Pressable style={styles.Confirmbutton}
                                        onPress={onReturn}>
                                        <Text style={styles.CancelbuttonText}>Confirm</Text>
                                    </Pressable></View>

                                <View>
                                    <Pressable style={styles.Cancelbutton}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.CancelbuttonText}>Cancel</Text>
                                    </Pressable></View></View>
                        </View>
                    </View>
                </Modal>
            </View>


            <View style={styles.headContainer} >

                <Text style={styles.header}>Books</Text>
                <View style={styles.row}>
                    <View>
                        <Pressable onPress={() => BorrowOrReturn()}>
                            <MaterialCommunityIcons color="green" size={24} name="book-plus" />
                            <Text style={styles.DetailText}>Return</Text>
                        </Pressable></View>
                    <View>
                        <TextInput style={styles.input} placeholder="Search by title" value={searchText} onChangeText={onSearch} /></View>
                    <View>
                        <Pressable style={{ marginTop: "2%" }} onPress={ToAdd}>
                            <MaterialCommunityIcons color='green' name="plus-circle" size={35} />
                        </Pressable></View>


                </View>
                <Pressable style={styles.Cancelbutton} onPress={onLogout}>
                    <Text style={styles.CancelbuttonText}>Logout</Text>
                </Pressable>
            </View>
            <FlatList
                data={display}
                renderItem={({ item, index }) => <BookDisplay data={item} key={item.id} />}
            />
        </SafeAreaView>
    )
}

const stylesDropDown = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTextStyle: {

    },
    dropdownItemStyle: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    dropdownItemTextStyle: {

    },
    dropdownMenuStyle: {

    },

    selectedValueText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
    }
});