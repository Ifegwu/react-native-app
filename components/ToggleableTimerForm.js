import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

export default class ToggleableTimerForm extends React.Component {
    state = { isOpen: false };

    handleFormOpen = () => {
        this.setState({ isOpen: true });
    }

    handleFormClose= () => {
        this.setState({ isOpen: false });
    };

    handleFormSumbit = timer => {
        const { onFormSubmit } = this.props;

        onFormSubmit(timer);
        this.setState({ isOpen: false });
    }

    static propTypes = {
        onFormSubmit: PropTypes.func.isRequired,
    }

    render() {
        const { isOpen } = this.state;
        return (
            <View style={[styles.container, !isOpen && styles.buttonPadding]}>
                {isOpen ? (
                    <TimerForm 
                        onFormSubmit={this.handleFormSumbit}
                        onFormClose={this.handleFormClose}
                    /> 
                ): (
                    <TimerButton title="+" color="green" onPress={this.handleFormOpen}/>
                )}
            </View>
        );  
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    buttonPadding: {
        paddingHorizontal: 15,
    },
});