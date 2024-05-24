import { useState, useContext } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput, Pressable, Text, Alert, ScrollView, View, ActivityIndicator } from "react-native";

import axios from "axios";
import { BookType } from "../../style/dbTypes";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../Context/context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SendRequest from "../../apis/apis";

export default function AddBook() {
    const nav = useNavigation()
    const { AuthorState, BookState, setBookState, CatalogState, setCatalogState, PublisherState } = useContext(GlobalContext);
    const [copies, setCopies] = useState(0)
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
   // const [checkedPublisher, setCheckedPublisher] = useState<string>('')
    const [book, setBook] = useState<BookType>({
        id: '',
        title: '',
        genre: '',
        category: '',
        authorIDs: [],
        publisherId: '',
    })

    const handleCheckboxChange = (item: string) => {
        if (checkedItems.includes(item)) {

            setCheckedItems(checkedItems.filter((value) => value !== item));
        } else {

            setCheckedItems([...checkedItems, item]);
        }
    };

    const onSubmit = async () => {
        try {
            if (!book.authorIDs.length && !book.category && !book.genre && !book.id && !book.publisherId && !book.title) {
                Alert.alert("Please Enter all fileds")
                return
            }
            const response = await SendRequest.PostData("books", book)
            if (response) {
                const newBook = BookState
                newBook.push({ ...book, authorIDs: checkedItems })
                setBookState(newBook)
                const newCat = {
                    id: "C00" + CatalogState.length,
                    bookId: book.id,
                    numberOfCopies: copies,
                    availableCopies: copies
                }
                const updateCatalog = await SendRequest.PostData("catalogs", newCat)
                if (updateCatalog) {
                    setCatalogState([...CatalogState, newCat])

                }
                Alert.alert('', "Book Added",
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

            }


        } catch (error) {

        }




    }

    if (!AuthorState[0]) {

        return <ActivityIndicator size="large" />
    }
    return (
        < View style={styles.container}>

<View style={styles.cont}>

            <TextInput placeholder="Title" style={styles.input} onChangeText={(text: string) => setBook({ ...book!, title: text })} />
            <TextInput placeholder="Catagory" style={styles.input} onChangeText={(text: string) => setBook({ ...book!, category: text })} />
            <TextInput placeholder="Genre" style={styles.input} onChangeText={(text: string) => setBook({ ...book!, genre: text })} />
            <TextInput placeholder="Id" style={styles.input} onChangeText={(text: string) => setBook({ ...book!, id: text })} />
            <TextInput placeholder="Number of Copies" style={styles.input} keyboardType="numeric" onChangeText={(text: string) => setCopies(Number(text))} />
            <View>
                <Text>Publisher</Text>
            </View>
            <View style={styles.checkInput}>

                {PublisherState.map((publisher) => (

                    <BouncyCheckbox style={styles.checkInput} key={publisher.id}
                    isChecked={publisher.id === book.publisherId}
                        onPress={() => setBook({ ...book!, publisherId: publisher.id })}
                        text={publisher.name}
                    />

                ))}</View>

            <View>
                <Text>Authors</Text>
            </View>
            <View style={styles.checkInput}>
                {AuthorState.map((author) => (

                    <BouncyCheckbox key={author.id} style={styles.checkInput}
                        isChecked={checkedItems.includes(author.id)}
                        onPress={() => handleCheckboxChange(author.id)}
                        text={author.name}
                    />


                ))}</View>

</View>
<View style={styles.bottom}>
            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => nav.goBack()}>
                <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
</View>

        </ View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    cont :{
 
        width: "100%",
        alignItems: "center",

        
        
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: "80%",
        margin: 5,
        fontSize: 30,
        padding: 5
    },
    checkInput: {

        borderColor: "black",
        borderRadius: 10,
        width: "80%",
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
        fontSize: 30,

    },
    button: {

        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
        margin: 5,
        position: "relative",
    
    },
    bottom :{
 top: "15%",
        width: "100%",
        alignItems: "center",

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
    },
    checkcontainer: {
        flex: 1,
        padding: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})