import React from 'react';
import {Text, StyleSheet, View } from 'react-native';
import {Auth} from 'aws-amplify';
import PropTypes from 'prop-types'
import ChangePasswordForm from "../components/auth/ChangePasswordForm";


export default class ChangePasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log("cons pop: " + props.tempPassword);
        console.log("cons hello: " + props.hello);
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

    handleTempPasswordChange() {
        const {email, oldPassword, newPassword} = this.state;
        Auth.signIn(email, oldPassword)
            .then(user => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    Auth.completeNewPassword(
                        user,               // the Cognito User Object
                        newPassword,       // the new password,
                        {}
                    ).then(user => {
                        // at this time the user is logged in if no MFA required
                        console.log(user);
                    }).catch(e => {
                        console.log(e);
                    });
                }
            }).catch(e => {
            console.log(e);
        });
    }

    handleOldPasswordChange() {
        Auth.currentAuthenticatedUser()
            .then(user => {
                return Auth.changePassword(user, this.state.oldPassword, this.state.newPassword);
            })
            .catch(err => console.log(err));
        // TODO: error handling, alert if fail
    }

    handlePasswordChange = () => {
        if (this.state.newPassword === this.state.confirmPassword) {
            if (this.props.tempPassword) this.handleTempPasswordChange();
            else this.handleOldPasswordChange();
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {/*change to better text*/}
                <Text>Enter your email and temporary password.</Text>
                {console.log(this.props.tempPassword)}
                <ChangePasswordForm
                    tempPassword={this.props.tempPassword}
                    onFormChange={this.handleFormChange}
                    onSubmit={() => this.handlePasswordChange()}
                />
            </View>
        );
    }
}

ChangePasswordScreen.propTypes = {
    tempPassword: PropTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});