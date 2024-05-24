import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    LoginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    container: {
        flex: 1,
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 1,
        // marginTop: '50%'
    },
    containList: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        flexWrap: "wrap",
        margin: "auto",
        marginBottom: "2%",
        padding: 10,
        width: "95%"
    },
    containListInside: {
        flex: 1,
        borderRadius: 10,
        flexWrap: "wrap",
        margin: "auto",
        marginBottom: "2%",
        padding: 10,
        width: "95%"
    },
    TextHeadline: {
        flexWrap: "wrap",
        fontWeight: "bold"
    },
    DetailText: {
        color: "#d3d3d3",
        fontWeight: "bold",
        fontSize: 15,
        opacity: 90,
        flexWrap: "wrap",
    },
    row: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",

    },
    rowButton: {
        marginTop: "6%",
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: "80%",
        textAlign: "center",
        margin: 5,
        marginBottom: "5%",
        fontSize: 20,
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
    buttonText: {
        fontSize: 30
    },
    Cancelbutton: {
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: 'red',
        alignItems: 'center',
        width: "100%",
        margin: 5,
        padding: 5
    },
    CancelbuttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: "bold"
    },
    Confirmbutton: {
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: 'green',
        alignItems: 'center',
        width: "100%",
        margin: 5,
        padding: 5
    },
    ConfirmbuttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: "bold"
    },
    header: {
        marginTop: "10%",
        fontSize: 40,
        justifyContent: "center",
        fontFamily: "serif",
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    headContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Popup: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        height:  "20%",
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: "center",
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

})

export default styles;