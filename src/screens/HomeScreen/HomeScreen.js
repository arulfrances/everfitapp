import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, StatusBar, ImageBackground } from 'react-native';
import { CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import styles from './styles';
import benchpress from '../../../assets/benchpress.png';
import cycling from '../../../assets/cycling.png';
import dumbbells from '../../../assets/dumbbells.png';
import supportpress from '../../../assets/supportpress.png';
import warmup from '../../../assets/warmup.png';
import { firebase } from '../../firebase/config';
import { Card, Button, Title, Paragraph, IconButton } from 'react-native-paper';
import { Assets } from '@react-navigation/stack';


export default function HomeScreen(props) {


  const [entityText, setEntityText] = useState('')
  const [entities, setEntities] = useState([])

  const entityRef = firebase.firestore().collection('entities')

  const userStore = firebase.firestore().collection('users')

  const user = firebase.auth().currentUser;


      user.providerData.forEach((userInfo) => {
        console.log('User info for provider: ', userInfo);
        //Working Logic for Username update
      //  user.updateProfile({displayName: 'Arul Frances'})

        console.log(user.displayName);
      });


  console.log(user.email);


  const userID = props.extraData.id

  useEffect(() => {
    entityRef
      .where("authorID", "==", userID)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        querySnapshot => {
          const newEntities = []
          querySnapshot.forEach(doc => {
            const entity = doc.data()
            entity.id = doc.id
            newEntities.push(entity)
          });
          setEntities(newEntities)
        },
        error => {
          console.log(error)
        }
      )


  }, [])

  const signOutUser = () => firebase.auth().signOut().then(function () {
    navigation.navigate('Registration');
}).catch(function (error) {
    alert(error)
});



  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
      };
      entityRef
        .add(data)
        .then(_doc => {
          setEntityText('')
          Keyboard.dismiss()
        })
        .catch((error) => {
          alert(error)
        });
    }
  }

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
        </Text>
      </View>
    )
  }

  return (<ScrollView style={{ paddingVertical: 10, backgroundColor: '#dcedc8' }}>

<View>
<Text style={{position: 'absolute', right: 10, fontWeight: 'bold' }}>Logout</Text>
</View>

  <View style={styles.container}>

    <Text style={ styles.titleText }>Welcome, { user.email} </Text>
</View>

    <View>
    <Text style={styles.titleText}> {user.displayName}</Text>
<Text style={styles.titleText}>
    {user.phoneNumber}
    </Text>
  </View>
  

{/* <View style={styles.button}>
    
      <Button size="small" onClick={() => { signOutUser} }>Log Out</Button>

    </View>  */ }
    <View style={{ padding: 20 }}>
      <Card style={{
        padding: 20, elevation: 5,
        shadowColor: "#000", margin: 20, backgroundColor: '#009688',
      }}>
        <CardImage style={{ padding: 5 }}
          source={warmup}
          title="Workout 1"
        />
        <CardTitle
          subtitle="Abdomen"
        />
        <CardContent text="Warm up" />
        <CardAction
          separator={true}
          inColumn={false}>
          <CardButton
            onPress={() => { }}
            title="Share"
            color="#FEB557"
          />
          <CardButton
            onPress={() => { }}
            title="Start Workout"
            color="#FEB557"
          />
        </CardAction>
      </Card>

      <Card style={{
        padding: 20, elevation: 5,
        shadowColor: "#000", margin: 20, backgroundColor: '#009688',
      }}>
        <CardImage style={{ padding: 5 }}
          source={cycling}
          title="Workout 2"
        />
        <CardTitle
          subtitle="Full Body workout"
        />
        <CardContent text="Cycling" />
        <CardAction
          separator={true}
          inColumn={false}>
          <CardButton
            onPress={() => { }}
            title="Share"
            color="#FEB557"
          />
          <CardButton
            onPress={() => { }}
            title="Start Workout"
            color="#FEB557"
          />
        </CardAction>
      </Card>

      <Card style={{
        padding: 20, elevation: 5,
        shadowColor: "#000", margin: 20, backgroundColor: '#009688',
      }}>
        <CardImage style={{ padding: 5 }}
          source={dumbbells}
          title="Workout 3"
        />
        <CardTitle
          subtitle="Dumb Bells"
        />
        <CardContent text="Dumb Bells" />
        <CardAction
          separator={true}
          inColumn={false}>
          <CardButton
            onPress={() => { }}
            title="Share"
            color="#FEB557"
          />
          <CardButton
            onPress={() => { }}
            title="Start Workout"
            color="#FEB557"
          />
        </CardAction>
      </Card>

      <Card style={{
        padding: 20, elevation: 5,
        shadowColor: "#000", margin: 20, backgroundColor: '#009688',
      }}>
        <CardImage style={{ padding: 5 }}
          source={supportpress}
          title="Workout 4"
        />
        <CardTitle
          subtitle="Support Press"
        />
        <CardContent text="Support Press" />
        <CardAction
          separator={true}
          inColumn={false}>
          <CardButton
            onPress={() => { }}
            title="Share"
            color="#FEB557"
          />
          <CardButton
            onPress={() => { }}
            title="Start Workout"
            color="#FEB557"
          />
        </CardAction>
      </Card>

      <Card style={{
        padding: 20, elevation: 5,
        shadowColor: "#000", margin: 20, backgroundColor: '#009688',
      }}>
        <CardImage style={{ padding: 5 }}
          source={cycling}
          title="Workout 5"
        />
        <CardTitle
          subtitle="Cycling"
        />
        <CardContent text="Cycling" />
        <CardAction
          separator={true}
          inColumn={false}>
          <CardButton
            onPress={() => { }}
            title="Share"
            color="#FEB557"
          />
          <CardButton
            onPress={() => { }}
            title="Start Workout"
            color="#FEB557"
          />
        </CardAction>
      </Card>
    </View>
  </ScrollView>

  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    margin: 30,
    justifyContent: 'center'
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },

  tinyLogo: {
    width: 100,
    height: 50,
  },

  addButton: {
    position: 'relative',
    zIndex: 11,
    left: 0,
    top: 10,
    backgroundColor: '#00ccff',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },

  addButtonText: {
    color: '#fff',
    fontSize: 60
  },

  buttonContainer: {
    margin: 20
  },

  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  baseText: {
    fontSize: 15
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
  }

})
