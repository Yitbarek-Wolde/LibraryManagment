import { SafeAreaView, Text, View, Pressable } from "react-native";
import { MemberType } from "../../style/dbTypes";
import styles from "../../style/styles";
import { useState } from "react";
import MemberDetails from "./MembersDetails";

interface propType {
    data: MemberType,

}
export default function MemberDisplay({ data }: propType) {
    const [toggle, setToggle] = useState(false)
    const onClick = () => {
        setToggle(!toggle)
    }
    return (
        <Pressable onPress={onClick}>
            <View style={styles.containList}>
                <View style={styles.row}>
                    <View style={styles.TextHeadline}>
                        <Text>{data.firstname}  {data.lastname}</Text>
                    </View>
                    <View style={styles.TextHeadline}>
                        <Text>{data.id}</Text>
                    </View>
                    <View style={styles.TextHeadline}>
                        <Text>{data.residentID}</Text>
                    </View>
                </View>
                {toggle && <MemberDetails data={data} />}
            </View>
        </Pressable>
    )
}