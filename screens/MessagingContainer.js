import { Alert, FlatList, Image, Text, TouchableOpacity, TouchableHighlight, StyleSheet, View } from 'react-native';
import React from 'react';
import { MapView } from 'expo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../utils/colors';
import Status from './Status';
import MessageList from '../components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from '../utils/MessageUtils';
import store from '../store';
import Toolbar from '../components/Toolbar';

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
        messages: [
            createImageMessage('https://unsplash.it/300/300'),
            createTextMessage('world'),
            createTextMessage('Hello'),
            createLocationMessage({
                latitude: 37.78825,
                longitude: -122.4324,
            }),
        ],
        // messages: store.getState().messages
        fullscreenImageId: null,
        isInputFocused: false,
    };

    handlePressToolbarCamera = () => {
        //...
    }

    handlePressToolbarLocation = () => {
        //...
    }

    handleChangeFocus = (isFocused) => {
        this.setState({ isInputFocused: isFocused});
    };

    handleSubmit = (text) => {
        const { messages } = this.state;

        this.setState({
            messages: [createTextMessage(text), ...messages],
        });
    };

    dismissFullscreenImage = () => {
        this.setState({ fullscreenImageId: null });
    };

    handlePressMessage = ({ id, type }) => {
        switch (type) {
            case 'text':
                
                Alert.alert(
                        'Delete message?',
                        'Are you sure you want to permenently delete this message?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Delete',
                                style: 'destructive',
                                onPress: () => {
                                    const { messages } = this.state;
                                    this.setState({ messages: messages.filter(messages => message.id !== id)});
                                },
                            },
                        ],
                    );
            case 'image':
                this,this.setState({ fullscreenImageId: id });
                break;
            default:
                break;
        }
    };

    renderFullscreenImage = () => {
        const { messages, fullscreenImageId } = this.state;

        if (!fullscreenImageId) return null;

        const image =  messages.find(message => message.id === fullscreenImageId);

        if (!image) return null;

        const { uri } = image;

        return (
            <TouchableHighlight style={styles.fullscreenOnerlay} onPress={this.dismissFullscreenImage}>
                <Image style={styles.fullscreenImage} source={{ uri }} />
            </TouchableHighlight>
        )
    }
    
    renderMessageList = () => {
        const { messages } = this.state;
        return (
          <View style={styles.content}>
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
        const { isInputFocused } = this.state;

        return (
            <View style={styles.toolbar}>
                <Toolbar 
                    isFocused={isInputFocused}
                    onSubmit={this.handleSubmit}
                    onChangeFocus={this.handleChangeFocus}
                    onPressCamera={this.handlePressToolbarCamera}
                    onPressLocation={this.handlePressToolbarLocation}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Status />
                {this.renderMessageList()}
                {this.renderToolbar()}
                {this.renderInputMethodEditor()}
                {this.renderFullscreenImage()}
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
    fullscreenOnerlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        zIndex: 2,
    },
    fullscreenImage: {
        flex: 1,
        resizeMode: 'contain',
    },
});