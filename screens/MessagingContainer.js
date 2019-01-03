import { StyleSheet, View } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../utils/colors';
import Status from './Status';
import MessageList from '../components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from '../utils/MessageUtils';
import store from '../store';

export default class MessagingContainer extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Messaging',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.blue,
        },
        headerLeft: (
          <MaterialIcons 
            name="menu"
            size={24}
            style={{ color: colors.black, marginLeft: 10 }}
            onPress={() => navigate('DrawerToggle')}
          />
        ),
    });

    state = {
        // messages: [
        //     createImageMessage('https://unsplash.it/300/300'),
        //     createTextMessage('world'),
        //     createTextMessage('Hello'),
        //     createLocationMessage({
        //         latitude: 37.78825,
        //         longitude: -122.4324,
        //     }),
        // ],
        messages: store.getState().messages
    };

    handlePressMessage = () => {}
    
    renderMessageList = () => {
        const { messages } = this.state;
        return (
          <View sylte={styles.content}>
            <MessageList messages={messages} onPressMessage={this.handlePressMessage} />
          </View>
        );
    }

    renderInputMethodEditor = () => {
        return (
            <View style={styles.inputMethodEditorr}></View>
        );
    }

    renderToolbar = () => {
        return (
            <View style={styles.toolbar}></View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Status />
                {this.renderMessageList()}
                {this.renderToolbar()}
                {this.renderInputMethodEditor()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputMethodEditorr: {
        flex: 1,
        backgroundColor: 'white',
    },
    toolbar: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.04)',
        backgroundColor: 'white',
    },
});