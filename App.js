import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import iCloudStorage from 'react-native-icloudstore';
import AWSAppSyncClient from 'aws-appsync';
import AppSyncConfig from './AppSync';
import { ApolloProvider, Query } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react';
import gql from 'graphql-tag';

import ClothingRow from './components/ClothingRow';


const CLOTHING_QUERY =  gql`query getClothing {
  listHats {
    items {
      id,
      brand,
      image_url
    }
  }
  listJackets {
    items {
      id,
      brand,
      image_url
    }
  }
  listPants {
    items {
      id,
      brand,
      image_url
    }
  }
  listShirts {
    items {
      id,
      brand,
      image_url
    }
  }
  listShoes {
    items {
      id,
      brand,
      image_url
    }
  }
}`;


const client = new AWSAppSyncClient({
  url: AppSyncConfig.graphqlEndpoint,
  region: AppSyncConfig.region,
  auth: {
    type: AppSyncConfig.authenticationType,
    apiKey: AppSyncConfig.apiKey  
  }
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Query query={CLOTHING_QUERY}>
            {({ loading, error, data }) =>  {
              if (loading) {
                return <Text>Loading...</Text>
              }
              return (
                <View style={{ backgroundColor: "#4E4B4B", height: '100%', width: '100%' }}>
                  <View style={styles.container}>
                    <Image source={require('./logo.png')}  />
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <ClothingRow items={data.listHats.items} type="hats" />
                      <ClothingRow items={data.listJackets.items} type="jackets" />
                      <ClothingRow items={data.listShirts.items} type="shirts" />
                      <ClothingRow items={data.listPants.items} type="pants" />
                      <ClothingRow items={data.listShoes.items} type="shoes" />
                    </ScrollView>
                  </View>
                </View>
              );          
            }}
          </Query>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 25,
    marginBottom: 150
  },
  headerText: {
    fontSize: 44
  },
  subText: {
    fontSize: 16
  }
});


