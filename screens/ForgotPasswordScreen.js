import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import {Auth} from 'aws-amplify';


export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    handleForgotPassword() {
        const email = this.state.email;
        Auth.forgotPassword(email)
            .then(data =>
                Alert.alert(
                    'Verification code sent',
                    'A verification code has been sent to your email.',
                    [{text: 'OK'}],
                    {cancelable: false}
                )
            )
            .catch(err => {
            console.log(err);
                Alert.alert(
                    'Invalid email',
                    'There is no DDA account associated with that email address.',
                    [{text: 'OK'}],
                    {cancelable: false}
                )}
            )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>(logo goes here)</Text>
                <ForgotPasswordForm
                    onFormChange={this.handleFormChange}
                    onSubmit={() => this.handleForgotPassword()}
                />
                <View style={[styles.smallText, {flexDirection: 'row', textAlign: 'center'}]}>
                    <Text>If you have been emailed a verification code, click </Text>
                    <Text style={styles.link} onPress={() =>
                        this.props.navigation.navigate('ForgotPassword')}>
                        here.</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallText: {
        fontSize: 14,
    },
    link: {
        color: '#F98C04',
        fontWeight: 'bold',
    },
});