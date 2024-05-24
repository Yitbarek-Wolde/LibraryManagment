import LoginUser from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SendRequest from './apis/apis';
import BookHome from './components/Book/BookHome';
import GlobalContext from './components/Context/context';
import { BookType, RootType, PublisherType, AuthorType, CatalogType, MemberType } from './style/dbTypes';
import dataList from './components/data';
import MemberHome from './components/Members/MemberHome';
import PublisherHome from './components/Publisers/PublisherHome';
import AuthorHome from './components/Authors/AuthorHome';
import { ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const { Navigator, Screen } = createBottomTabNavigator();
  
  const [BookState, setBookState] = useState<BookType[]>(dataList.books)
  const [PublisherState, setPublisherState] = useState<PublisherType[]>(dataList.publishers)
  const [AuthorState, setAuthorState] = useState<AuthorType[]>(dataList.authors)
  const [CatalogState, setCatalogState] = useState<CatalogType[]>(dataList.catalogs)
  const [MemberState, setMemberState] = useState<MemberType[]>(dataList.members)
  const [loading, setLoading] = useState(true);

  
  const [login, setLoggedIn] = useState(false)

  useEffect(() => {
    async function loadData(){
      try {
        setLoading(true);
        const data = await AsyncStorage.getItem('loginKey');
        if(data){
          const obj = JSON.parse(data);
          setLoggedIn(obj.loggedIn);
        }
        const Book = await SendRequest.getData('books');
        const Publisher = await SendRequest.getData('publishers');
        const Author = await SendRequest.getData('authors');
        const Catalog = await SendRequest.getData('catalogs');
        const Member = await SendRequest.getData('members');
        setMemberState(Member)
        setCatalogState(Catalog)
        setAuthorState(Author)
        setPublisherState(Publisher)
        setBookState(Book);
      } catch (error) {

        Alert.alert("Somthing went wrong!")
        
      }
      setLoading(false);
    }
    loadData()
  }, [login]);

  if(loading){
    return <ActivityIndicator size={"large"}/>
  }

  if (!login) {
    return <LoginUser setLoggedIn={setLoggedIn}/>
  }



  return (
    <GlobalContext.Provider value={{

      BookState,
      PublisherState,
      AuthorState,
      CatalogState,
      MemberState, setBookState, setLoggedIn, setPublisherState,setAuthorState, setCatalogState, setMemberState
    }}>
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen
            name="home"
            component={BookHome}
            options={{
              title: "Books",
              tabBarIcon: ({ color }) =>
                <MaterialCommunityIcons color={color} size={24} name="bookshelf" />
            }}
          />
          <Screen
            name="author"
            component={AuthorHome}
            options={{
              title: "Authors",
              tabBarIcon: ({ color }) =>
                <MaterialCommunityIcons color={color} size={24} name="account-edit" />
            }}
          />
          <Screen
            name="member"
            component={MemberHome}
            options={{
              title: "Members",
              tabBarIcon: ({ color }) =>
                <MaterialCommunityIcons color={color} size={24} name="card-account-details-star" />
            }}
          />
          <Screen
            name="publisher"
            component={PublisherHome}
            options={{
              title: "Publisher",
              tabBarIcon: ({ color }) =>
                <MaterialCommunityIcons color={color} size={24} name="book" />
            }}
          />
        </Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

