import { useContext, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput, Pressable, Text, Alert, ScrollView, View } from "react-native";
import { BookType } from "../../style/dbTypes";

import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../Context/context";
import SendRequest from "../../apis/apis";
import BouncyCheckbox from "react-native-bouncy-checkbox";


export default function EditBook({ route }: any) {
    const data: BookType = route.params
    const { BookState, setBookState, AuthorState, PublisherState } = useContext(GlobalContext)
    const [book, setBook] = useState<BookType>(data)
    const nav = useNavigation()
    const [checkedItems, setCheckedItems] = useState<string[]>([]);


    const handleCheckboxChange = (item: string) => {

        if (checkedItems.includes(item)) {

            setCheckedItems(checkedItems.filter((value) => value !== item));
        } else {

            setCheckedItems([...checkedItems, item]);
        }
    };
    const onSubmit = async () => {
        try {
            const response = await SendRequest.EditData("books", book.id, book)
            if (response) {
                const index = BookState.filter(i => i.id !== data.id)
                index.push(book)
                setBookState(index)
                Alert.alert('', "Book Edited",
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
    return (
        < View style={styles.container}>


            <TextInput placeholder={data.title} style={styles.input} onChangeText={(text: string) => setBook({ ...book, title: text })} />
            <TextInput placeholder={data.category} style={styles.input} onChangeText={(text: string) => setBook({ ...book, category: text })} />
            <TextInput placeholder={data.genre} style={styles.input} onChangeText={(text: string) => setBook({ ...book, genre: text })} />
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
            <TextInput value={data.id} editable={false} style={styles.input} />

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
    },
    checkInput: {


        borderRadius: 10,
        width: "80%",
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
        fontSize: 30,

    }
})