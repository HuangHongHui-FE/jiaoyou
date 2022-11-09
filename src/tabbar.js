import React, {Component} from 'react';

import {View, Text} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {SvgUri} from 'react-native-svg-uri';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import {maleSvg} from './res/fonts/iconSvg';
class Tabbar extends Component {
  state = {
    selectedTab: 'home',
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>tabbar</Text>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Home"
            renderIcon={() => (
              <SvgUri width="40" height="40" svgXmlData={maleSvg} />
            )}
            renderSelectedIcon={() => (
              <SvgUri width="40" height="40" svgXmlData={maleSvg} />
            )}
            badgeText="1"
            onPress={() => this.setState({selectedTab: 'home'})}>
            {homeView}
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            title="Profile"
            renderIcon={() => (
              <SvgUri width="40" height="40" svgXmlData={maleSvg} />
            )}
            renderSelectedIcon={() => (
              <SvgUri width="40" height="40" svgXmlData={maleSvg} />
            )}
            // renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({selectedTab: 'profile'})}>
            {profileView}
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}
export default Tabbar;
