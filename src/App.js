import React, {useEffect, useState} from 'react'

import api from './services/api'

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";




export default function App() {
  const [repositoryList, setRepositoryList] = useState([])


  async function handleLikeRepository(id) {
    //console.log(id)

    
    const success = await api.post(`/repositories/${id}/like`)

    setRepositoryList(
     repositoryList.map(repository=>{
       if(repository.id == id){
         
        repository.likes++
         
      }
      return repository
     })
    )
    

  }


  function getRepositoryList() {
      api.get('/repositories').then(response =>{
        console.log(response.data)
        return setRepositoryList(response.data)
      })
      
    }
  
    useEffect(()=>{
      getRepositoryList()
      
  
    },[])

  
    
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.repositoryContainer}> */}

      <Text style={styles.tilte}> Go Repository </Text>

    {/* =================================================================================== */}
    <FlatList
            style={styles.subContainer}
            data={repositoryList}
            keyExtractor={repository => repository.id}
            renderItem={({item:repository})=>(

              <>

              <View style={styles.repositoryContainer}>

                <Text style={styles.repository}>{repository.title}</Text>

                <View style={styles.techsContainer}>
                  <Text style={styles.tech}>
                    ReactJS
                  </Text>
                  <Text style={styles.tech}>
                    Node.js
                  </Text>
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes > 1 ? `${repository.likes} curtidas`:`${repository.likes} curtida` }
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>

                </View>

               </>  
            ) }
              />
            
{/* =================================================================================== */}
        {/* </View> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  subContainer: {
   marginTop: 20
  },
  tilte:{
    textAlign: "center",
    color:'#fff',
    fontSize: 40,
    marginTop: 15,
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 30,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
