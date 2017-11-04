import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Component, PropTypes} from 'react';

import {Card, Subheader, Toolbar} from 'react-native-material-ui';
import routes from '../routes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    questionText: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
    },
});

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};


const allQuestions = [
    {
        id: 1,
        'title': 'How to know if I am pregnant or not?',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet mollis nisl. Etiam ut massa sodales, gravida tortor eget, sagittis nisl. Donec finibus nunc quis ullamcorper pharetra. Donec facilisis sed ante efficitur blandit. Nullam tellus dolor, posuere nec rhoncus nec, facilisis ut leo. Suspendisse posuere n',
        'tags': ['pregnancy',],
    },
    {
        id: 2,
        'title': 'How to know if I am pregnant or not?',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet mollis nisl. Etiam ut massa sodales, gravida tortor eget, sagittis nisl. Donec finibus nunc quis ullamcorper pharetra. Donec facilisis sed ante efficitur blandit. Nullam tellus dolor, posuere nec rhoncus nec, facilisis ut leo. Suspendisse posuere n',
        'tags': ['bleeding', 'urgent'],
    },
    {
        id: 3,
        'title': 'How to know if I am pregnant or not?',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet mollis nisl. Etiam ut massa sodales, gravida tortor eget, sagittis nisl. Donec finibus nunc quis ullamcorper pharetra. Donec facilisis sed ante efficitur blandit. Nullam tellus dolor, posuere nec rhoncus nec, facilisis ut leo. Suspendisse posuere n',
        'tags': ['violence', 'urgent'],
    },
];

class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
        };
    }


    componentDidMount() {
        this.fetchQuestions();
    }

    fetchQuestions() {
        this.setState({
            questions: allQuestions,
        });
    }

    render() {
        const questionCards = this.state.questions.map(question =>
            <Card key={question.id} onPress={() => this.props.navigator.push(routes.question)}>
                <Subheader text={question.title} />
                <Text style={styles.questionText}>
                    {question.description}
                </Text>
            </Card>
        );

        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigator.pop()}
                    centerElement={this.props.route.title}
                />
                <ScrollView style={styles.container}>
                    {questionCards}
                </ScrollView>
            </View>
        );
    }
}

QuestionList.propTypes = propTypes;
QuestionList.contextTypes = contextTypes;

export default QuestionList;
