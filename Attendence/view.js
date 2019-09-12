import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import fire from "./fire";
import 'firebase/firestore';

export default class Views extends Component {

    constructor(props) {
        super(props);
        this.state = {
            load: false,
            allUsers: [],
        }
    }
    componentDidMount() {
        this.setState({ load: true })
        fire.firestore().collection("mark").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var currentUsers = this.state.allUsers;
                currentUsers.push(doc.data())
                this.setState({ allUsers: currentUsers });
                this.setState({ load: false })
            })
        });
    }

    render() {
        return (
            <ScrollView><View style={styles.container}>
                {(this.state.load) ? (<Image source={require('./img/load.gif')} style={styles.load} />) : null}
                {this.state.allUsers.map((item, index) => {
                    return (<View style={styles.seting} >
                            <Image source={{ uri: item.image }} style={styles.dp} />
                        <Text style={styles.users} key={index}>{item.name}{"\n"}<Text style={styles.email}>{item.email}</Text>{"\n"}<Text style={styles.date}>{item.date}-{item.nowMonth}-{item.nowDay}</Text></Text>
                    </View >)
                })}
            </View ></ScrollView>
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
        color: 'teal',
        marginBottom: 30,
    },
    users: {
        fontSize: 22,
        paddingLeft: 20,
        color: 'blue',
    },
    date: {
        fontSize: 18,
        paddingLeft: 20,
        color: 'black',
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
