import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import fire from "./fire";
import 'firebase/firestore';

export default class Mark extends Component {

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

    mark(name, email, image) {
        var newDate = new Date();
        var date = newDate.getDate();
        var day = newDate.getDay();
        var daylist = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
        var nowDay = daylist[day];
        var month = newDate.getDate();
        var monthlist = ["Jun", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var nowMonth = monthlist[month];
        fire.firestore().collection("mark").add({
            name,
            email,
            date,
            nowDay,
            nowMonth,
            image,
        })
    }

    render() {
        return (
            <ScrollView><View style={styles.container}>
                {(this.state.load) ? (<Image source={require('./img/load.gif')} style={styles.load} />) : null}
                {this.state.allUsers.map((item, index) => {
                    return (
                        <View style={styles.seting} >
                            <Image source={{ uri: item.image }} style={styles.dp} />
                            <TouchableOpacity onPress={this.mark.bind(this, item.name, item.email, item.image)}><Text style={styles.users} key={index}>{item.name}</Text></TouchableOpacity>
                        </View >

                    )
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
        color: 'teal',
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
