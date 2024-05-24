import { createStackNavigator } from "@react-navigation/stack"
import BookList from "./BookList";
import AddBook from "./AddBook";
import EditBook from "./EditBook";


export default function BookHome(){

    const { Navigator, Screen } = createStackNavigator();
    return(
       <Navigator>
        <Screen name='BookList' component={BookList} options={{title: "Home", headerShown: false}} />
        <Screen name='Add-book' component={AddBook} options={{title: "Add", headerShown: false}} />
        <Screen name='Edit-book' component={EditBook} options={{title: "Edit", headerShown: false}} />
       </Navigator>
    )
}