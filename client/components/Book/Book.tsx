import { Pressable, SafeAreaView, Text, View } from "react-native";
import { BookType } from "../../style/dbTypes";
import styles from "../../style/styles";
import BookDetails from "./BookDetails";
import { useState } from "react";

interface propType {
    data: BookType,

}
export default function BookDisplay({ data }: propType) {
    const [toggle, setToggle] = useState(false)
    const onClick = () =>{
        setToggle(!toggle)
    }
    return (
        <Pressable onPress={onClick}>
        <View style={styles.containList}>
            <View style={styles.row}>
                <View  style={styles.TextHeadline}>
            
                    <Text style={styles.TextHeadline}>{data.title}</Text>
                </View>
                <View  style={styles.TextHeadline}>
              
                    <Text style={styles.TextHeadline}>{data.category}</Text>
                </View>
            </View>

          { toggle &&  <BookDetails data={data} setToggle={setToggle} />}
           
        </View>
        </Pressable>
    )
}