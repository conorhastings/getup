import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

export default class ClothingRow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{this.props.type}</Text>
        <ScrollView horizontal={true} style={styles.row}>
          {this.props.items.map(item => (
            <TouchableOpacity
              onPress={() =>
                this.props.onPressItem(
                  this.props.selected && this.props.selected.id === item.id ? null : item
                )
              }
              key={item.id}
              style={
                this.props.selected && this.props.selected.id === item.id
                  ? {
                      borderBottomColor: "#B3ABAB",
                      borderBottomWidth: 5
                    }
                  : { borderBottomColor: "transparent", borderBottomWidth: 5 }
              }
            >
              <View style={styles.item}>
                <Image
                  source={{ uri: item.image_url }}
                  style={{ width: 150, height: 150 }}
                  resizeMode="contain"
                />
                <Text style={{ color: "#B3ABAB" }}>{item.brand}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25
  },
  row: {
    paddingTop: 10
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20
  },
  headerText: {
    fontSize: 22,
    color: "#B3ABAB",
    fontWeight: "700"
  }
});
