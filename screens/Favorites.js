import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';

import ContactThumbnail from '../components/ContactThumbnail';
const keyExtractor = ({ phone }) => phone;
import { fetchContacts } from '../utils/api';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import colors from '../utils/colors';
import store from '../store';

export default class Favorites extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({ 
        title: 'Favorites',
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
        )
    });

    state = {
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
    };

    async componentDidMount() {
        // try {
        //     const contacts = await fetchContacts();

        //     this.setState({
        //         contacts,
        //         loading: false,
        //         error: false,
        //     });
        // } catch (e) {
        //     this.setState({
        //         loading: false,
        //         error: true,
        //     });
        // }
        const { contacts } = this.state;
        this.unsubscribe =  store.onChange(() => 
            this.setState({
                contacts: store.getState().contacts,
                loading: store.getState().isFetchingContacts,
                error: store.getState().error,
            }));
        
        if (contacts.length === 0) {
            const fetchContacts = await fetchContacts();

            store.setState({ contacts: fetchContacts, isFetchingContacts: false});
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    renderFavoriteThumbnail = ({ item }) => {
        const { navigation: {navigate } } = this.props;
        const { avatar } = item;

        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => navigate('Profile', { contact: item })}  
            />

        );
    };

    render() {
        const { loading, contacts, error } = this.state;
        const favorites = contacts.filter(contact => contact.favorites);

        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {error && <Text>Error...</Text>}
                
                {!loading &&
                    !error && (
                        <FlatList
                            data={favorites}
                            keyExtractor={keyExtractor}
                            numColumns={3}
                            contentContainerStyle={styles.list}
                            renderItem={this.renderFavoriteThumbnail}
                        />
                    )}
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    list: {
        alignItems: 'center',
    },
});