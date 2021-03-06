import React, {Component, PropTypes} from 'react';
import {Animated, Easing, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';


import {Avatar, Card, ListItem, Subheader, Toolbar} from 'react-native-material-ui';


import routes from '../routes';

import Container from '../Container';
// components

const UP = 1;
const DOWN = -1;


const styles = StyleSheet.create({
    cardContainer: {
        // width: '100%',
        flex: 1,
        justifyContent: 'center',
        height: 100,
        alignItems: 'center',
        // margin: '20 auto',
    },
    cardTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.offset = 0;
        this.scrollDirection = 0;

        this.state = {
            selected: [],
            searchText: '',
            searchResults: null,
            searchInProgress: false,
            toolbarHidden: false,
            active: 'people',
            moveAnimated: new Animated.Value(0),
        };
    }

    onAvatarPressed = (value) => {
        const {selected} = this.state;

        const index = selected.indexOf(value);

        if (index >= 0) {
            // remove item
            selected.splice(index, 1);
        } else {
            // add item
            selected.push(value);
        }

        this.setState({selected});
    }
    onScroll = (ev) => {
        const currentOffset = ev.nativeEvent.contentOffset.y;

        const sub = this.offset - currentOffset;

        // don't care about very small moves
        if (sub > -2 && sub < 2) {
            return;
        }

        this.offset = ev.nativeEvent.contentOffset.y;

        const currentDirection = sub > 0 ? UP : DOWN;

        if (this.scrollDirection !== currentDirection) {
            this.scrollDirection = currentDirection;

            this.setState({
                bottomHidden: currentDirection === DOWN,
            });
        }
    }
    show = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    hide = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 56, // because the bottom navigation bar has height set to 56
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    renderToolbar = () => {
        if (this.state.selected.length > 0) {
            return (
                <Toolbar
                    key="toolbar"
                    leftElement="clear"
                    onLeftElementPress={() => this.setState({selected: []})}
                    centerElement={this.state.selected.length.toString()}
                    rightElement={['delete']}
                    style={{
                        container: {backgroundColor: 'white'},
                        titleText: {color: 'rgba(0,0,0,.87)'},
                        leftElement: {color: 'rgba(0,0,0,.54)'},
                        rightElement: {color: 'rgba(0,0,0,.54)'},
                    }}
                />
            );
        }
        return (
            <Toolbar
                key="toolbar"
                leftElement="menu"
                onLeftElementPress={() => this.props.navigator.pop()}
                centerElement={this.props.route.title}
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                    onChangeText: query => this.search(query),
                    onSearchClosed: () => this.closeSearch(),
                }}
            />
        );
    }
    renderItem = (title, route) => {
        const searchText = this.state.searchText.toLowerCase();

        if (searchText.length > 0 && title.toLowerCase().indexOf(searchText) < 0) {
            return null;
        }

        return (
            <ListItem
                divider
                leftElement={<Avatar text={title[0]}/>}
                onLeftElementPress={() => this.onAvatarPressed(title)}
                centerElement={title}
                onPress={() => this.props.navigator.push(route)}
            />

        );
    }

    search(query) {

        // this.setState({
        //     searchText: query,
        // });
        query = query.trim();
        if (query.length < 3) {
            this.searchResults = null;
            return;
        }

        // console.log(query);
        const url = `https://askasanah.herokuapp.com/search?q=${query}`;
        // console.log(url);
        this.searchInProgress = true;
        // this.setState({
        //     searchInProgress: true,
        // });

        return fetch(url).then(
            response => {
                this.searchInProgress = false;
                return response.json();
            }
    ).then(categories => {
            categories = Array.from(Object.entries(categories));
            const searchResults = [];
            for (const [categoryName, matchedResults] of categories) {
                // console.log(categoryName, matchedResults.length);
                if (matchedResults.length === 0) {
                    continue;
                }
                const categoryResults = matchedResults.map(obj => <ListItem
                    key={obj.id}
                    divider
                    centerElement={obj.title}
                />);
                searchResults.push(
                    <View key={categoryName}>
                        <Subheader text={categoryName}/>

                        {categoryResults}
                    </View>
                );
            }

            // console.log(searchResults);

            this.setState({
                searchResults: searchResults,
            })
            // this.searchResults = searchResults;

            // this.setState({
            //     searchInProgress: false,
            // });

        }).catch(error => {
            // this.setState({
            //     searchInProgress: false,
            //     searchResults: null,
            // });
            this.searchResults = null;
            this.setState({
                searchResults: null,
            })
        });
    }

    closeSearch() {
        this.setState({
            searchText: '',
            searchResults: null
            // searchInProgress: false,
        });
        // this.searchResults = null;
    }


    render() {

        let searchInProgress = null;
        if (this.searchInProgress){
            searchInProgress = <View>
                <Text>Loading results ...</Text>
            </View>;
        }

        return (
            <Container>
                {this.renderToolbar()}
                {searchInProgress}
                {this.state.searchResults}
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="interactive"
                    onScroll={this.onScroll}
                >
                    <Card
                        style={styles.cardStyle}
                        onPress={() => this.props.navigator.push(routes.getHelp)}
                    >
                        <View style={styles.cardContainer}>
                            <Text style={styles.cardTitle}>GET HELP</Text>
                        </View>
                    </Card>

                    <Card
                        style={styles.cardStyle}
                        onPress={() => this.props.navigator.push(routes.questionList)}
                    >
                        <View style={styles.cardContainer}>
                            <Text style={styles.cardTitle}>ASK ANYTHING</Text>
                        </View>
                    </Card>
                    <Card
                        style={styles.cardStyle}
                        onPress={() => this.props.navigator.push(routes.topicList)}
                    >
                        <View style={styles.cardContainer}>
                            <Text style={styles.cardTitle}>LEARN</Text>
                        </View>
                    </Card>


                    {/*{this.renderItem('Action buttons', routes.actionButton)}*/}
                    {/*{this.renderItem('Avatars', routes.avatar)}*/}
                    {/*{this.renderItem('Badge', routes.badge)}*/}
                    {/*{this.renderItem('Bottom navigation', routes.bottomNavigation)}*/}
                    {/*{this.renderItem('Buttons', routes.button)}*/}
                    {/*{this.renderItem('Cards', routes.card)}*/}
                    {/*{this.renderItem('Checkbox', routes.checkbox)}*/}
                    {/*{this.renderItem('Dialog', routes.dialog)}*/}
                    {/*{this.renderItem('Drawer', routes.drawer)}*/}
                    {/*{this.renderItem('Icon toggles', routes.iconToggle)}*/}
                    {/*{this.renderItem('List items', routes.list)}*/}
                    {/*{this.renderItem('Radio buttons', routes.radioButton)}*/}
                    {/*{this.renderItem('Toolbars', routes.toolbar)}*/}
                </ScrollView>

                {/*<BottomNavigation*/}
                {/*active={this.state.active}*/}
                {/*hidden={this.state.bottomHidden}*/}
                {/*style={{container: {position: 'absolute', bottom: 0, left: 0, right: 0}}}*/}
                {/*>*/}
                {/*<BottomNavigation.Action*/}
                {/*key="today"*/}
                {/*icon={<Icon name="today"/>}*/}
                {/*label="Today"*/}
                {/*onPress={() => this.setState({active: 'today'})}*/}
                {/*/>*/}
                {/*<BottomNavigation.Action*/}
                {/*key="people"*/}
                {/*icon="people"*/}
                {/*label="People"*/}
                {/*onPress={() => this.setState({active: 'people'})}*/}
                {/*/>*/}
                {/*<BottomNavigation.Action*/}
                {/*key="bookmark-border"*/}
                {/*icon="bookmark-border"*/}
                {/*label="Bookmark"*/}
                {/*onPress={() => this.setState({active: 'bookmark-border'})}*/}
                {/*/>*/}
                {/*<BottomNavigation.Action*/}
                {/*key="settings"*/}
                {/*icon="settings"*/}
                {/*label="Settings"*/}
                {/*onPress={() => this.setState({active: 'settings'})}*/}
                {/*/>*/}
                {/*</BottomNavigation>*/}
            </Container>


        );
    }
}

Home.propTypes = propTypes;

export default Home;
