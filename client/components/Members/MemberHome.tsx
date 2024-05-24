import { createStackNavigator } from "@react-navigation/stack"
import EditMember from "./EditMember";
import MemberList from "./Member";
import AddMember from "./Addmember";


export default function MemberHome(){

    const { Navigator, Screen } = createStackNavigator();
    return(
       <Navigator>
        <Screen name='MemberList' component={MemberList} options={{title: "Home", headerShown: false}} />
        <Screen name='Add-Member' component={AddMember} options={{title: "Add", headerShown: false}} />
        <Screen name='Edit-Member' component={EditMember} options={{title: "Edit", headerShown: false}} />
       </Navigator>
    )
}