import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  CameraRoll,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import { takeSnapshotAsync } from "expo";
const value = {
  format: "jpg",
  quality: 0.9
};

function OutfitImage({ style, source }) {
  return <Image source={source} style={style} resizeMode="contain" />;
}

export default class Outfit extends React.Component {
  render() {
    const { hat, jacket, shirt, pants, shoes } = this.props;
    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={viewShot => (this.viewShot = viewShot)}
        >
          {hat && (
            <OutfitImage source={{ uri: hat.image_url }} style={styles.hat} />
          )}
          <View style={styles.jacketShirtContainer}>
            {jacket && (
              <OutfitImage
                source={{ uri: jacket.image_url }}
                style={styles.jacket}
              />
            )}
            {shirt && (
              <OutfitImage
                source={{ uri: shirt.image_url }}
                style={styles.shirt}
              />
            )}
          </View>
          {pants && (
            <OutfitImage
              source={{ uri: pants.image_url }}
              style={styles.pants}
            />
          )}
          {shoes && (
            <OutfitImage
              source={{ uri: shoes.image_url }}
              style={styles.shoes}
            />
          )}
        </ScrollView>
        <Button
          title="Save Outfit Image"
          buttonStyle={{
            backgroundColor: "#66327C",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
          onPress={() => 
            takeSnapshotAsync(this.viewShot, value).then(image => {
              CameraRoll.saveToCameraRoll(image);
              Alert.alert('Outfit Saved!', 'Your outfit has successfully been saved to your camera roll ');
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hat: {
    width: 100,
    height: 90
  },
  jacket: {
    width: 150,
    height: 190
  },
  shirt: {
    width: 150,
    height: 190,
    marginLeft: 10
  },
  pants: {
    width: 175,
    height: 190
  },
  shoes: {
    width: 120,
    height: 110
  },
  jacketShirtContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row"
  }
});
