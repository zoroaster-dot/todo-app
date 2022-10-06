import * as React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      update_id: 0,
      is_update: false,
      listOfItems: [],
      tempText: "",
    };
  }

  deleteItem(id) {
    const data = this.state.listOfItems;
    this.setState({
      listOfItems: data.filter((item) => item.id !== id),
      is_update: false,
    });
  }
  addItem = () => {
    if (this.state.tempText != "") {
      const newItem = {
        id: 1 + Math.random(),
        value: this.state.tempText.slice(),
      };
      const data = this.state.listOfItems;
      data.push(newItem);
      this.setState({
        listOfItems: data,
        is_update: false,
      });
    }
  };
  editItem(id) {
    const data = this.state.listOfItems;
    const target = data.filter((item) => item.id === id);
    // if (target.length > 0)
    this.setState({
      update_id: id,
      is_update: true,
      tempText: target[0].value.slice(),
    });
  }
  noUpdate() {
    this.setState({
      update_id: 0,
      is_update: false,
      tempText: "",
    });  
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>To Do Simple</Text>
        </View>
        <View>
          <TextInput
            placeholder="  Type item here..."
            style={styles.inputBox}
            onChangeText={(text) => {
              if (this.state.is_update) {
              	const data = this.state.listOfItems;
              	const update_id = 0 + this.state.update_id;
              	const target = data.filter((item) => item.id == update_id);
              	target[0].value = text;
              	this.setState({ listOfItems: data });
              }
              this.setState({ tempText: text });
            }}
            value={this.state.tempText}
          ></TextInput>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.addItem}>
              <Text style={styles.buttontext}>+</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button1} onPress={() => this.noUpdate()}>
              <Text style={styles.buttontext}>OK</Text>
            </TouchableOpacity>
          </View>

          <View>
            <ScrollView>
              {this.state.listOfItems.map((item) => {
                return (
                  <View key={item.id} style={styles.listview}>
                    <TextInput style={styles.textstyle} value={item.value} />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => this.deleteItem(item.id)}
                    >
                      <Text style={styles.deleteButtonText}>Hapus</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => this.editItem(item.id)}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  textView: {
    backgroundColor: "black",
    height: 80,
  },
  text: {
    textAlign: "center",
    marginTop: "10%",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  inputBox: {
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 20,
    height: 40,
  },
  button: {
    position: "absolute",
    right: 20,
    top: 200,
    backgroundColor: "blue",
    width: 150,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  button1: {
    position: "absolute",
    right: 20,
    top: 300,
    backgroundColor: "blue",
    width: 150,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },

  buttontext: {
    color: "#fff",
    fontSize: 24,
  },
  textstyle: {
    fontSize: 20,
    color: "blue",
  },
  listview: {
    borderWidth: 2,
    height: 40,
    justifyContent: "space-between",
    borderColor: "blue",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  deleteButtonText: {
    color: "yellow",
  },
  editButton: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  editButtonText: {
    color: "yellow",
  },
});
