// import { useColorScheme } from 'react-native';
//     import { ThemeProvider } from '@emotion/react'; // Here is the change
    
//     const darkTheme = {
//       background: "#1A1A1A",
//       foreground: "#FAFAFA"
//     };
    
//     const lighTheme = {
//       background: "#FAFAFA",
//       foreground: "#1A1A1A",
//     };
    
//     const App: React.FC = () => {
//       const scheme = useColorScheme();
//       return (
//         <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
//           {props.children}
//         </ThemeProvider>
//       );
//     }
    
//     export default App;