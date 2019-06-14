import React from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import PropTypes from 'prop-types'
import ChangePasswordForm from "../../components/auth/ChangePasswordForm";


export default class ChangePasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    handlePasswordChange = () => {
        const {oldPassword, newPassword, confirmNewPassword} = this.state;
        const email = this.state.email;
        if (newPassword === confirmNewPassword) {
            Auth.signIn(email, oldPassword)
                .then(user => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        Auth.completeNewPassword(
                            user,               // the Cognito User Object
                            newPassword,       // the new password,
                            {email}
                        ).then(user => {
                            // at this time the user is logged in if no MFA required
                            Alert.alert("Password changed.",
                                "Your password was successfully updated. You may now sign in using your new password.", [{
                                    title: "OK",
                                    onPress: () => {
                                        this.props.navigation.navigate('Auth')
                                    }
                                }])
                        }).catch(e => {
                            // API call to completeNewPassword failed
                            console.log(e);
                        });
                    }
                }).catch(e => {
                    // API call to SignIn failed
                console.log(e);
            });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Enter your email and the temporary password that was emailed to you.</Text>
                <ChangePasswordForm
                    onFormChange={this.handleFormChange}
                    onSubmit={() => this.handlePasswordChange()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});