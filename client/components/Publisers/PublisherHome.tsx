import { createStackNavigator } from "@react-navigation/stack"
import PublisersList from "./Publisher";
import AddPublisher from "./AddPublisher";
import EditPublisher from "./EditPublisher";
 

export default function PublisherHome(){

    const { Navigator, Screen } = createStackNavigator();
    return(
       <Navigator>
        <Screen name='PublisherList' component={PublisersList} options={{title: "Home", headerShown: false}} />
        <Screen name='Add-Publisher' component={AddPublisher} options={{title: "Add", headerShown: false}} />
        <Screen name='Edit-Publisher' component={EditPublisher} options={{title: "Edit", headerShown: false}} />
       </Navigator>
    )
}