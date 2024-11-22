import React, { Component } from "react";
import {  StyleSheet,  TouchableOpacity} from "react-native";
import { Text, TextInput, View } from "react-native-web"
import {auth} from '../firebase/config'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      logued: false,
      error: "",
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => console.log('El usuario es:', JSON.stringify(user,null,4)))
  }

  handleSubmit() {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => this.setState({ logued: true }))
      .then( ()=>  this.props.navigation.navigate("HomeMenu"))
      .catch((error) => this.setState({ error: "Fallo el login" }));    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Ingresar</Text>
        <TextInput  style={styles.field}
          keyboardType="email-address"
          placeholder="Ingrese su dirección de email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput  style={styles.field}
          placeholder="Ingrese su contrasena"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity onPress={() => this.handleSubmit() }  style={[styles.button, styles.buttonSecondary]}>
          <Text>Acceder</Text>
        </TouchableOpacity>
        <Text>Navegación cruzada a Register: </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text>No tengo cuenta</Text>
        </TouchableOpacity>
        <Text>
          Navegación cruzada a ingresar a la app. Este paso se hará
          automaticamente cuando veamos la funcionalidad de loguin{" "}
        </Text>      
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
        alignContent:'center',
        width: '80vw',

    },
    field: {
        height: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1

    },
    button: {
        backgroundColor: "#51b9e9",
        borderRadius: 5,
        padding: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
      },
      buttonSecondary: {
        backgroundColor: "#ffa500",
      },


});

export default Login;
