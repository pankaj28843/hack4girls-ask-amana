import { Text, View, StyleSheet, ScrollView, ToastAndroid, Platform } from 'react-native';
import React, { Component, PropTypes } from 'react';

import { ListItem, Subheader, Toolbar, Card } from 'react-native-material-ui';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class GetHelpMainPage extends Component {
    render() {
        const { listItem } = this.context.uiTheme;
        const flattenPrimaryText = StyleSheet.flatten(listItem.primaryText);

        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigator.pop()}
                    centerElement={this.props.route.title}
                />
                <ScrollView style={styles.container}>
                    <Card>
                        <Subheader text="DOCTOR" />
                        <ListItem
                            divider
                            centerElement="Sickness"
                            onPress={() => {}}
                        />
                        <ListItem
                            divider
                            centerElement="Pregnancy"
                            onPress={() => {}}
                        />
                        <ListItem
                            divider
                            centerElement="Bleeding"
                            onPress={() => {}}
                        />
                        <ListItem
                            divider
                            centerElement="Psychological"
                            onPress={() => {}}
                        />
                    </Card>

                    <Card>
                        <Subheader text="NGO" />
                        <ListItem
                            divider
                            centerElement="Delivery Kit"
                            onPress={() => {}}
                        />
                        <ListItem
                            divider
                            centerElement="Get child in school"
                            onPress={() => {}}
                        />
                        <ListItem
                            divider
                            centerElement="Learn at Home"
                            onPress={() => {}}
                        />

                    </Card>


                    <Card>
                        <Subheader text="Talk to someone" />
                        <ListItem
                            divider
                            centerElement="Health Professional"
                            onPress={() => {}}
                        />
                        <ListItem
                            divider
                            centerElement="Someone of your age-group"
                            onPress={() => {}}
                        />

                    </Card>

                </ScrollView>
            </View>
        );
    }
}

GetHelpMainPage.propTypes = propTypes;
GetHelpMainPage.contextTypes = contextTypes;

export default GetHelpMainPage;
