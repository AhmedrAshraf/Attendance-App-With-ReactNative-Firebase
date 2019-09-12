import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import fire from "./fire";
import 'firebase/firestore';

export default class Join extends Component {

    constructor(props) {
        super(props);
        this.state = {
            load: false,
            allUsers: [],
        }
    }
    componentDidMount() {
        this.setState({
            load: true,
        })
        fire.firestore().collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var currentUsers = this.state.allUsers;
                currentUsers.push(doc.data())
                this.setState({
                    allUsers: currentUsers,
                });
                this.setState({
                    load: false,
                })
            })
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {(this.state.load) ? (<Image source={require('./img/load.gif')} style={styles.load} />) : null}
                    {this.state.allUsers.map((item, index) => {
                        return (
                            <View style={styles.seting} >
                                <Image source={{ uri: item.image }} style={styles.dp} />
                                <Text style={styles.name} key={index}>{item.name}{"\n"}<Text style={styles.email}>{item.email}</Text></Text>
                            </View >
                        )
                    })}
                </View >
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 22,
        paddingLeft: 15,
        color: '#2E7BFF',
        fontWeight: 'bold',
    },
    email: {
        fontSize: 18,
        paddingLeft: 15,
        fontWeight: '100',
        color: 'red',
    },
    load: {
        width: 150,
        height: 150,
        marginTop: 100,
        marginLeft: 100,
    },
    dp: {
        width: 55,
        height: 55,
        borderRadius: 1000,
    },
    seting: {
        flexDirection: 'row',
        borderBottomColor: 'gainsboro',
        borderBottomWidth: 1,
        marginTop: 10,
        padding: 10,
    }
});
