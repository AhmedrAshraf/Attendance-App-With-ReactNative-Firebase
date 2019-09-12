import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import fire from "./fire";
import 'firebase/firestore';
import * as ImagePicker from "expo-image-picker";

export default class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            load: false,
            imageUri: '',
            imageName: '',
            image: '',
        }
    }

    gotogallary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            let imgLenght = result.uri.lastIndexOf("/");
            var imgName = result.uri.slice(imgLenght);
            this.setState({ imageUri: result.uri })
            this.setState({ imageName: imgName })
        }
    }

    cameraopen = async () => {
        let result = await ImagePicker.launchCameraAsync();
        if (!result.cancelled) {
            let imgLenght = result.uri.lastIndexOf("/");
            var imgName = result.uri.slice(imgLenght);
            this.setState({ imageUri: result.uri })
            this.setState({ imageName: imgName })
        }
    }

    join = async () => {
        this.setState({ load: true });
        const response = await fetch(this.state.imageUri);
        const blob = await response.blob();
        name = this.state.name;
        email = this.state.email;
        var ref = fire.storage().ref().child("images/" + this.state.imageName);
        ref.put(blob)
            .then(function (imageSnapshot) {
                imageSnapshot.ref.getDownloadURL()
                    .then(function (downloadURL) {
                        fire.firestore().collection("users").add({
                            name,
                            email,
                            image: downloadURL,
                        })
                    })
            })
            .then(() => {
                this.setState({ load: false })
                this.props.navigation.navigate('Home')
            })
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Loginhead}>Add User</Text>

                <TextInput style={styles.form} placeholder="Type Name"
                    value={this.state.name} onChangeText={(name) => this.setState({ name })} />

                <TextInput style={styles.form} placeholder="Type Email"
                    value={this.state.email} onChangeText={(email) => this.setState({ email })} />

                <View style={styles.seting} >
                    <TouchableOpacity onPress={this.cameraopen}><Image source={require('./img/camera.png')} style={styles.profile} /></TouchableOpacity>
                    <TouchableOpacity onPress={this.gotogallary}><Image source={require('./img/galary.png')} style={styles.profile} /></TouchableOpacity>
                </View >

                {(this.state.load) ? (<Image source={require('./img/load.gif')} style={styles.load} />) : null}

                <View style={styles.but}>
                    <Button title='join User' onPress={this.join.bind(this)} />
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Loginhead: {
        textAlign: 'center',
        fontSize: 25,
        padding: 5,
        fontWeight: 'bold',
        color: '#2E7BFF',
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: -1 },
        textShadowRadius: 1,
        marginBottom: 30,
    },
    form: {
        fontSize: 20,
        margin: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height: 50,
    },
    but: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
    load: {
        width: 90,
        height: 90,
        marginLeft: 125,
        marginTop: 10,
        marginBottom: 10,
    },
    profile: {
        width: 100,
        height: 100,
        marginLeft: 10,
        marginRight: 10,
    },
    seting: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    }
});
