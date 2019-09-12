import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Home extends Component {

    addattendence() {
        this.props.navigation.navigate('Mark');
    }
    viewattendence() {
        this.props.navigation.navigate('Views');
    }
    viewusers() {
        this.props.navigation.navigate('Users');
    }
    adduser() {
        this.props.navigation.navigate('Join');
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headDiv}>
                    <Text style={styles.headText}>Attendance</Text>
                </View>

                <View style={styles.budy}>

                    <View style={styles.budy1}>

                        <TouchableOpacity onPress={this.addattendence.bind(this)}><View style={styles.div1}>
                            <Image source={require('./img/addattendence.png')} style={styles.img} />
                            <Text style={styles.txt1}>Mark Attendance</Text>
                        </View></TouchableOpacity>

                        <TouchableOpacity onPress={this.viewattendence.bind(this)}><View style={styles.div1}>
                            <Image source={require('./img/viewattendence.png')} style={styles.img} />
                            <Text style={styles.txt1}>View Attendance</Text>
                        </View></TouchableOpacity>
                    </View>

                    <View style={styles.budy2}>
                        <TouchableOpacity onPress={this.viewusers.bind(this)}><View style={styles.div1}>
                            <Image source={require('./img/viewusers.png')} style={styles.img} />
                            <Text style={styles.txt1}>View User</Text>
                        </View></TouchableOpacity>

                        <TouchableOpacity onPress={this.adduser.bind(this)}><View style={styles.div1}>
                            <Image source={require('./img/adduser.png')} style={styles.img} />
                            <Text style={styles.txt1}>Add User</Text>
                        </View></TouchableOpacity>

                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    budy: {
        justifyContent: 'center',
        marginTop: 50,
    },
    budy1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    budy2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    headDiv: {
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: '#2E7BFF',
    },
    headText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    div1: {
        marginTop: 50,
        borderColor: 'gainsboro',
        borderWidth: 1,
        alignItems: 'center',
        width: 100,
        padding: 10,
    },
    txt1: {
        fontSize: 15,
        paddingTop: 5,
        textAlign: 'center',
    },
    img: {
        width: 80,
        height: 80,
    }
});