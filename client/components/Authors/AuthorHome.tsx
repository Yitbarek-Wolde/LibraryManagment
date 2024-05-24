import { createStackNavigator } from "@react-navigation/stack";
import AddAuthor from "./AddAuthor";
import EditAuthor from "./EditAuthor";
import AuthorList from "./AuthorList";


export default function AuthorHome(){

    const { Navigator, Screen } = createStackNavigator();
    return(
       <Navigator>
        <Screen name='AuthorList' component={AuthorList} options={{title: "Home", headerShown: false}} />
        <Screen name='Add-Author' component={AddAuthor} options={{title: "Add", headerShown: false}} />
        <Screen name='Edit-Author' component={EditAuthor} options={{title: "Edit", headerShown: false}} />
       </Navigator>
    )
}