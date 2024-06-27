import { Alert, Modal, Pressable, SafeAreaView, Text, TextInput, View, StyleSheet, ScrollView } from "react-native";
import { BookType, CatalogType, MemberType } from "../../style/dbTypes";
import styles from "../../style/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SendRequest from "../../apis/apis";
import SelectDropdown from 'react-native-select-dropdown';
import GlobalContext from "../Context/context";
import axios from "axios";


interface propType {
    data: BookType,
    setToggle: (val: boolean) => void

}
export default function BookDetails({ data, setToggle }: propType) {

    const { MemberState, CatalogState, setCatalogState, BookState, setBookState } = useContext(GlobalContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState<MemberType | null>(null);

    const BorrowBook = async () => {
        try {
            const index = CatalogState.findIndex((book: CatalogType) => book.bookId === data.id)
            if (CatalogState[index].availableCopies > 0) {

                const newCatalog = { ...CatalogState[index], availableCopies: CatalogState[index].availableCopies - 1 }
                const res = await SendRequest.EditData("catalogs", CatalogState[index].id, newCatalog)
                if (res) {
                    const date = new Date()
                    const trans = {
                        id: "T" + date.getMinutes() + date.getDay() + date.getFullYear(),
                        bookId: data.id,
                        memberId: selectedValue!.id,
                        borrowedDate: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay(),
                        returnedDate: "N/A"
                    }
                    const res = await SendRequest.PostData("transactions", trans)
                    if (res) {
                        const newCataloggg = [...CatalogState, CatalogState[index] = newCatalog]
                        setCatalogState(newCataloggg)
                        Alert.alert("you got a copy")

                    }
                }
                else {
                    Alert.alert('Operation failed!')
                    alert('Operation failed!')
                }

            } else {
                Alert.alert("No available copy")
                alert("No available copy")
            }
        } catch (error) {
            console.log(error)
        }
    }


    const BorrowOrReturn = async (text: string) => {

        setModalVisible(!modalVisible)
        if (text === 'borrow') {
            // Alert.alert("Borrow")
        }
        if (text === 'Return') {
            //Alert.alert("Return")
        }

    }

    const nav = useNavigation()
    const ToEdit = () => {
        nav.navigate('Edit-book', data)
    }


    const Delete = async () => {

        const res = await SendRequest.deleteData("books", data.id)
        if (res) {
            const newStateBook = BookState.filter(i => i.id !== data.id)
            setBookState(newStateBook)
            Alert.alert("Book Deleted")
        } else
            Alert.alert("Unable to Delete!")
    }

    const onDeleteCourse = () => {
        setToggle(false)
        Alert.alert("", "Do you want to delete this Book?", [
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
        <ScrollView>
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
                                    data={MemberState}
                                    onSelect={(selectedItem: MemberType, index) => {
                                        setSelectedValue(selectedItem);

                                    }}
                                    renderButton={(selectedItem: MemberType, isOpened) => (
                                        <View style={stylesDropDown.dropdownButtonStyle}>
                                            <Text style={stylesDropDown.dropdownButtonTextStyle}>
                                                {'Select Member'}
                                            </Text>
                                        </View>
                                    )}
                                    renderItem={(item: MemberType, index, isSelected) => (
                                        <View
                                            style={[
                                                stylesDropDown.dropdownItemStyle,
                                                isSelected && { backgroundColor: '#D2D9DF' },
                                            ]}
                                        >
                                            <Text style={stylesDropDown.dropdownItemTextStyle}>{item.firstname} {item.lastname}</Text>
                                        </View>
                                    )}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={stylesDropDown.dropdownMenuStyle}
                                />
                                {selectedValue && (
                                    <Text style={stylesDropDown.selectedValueText}>Selected: {selectedValue.firstname}</Text>
                                )}
                            </View>







                            <View style={styles.row}>
                                <View style={{ marginRight: "5%" }}>
                                    <Pressable style={styles.Confirmbutton}
                                        onPress={BorrowBook}>
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


            <View style={styles.containListInside}>
                <View style={styles.row}>

                    <View>
                        <Text style={styles.DetailText}>  Id</Text>
                        <Text>#{data.id}</Text>
                    </View>

                    <View>
                        <Text style={styles.DetailText}>Genre</Text>
                        <Text>{data.genre}</Text>
                    </View>

                    <View>
                        <Text style={styles.DetailText}>Publisher</Text>
                        <Text>#{data.publisherId}</Text>
                    </View>


                </View>
                <View style={styles.rowButton}>
                    <Text style={styles.DetailText}>Authors</Text>
                    {data.authorIDs.map((author, index) => (

                        <Text key={index}>{author}</Text>

                    ))}
                </View>
                <View>
                    <View style={styles.rowButton}>

                        <Pressable onPress={() => BorrowOrReturn("borrow")}>
                            <MaterialCommunityIcons color="#ffa500" size={24} name="book-minus" />
                            <Text style={styles.DetailText}>Borrow</Text>
                        </Pressable>



                        <Pressable onPress={ToEdit}>
                            <MaterialCommunityIcons color="#98fb98" size={24} name="book-edit" />
                            <Text style={styles.DetailText}>Edit</Text>
                        </Pressable>

                        <Pressable onPress={onDeleteCourse}>
                            <MaterialCommunityIcons color="red" size={24} name="delete" />
                            <Text style={styles.DetailText}>Delete</Text>
                        </Pressable>
                    </View>
                </View>



                {/* <Text>{data.authorIDs}</Text>
            
            
            */}
            </View>


        </ScrollView>
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