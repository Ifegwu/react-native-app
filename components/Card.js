import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import AuthorRow from './AuthorRow';

export default class Card extends React.Component {
    state = {
        loading: true,
    };

    handleLoad = () => {
        this.setState({ loading: false });
    };

    static propTypes = {
        fullname: PropTypes.string.isRequired,
        image: Image.propTypes.source.isRequired,
        linkText: PropTypes.string,
        onPressLinkText: PropTypes.func,
    };

    static defaultProps = {
        linkText: '',
        onPressLinkText: () => {},
    };


    shouldComponentUpdate(nextProps) {
        return this.props.linkText !== nextProps.linkText
    };
    
    render() {
        const { fullname, image, linkText, onPressLinkText } = this.props;
        const { loading } = this.state;
        return (
            <View>
                <AuthorRow
                    fullname={fullname}
                    linkText={linkText}
                    onPressLinkText={onPressLinkText}
                />
                <Image style={styles.image} source={image} onLoad={this.handleLoad} />
                <View style={styles.image}>
                    {loading && (
                        <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
                    )}
                    <Image 
                        //style={StyleSheet.absoluteFill}
                        style={{ flex: 1 }}
                        source={image}
                        onLoad={this.handleLoad}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
});