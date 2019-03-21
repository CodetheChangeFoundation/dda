import React, {Component} from 'react';
import {Button} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View} from 'react-native';

export default class RectangularButton extends Component {
    render() {
        return (
            <Button
                title="Confirm"
                raised
                titleStyle={{
                    // change font here
                    //fontFamily: 'Century Gothic',
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: '700',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase'
                }}
                buttonStyle={{
                    backgroundColor: '#9ACD32',
                    width: 300,
                    height: 50,
                    borderRadius: 30
                }}
            />
        );
    }
}
