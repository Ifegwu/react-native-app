import React from 'react';
import { 
            AsyncStorage, 
            View,
            StyleSheet, 
            KeyboardAvoidingView, 
            Modal,
            Platform,
            StatusBar, } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Feed from './Feed';

import Comments from './Comments';
import { Constants } from 'expo';
import colors from '../utils/colors';

const items = [
    { id: 0, author: 'Bob Ross' },
    { id: 1, author: 'Chuck Norris' },
];

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

export default class CommentsContainer extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Gallary',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: colors.blue,
        },
        headerLeft: (
            <MaterialIcons 
                name="menu"
                size={24}
                style={{ color: colors.black, marginRight: 10 }}
                onPress={() => navigate('DrawerToggle')}
            />
        ),
    });

    state = {
        text: '',
        commentsForItem: {},
        showModal: false,
        selectedItemId: null,
    }

    async componentDidMount() {
        try {
          const commentsForItem = await AsyncStorage.getItem(
            ASYNC_STORAGE_COMMENTS_KEY,
          );
   
          this.setState({
            commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {},
          });
        } catch (e) {
          console.log('Failed to load comments');
        }
    }

    openCommentScreen = id => {
        this.setState({
          showModal: true,
          selectedItemId: id,
        });
    };
    
    closeCommentScreen = () => {
        this.setState({
          showModal: false,
          selectedItemId: null
        })
    }
    
    onSubmitComment = text => {
        const { selectedItemId, commentsForItem } = this.state;
        const comments = commentsForItem[selectedItemId] || [];
    
        const updated = {
          ...commentsForItem,
          [selectedItemId]: [...comments, text],
        };
    
        this.setState({ commentsForItem: updated });
    
        try {
          AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
        } catch (e) {
          console.log('Failed to save comments', text, 'for', selectedItemId);
        }
    }

    render() {
        const { commentsForItem, showModal, selectedItemId } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle="light-content" />
                <View style={styles.avatarConainer}>
                    <Feed 
                        style={styles.feed}
                        commentsForItem={commentsForItem}
                        onPressComments={this.openCommentScreen}  
                    />
                    <Modal
                        visible={showModal}
                        animationType="slide"
                        onRequestClose={this.closeCommentScreen}
                    >
                        <Comments 
                            style={styles.comments}
                            comments={commentsForItem[selectedItemId] || []}
                            onClose={this.closeCommentScreen}
                            onSubmitComment={this.onSubmitComment}
                        />
                    </Modal>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const platformVersion = 
  Platform.OS === 'ios' ? perseInt(Platform.Version, 10) : Platform.Version;
const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#34495E',
    },
    avatarConainer: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
    },
    feed: {
    flex: 1,
    marginTop:
    Platform.OS === 'android' || platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
    },
    comments: {
        flex: 1,
        marginTop:
          Platform.OS === 'ios' || platformVersion < 11
            ? Constants.statusBarHeight
            : 0,
    },

})