import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import ContactThumbnail from '../components/ContactThumbnail';

import colors from '../utils/colors';
import { fetchUserContact } from '../utils/api'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import store from '../store';

export default class User extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Me',
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
        headerRight: (
            <MaterialIcons 
                name="settings"
                size={24}
                style={{ color: 'white', marginRight: 10 }}
                onPress={() => navigate('Option')}
            />
        ),
    });

    state = {
        user: store.getState().user,
        loading: store.getState().isFetchingUser,
        error: store.getState().error,
    };

    async componentDidMount() {
        // try {
        //     const user = await fetchUserContact();

        //     this.setState({
        //         user,
        //         loading: false,
        //         error: false,
        //     });
        // } catch (e) {
        //     this.setState({
        //         loading: false,
        //         error: true,
        //     });
        // }

        this.unsubscribe = store.onChange(() => 
            this.setState({
                user: store.getState().user,
                loading: store.getState().isFetchingUser,
                error: store.getState().error,
            }));
        const user = await fetchUserContact();

        store.setState({ user, isFetchingUser: false });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { loading, user, error } = this.state;
        const { avatar, name, phone } = user;

        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {error && <Text>Error...</Text>}

                {!loading && (
                    <ContactThumbnail avatar={avatar} name={name} phone={phone} />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue
    },
});