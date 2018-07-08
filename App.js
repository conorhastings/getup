import React from "react";
import { StyleSheet, Text, ScrollView, View, Image } from "react-native";
import iCloudStorage from "react-native-icloudstore";
import AWSAppSyncClient from "aws-appsync";
import AppSyncConfig from "./AppSync";
import { ApolloProvider, Query } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import gql from "graphql-tag";
import { Button } from "react-native-elements";

import ClothingRow from "./components/ClothingRow";
import Outfit from "./components/Outfit";

const CLOTHING_QUERY = gql`
  query getClothing {
    listHats {
      items {
        id
        brand
        image_url
      }
    }
    listJackets {
      items {
        id
        brand
        image_url
      }
    }
    listPants {
      items {
        id
        brand
        image_url
      }
    }
    listShirts {
      items {
        id
        brand
        image_url
      }
    }
    listShoes {
      items {
        id
        brand
        image_url
      }
    }
  }
`;

const client = new AWSAppSyncClient({
  url: AppSyncConfig.graphqlEndpoint,
  region: AppSyncConfig.region,
  auth: {
    type: AppSyncConfig.authenticationType,
    apiKey: AppSyncConfig.apiKey
  }
});

export default class App extends React.Component {
  state = {
    selectedItems: {
      hat: null,
      jacket: null,
      shirt: null,
      pants: null,
      shoes: null
    },
    currentPage: "pick"
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Query query={CLOTHING_QUERY}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Text>Loading...</Text>;
              }
              return (
                <View
                  style={{
                    backgroundColor: "#4E4B4B",
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <View style={styles.container}>
                    <Image source={require("./logo.png")} />
                    {this.state.currentPage === "pick" && (
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <ClothingRow
                          items={data.listHats.items}
                          type="hats"
                          selected={this.state.selectedItems.hat}
                          onPressItem={id =>
                            this.setState({
                              selectedItems: {
                                ...this.state.selectedItems,
                                hat: id
                              }
                            })
                          }
                        />
                        <ClothingRow
                          items={data.listJackets.items}
                          type="jackets"
                          selected={this.state.selectedItems.jacket}
                          onPressItem={id =>
                            this.setState({
                              selectedItems: {
                                ...this.state.selectedItems,
                                jacket: id
                              }
                            })
                          }
                        />
                        <ClothingRow
                          items={data.listShirts.items}
                          type="shirts"
                          selected={this.state.selectedItems.shirt}
                          onPressItem={id =>
                            this.setState({
                              selectedItems: {
                                ...this.state.selectedItems,
                                shirt: id
                              }
                            })
                          }
                        />
                        <ClothingRow
                          items={data.listPants.items}
                          type="pants"
                          selected={this.state.selectedItems.pants}
                          onPressItem={id =>
                            this.setState({
                              selectedItems: {
                                ...this.state.selectedItems,
                                pants: id
                              }
                            })
                          }
                        />
                        <ClothingRow
                          items={data.listShoes.items}
                          type="shoes"
                          selected={this.state.selectedItems.shoes}
                          onPressItem={id =>
                            this.setState({
                              selectedItems: {
                                ...this.state.selectedItems,
                                shoes: id
                              }
                            })
                          }
                        />
                      </ScrollView>
                    )}
                    {this.state.currentPage === "outfit" && (
                      <Outfit {...this.state.selectedItems} />
                    )}
                    {this.state.currentPage !== "outfit" && (
                      <Button
                        title="see my outfit"
                        buttonStyle={{
                          backgroundColor: "rgba(242, 176, 198, 0.8)",
                          width: 300,
                          height: 45,
                          borderColor: "transparent",
                          borderWidth: 0,
                          borderRadius: 5,
                          opacity: 0.8
                        }}
                        containerStyle={{ marginTop: 20 }}
                        onPress={() => this.setState({ currentPage: "outfit" })}
                      />
                    )}
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
