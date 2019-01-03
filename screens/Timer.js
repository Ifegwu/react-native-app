import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import uuidv4 from 'uuidv4';

import { newTimer } from '../utils/TimerUtils';
import EditableTimer from '../components/EditableTimer';
import ToggleableTimerForm from '../components/ToggleableTimerForm';
import colors from '../utils/colors';

export default class Timer extends React.Component {

  static navigationOptions = ({ navigation: { navigate } }) => ({ 
    title: 'Timer',
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
    timers: [
      {
        title: 'mow the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true,
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false,
      },
    ],
  }

  async componentDidMount() {
   
    const TIMER_INTERVAL = 1000;
   
    this.intervalId = setInterval(() => {
      const { timers } = this.state;
   
      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;
   
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIMER_INTERVAL : elapsed,
          };
        }),
      });
    }, TIMER_INTERVAL);

  }
   
     componentWillUnmount() {
       clearInterval(this.intervalId);
     }

     hadleCreateFormSubmit = timer => {
        const { timers } = this.state;
    
        this.setState({
          timers: [newTimer(timer), ...timers],
        });
      };
    
    handleFormSubmit = attrs => {
      const { timers } = this.state;
    
       this.setState({
         timers: timers.map(timer => {
           if (timer.id === attrs.id) {
             const { title, project } = attrs;
    
             return {
              ...timer,
              title,
              project,
            };
           }
    
           return timer;
         }),
       });
    };
    
    handleRemovePress = timerId => {
      this.setState({
        timers: this.state.timers.filter(t => t.id !== timerId),
      })
    }
    
    toggleTimer = timerId => {
      this.setState(prevState => {
        const { timers } = prevState;
        return {
          timers: timers.map(timer => {
            const { id, isRunning } = timer;
            if (id === timerId) {
              return {
                ...timer,
                isRunning: !isRunning,
              };
            }
            return timer;
           }),
        };
      });
    };

    render() {
      const { timers } = this.state;
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.detailsContainer}>
              <View style={styles.appContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Timers</Text>
                </View>
                <ScrollView style={styles.timerList}>
                  <ToggleableTimerForm  onFormSubmit={this.hadleCreateFormSubmit} />
                  {timers.map(({ title, project, id, elapsed, isRunning }) => (
                    <EditableTimer 
                      key={id}
                      id={id}
                      title={title}
                      project={project}
                      elapsed={elapsed}
                      isRunning={isRunning}
                      onFormSubmit={this.handleFormSubmit}
                      onRemovePress={this.handleRemovePress}
                      onStartPress={this.toggleTimer}
                      onStopPress={this.toggleTimer}
                  />
                  ))}
                </ScrollView>
              </View>
          </View>
        </KeyboardAvoidingView>
      )
    }
}

const platformVersion = 
  Platform.OS === 'ios' ? perseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    padding: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  },
});