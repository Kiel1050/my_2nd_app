import React, { Component } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from "react-native";

import Map from "../Map/Map";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      username: ""
    };
  }
  updateValue(text, field) {
    if (field == "username") {
      this.setState({ username: text });
    } else if (field == "password") {
      this.setState({ password: text });
    }
  }
  submit() {
    let collection = {};
    (collection.user_name = this.state.username),
      (collection.user_pwd = this.state.password),
      (collection.device_type = "web"),
      (collection.app = "sdes");

    const URL = "https://ezwork.vn/ez_sdes";

    fetch(URL + "/user/login", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.code == 200) {
          this.setState({ sessionid: response.sessionid });
          this.setState({ login: true });
        } else {
          console.log(response);
          this.setState({ login: response.description });
        }
      })
      .catch(error => console.error("Error:", error));
  }
  render() {
    if (!this.state.login) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          
            <View style={styles.logo_container}>
              <Image
                style={styles.logo}
                source={require("../../Image/anh.png")}
              />
            </View>
            <View style={styles.login_form}>
              <View style={{ flex: 1 }} />
              <View style={styles.login_form_container}>
                <StatusBar barStyle="light-content" />
                <TextInput
                  style={styles.input}
                  placeholder="username"
                  onChangeText={text => this.updateValue(text, "username")}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TextInput
                  style={styles.input}
                  placeholder="password"
                  onChangeText={text => this.updateValue(text, "password")}
                  secureTextEntry
                  returnKeyType="go"
                  ref={input => (this.passwordInput = input)}
                />
                <TouchableOpacity
                  onPress={() => this.submit()}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
          
        </KeyboardAvoidingView>
      );
    } else {
      return <Map sessionid={this.state.sessionid} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498db"
  },
  logo_container: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-start"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "stretch"
  },
  login_form: {
    flex: 2
  },
  login_form_container: {
    padding: 20,
    flex: 2
  },
  input: {
    height: 80,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
    color: "#FFF",
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "rgba(41, 128, 185,1.0)",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700"
  }
});
