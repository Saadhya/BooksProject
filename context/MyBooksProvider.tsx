import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MyBooksContextType = {
  onToggleSaved: (book: Book) => void;
  isBookSaved: (book: Book) => boolean;
  savedBooks: Book[];
};

export const MyBooksContext = createContext<MyBooksContextType>({
  onToggleSaved: () => {},
  isBookSaved: () => {},
  savedBooks: [],
});

type Props = {
  children: ReactNode;
};

const MyBooksProvider = ({ children }: Props) => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  // const [currentlyReading, setCurrentlyReading] = useState<Book[]>([]); //persist data 
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData(); //load the data when components mounts
  }, []);

  useEffect(() => {
    if (loaded) {
      persistData();
    }
  }, [savedBooks]); //persist data everytime we want to change

  const areBooksSame = (a: Book, b: Book) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const isBookSaved = (book: Book) => {
    return savedBooks.some((savedBook) => areBooksSame(savedBook, book));
  };
  const onToggleSaved = (book: Book) => {
    if (isBookSaved(book)) {
      // remove from saved
      setSavedBooks((books) =>
        books.filter((savedBook) => !areBooksSame(savedBook, book))
      );
    } else {
      // add to saved
      setSavedBooks((books) => [book, ...books]);
    }
  };

  // write data to local storage
  const persistData = async () => {
    await AsyncStorage.setItem("booksData", JSON.stringify(savedBooks));
  };
  // read data from our local storage
  const loadData = async () => {
    const dataString = await AsyncStorage.getItem("booksData");
    if (dataString) {
      const items = JSON.parse(dataString);
      setSavedBooks(items);
    }
    setLoaded(true);
  };

  return (
    <MyBooksContext.Provider value={{ onToggleSaved, isBookSaved, savedBooks }}>
      {children}
    </MyBooksContext.Provider>
  );
};
export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;
