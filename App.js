import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// home page with button
function HomeScreen({ navigation }) {

  return (
    <View style={{ backgroundColor: "black", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text></Text>
      <Button
        title="Playlist"
        onPress={() => navigation.navigate('Playlist')}
      />
    </View>
  );
}


// playlist page with api fetch
function PlaylistScreen({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://afternoon-waters-49321.herokuapp.com/v1/browse/featured-playlists')
      .then((response) => response.json())
      .then((json) => setData(json.playlists.items))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ backgroundColor: "black", flex: 1, alignItems: 'center', alignContent: 'space-around' }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          numColumns={ 2 }
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.images[0].url }}
              style={{ width:150, height:150 }}
            />
          )}
        />
      )}
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}


const Stack = createStackNavigator();


// App function. Title and Routes definition
function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: 'black',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'RN-Player-APP',
          }}
        />
        <Stack.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{
            title: "Editor's Pick",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;