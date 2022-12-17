import {
  ActivityIndicator,
  FlatList,
  TextInput,
  Button,
} from "react-native";

import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import BookItem from "../../components/BookItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchQuery } from "./queries";
import { parseBook } from "../../services/bookService";
import styles from "./styles";

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"Search Library">) {
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<BookProvider>("googleBooksSearch");
  const [runQuery, { data, loading, error }] = useLazyQuery(searchQuery);

  // console.log(JSON.stringify(data, null, 2));
  // console.log(data)
  // console.log(loading)
  // console.log(error);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />
        <Button
          title="Search"
          onPress={() =>
            runQuery({
              variables: { q: search },
            })
          }
        />
      </View>
      <View style={styles.tabs}>
        <Text
          style={
            provider === "googleBooksSearch"
              ? { fontWeight: "bold", color: "royalblue" }
              : {}
          }
          onPress={() => setProvider("googleBooksSearch")}
        >
          Google Library Books
        </Text>
        <Text
          style={
            provider === "openLibrarySearch"
              ? { fontWeight: "bold", color: "royalblue" }
              : {}
          }
          onPress={() => setProvider("openLibrarySearch")}
        >
          Open Library
        </Text>
      </View>
      {loading && <ActivityIndicator />}
      {error && (
        <View style={styles.container}>
          <Text style={styles.title}>Error fetching books</Text>
          <Text>{error.message}</Text>
        </View>
      )}
      <FlatList
        data={
          (provider === "googleBooksSearch"
            ? data?.googleBooksSearch?.items
            : data?.openLibrarySearch?.docs) || []
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BookItem book={parseBook(item)} />}
      />
    </SafeAreaView>
  );
}

// export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>HELLO WORLD- first tab</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="/screens/TabOneScreen.tsx" />
//     </View>
//   );
// }
