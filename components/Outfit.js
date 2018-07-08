import React, { Component } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";

function OutfitImage({ style, source }) {
  console.log(style)
  return <Image source={source} style={style} resizeMode="contain" />;
}

export default function Outfit({ hat, jacket, shirt, pants, shoes, ...rest }) {
  console.log(hat)
  return (
    <ScrollView showsVerticalScrollIndicator={false}> 
      {hat && <OutfitImage source={{ uri: hat.image_url }} style={styles.hat} />}
      <View style={styles.jacketShirtContainer}>
        {jacket && <OutfitImage source={{ uri: jacket.image_url }} style={styles.jacket} />}
        {shirt && <OutfitImage source={{ uri: shirt.image_url }} style={styles.shirt} />}
      </View>
      {pants && <OutfitImage source={{ uri: pants.image_url }} style={styles.pants} />}
      {shoes && <OutfitImage source={{ uri: shoes.image_url }} style={styles.shoes} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hat: {
    width: 100,
    height: 100
  },
  jacket: {
    width: 150,
    height: 200
  },
  shirt: {
    width: 150,
    height: 200,
    marginLeft: 10
  },
  pants: {
    width: 175,
    height: 200
  },
  shoes: {
      width: 120,
      height: 120
  },
  jacketShirtContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
  }
});
