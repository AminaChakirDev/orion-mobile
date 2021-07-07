import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Exams from './Exams';
import Home from './Home';
import React from 'react';

const Tab = createBottomTabNavigator();

const Shell = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Exams" component={Exams}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
};

export default Shell;