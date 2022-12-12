import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View ,StyleSheet, ScrollView} from 'react-native';
import { CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import styles from './styles';
import { firebase } from '../../firebase/config';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';

export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
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

    const CreateCard = () => {
      
        return(
             
            <Card style={Styles.container}>
            <Card.Content>
                <Title>Geeks For Geeks</Title>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3-200x200.png' }} />
           <Card.Content>
            <Paragraph>A Computer Science portal for </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Add To Favourites</Button>
            </Card.Actions>
          </Card>
             
        )
    }

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

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    return (<ScrollView>
 
        <Card>
          <CardImage 
            source={{uri: 'http://bit.ly/2GfzooV'}} 
            title="Workout 1"
          />
          <CardTitle
            subtitle="Number 1"
          />
          <CardContent text="Clifton, Western Cape" />
          <CardAction 
            separator={true} 
            inColumn={false}>
            <CardButton
              onPress={() => {}}
              title="Share"
              color="#FEB557"
            />
            <CardButton
              onPress={() => {}}
              title="Explore"
              color="#FEB557"
            />
          </CardAction>
        </Card>

        <Card>
          <CardImage 
            source={{uri: 'http://bit.ly/2GfzooV'}} 
            title="Workout 2"
          />
          <CardTitle
            subtitle="Workout 2"
          />
          <CardContent text="Clifton, Western Cape" />
          <CardAction 
            separator={true} 
            inColumn={false}>
            <CardButton
              onPress={() => {}}
              title="Share"
              color="#FEB557"
            />
            <CardButton
              onPress={() => {}}
              title="Explore"
              color="#FEB557"
            />
          </CardAction>
        </Card>

        <Card>
          <CardImage 
            source={{uri: 'http://bit.ly/2GfzooV'}} 
            title="Workout 3"
          />
          <CardTitle
            subtitle="Workout 3"
          />
          <CardContent text="Clifton, Western Cape" />
          <CardAction 
            separator={true} 
            inColumn={false}>
            <CardButton
              onPress={() => {}}
              title="Share"
              color="#FEB557"
            />
            <CardButton
              onPress={() => {}}
              title="Explore"
              color="#FEB557"
            />
          </CardAction>
        </Card>

        <Card>
          <CardImage 
            source={{uri: 'http://bit.ly/2GfzooV'}} 
            title="Workout 4"
          />
          <CardTitle
            subtitle="Workout 4"
          />
          <CardContent text="Clifton, Western Cape" />
          <CardAction 
            separator={true} 
            inColumn={false}>
            <CardButton
              onPress={() => {}}
              title="Share"
              color="#FEB557"
            />
            <CardButton
              onPress={() => {}}
              title="Explore"
              color="#FEB557"
            />
          </CardAction>
        </Card>

        <Card>
          <CardImage 
            source={{uri: 'http://bit.ly/2GfzooV'}} 
            title="Workout 5"
          />
          <CardTitle
            subtitle="Workout 5"
          />
          <CardContent text="Clifton, Western Cape" />
          <CardAction 
            separator={true} 
            inColumn={false}>
            <CardButton
              onPress={() => {}}
              title="Share"
              color="#FEB557"
            />
            <CardButton
              onPress={() => {}}
              title="Explore"
              color="#FEB557"
            />
          </CardAction>
        </Card>

        <Card>
          <CardImage 
            source={{uri: 'http://bit.ly/2GfzooV'}} 
            title="Workout 6"
          />
          <CardTitle
            subtitle="Workout 6"
          />
          <CardContent text="Clifton, Western Cape" />
          <CardAction 
            separator={true} 
            inColumn={false}>
            <CardButton
              onPress={() => {}}
              title="Share"
              color="#FEB557"
            />
            <CardButton
              onPress={() => {}}
              title="Explore"
              color="#FEB557"
            />
          </CardAction>
        </Card>
       
      </ScrollView>
      
    )
}

const Styles = StyleSheet.create({
   /* container :{
        alignContent:'center',
        margin:37
    } */

    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      },
      scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },
      text: {
        fontSize: 42,
      }
})
