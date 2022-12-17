import { FlatList, StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { useContext } from "react";
import { MyBooksContext, useMyBooks } from "../context/MyBooksProvider";
import BookItem from "../components/BookItem";

export default function TabTwoScreen() {
  const { savedBooks } = useMyBooks();
  // const { test } = useContext(MyBooksContext);
  // console.log(savedBooks);

  return (
    <View style={styles.container}>
      <FlatList
        data={savedBooks}
        renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
