import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const API_KEY =
  "sarajevo::stepzen.net+1000::56b3cf74abc045007ced50ac6a25dca4e867a99293cf41be35772e62b4afcc97";

const client = new ApolloClient({
  uri: "https://sarajevo.stepzen.net/api/killjoy-vulture/__graphql",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
