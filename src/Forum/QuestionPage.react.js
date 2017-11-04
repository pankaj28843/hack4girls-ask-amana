import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Component, PropTypes} from 'react';

import {Card, Subheader, Toolbar} from 'react-native-material-ui';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    questionText: {
        padding: 15,
    },
    commentAuthor: {
        fontWeight: 'bold',
    },
    answerTimestamp: {
        paddingLeft: 15,
    },
    answerText: {
        padding: 15,
    },
});

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};


const sampleQuestion = {
    id: 1,
    'title': 'How to know if I am pregnant or not?',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet mollis nisl. Etiam ut massa sodales, gravida tortor eget, sagittis nisl. Donec finibus nunc quis ullamcorper pharetra. Donec facilisis sed ante efficitur blandit. Nullam tellus dolor, posuere nec rhoncus nec, facilisis ut leo. Suspendisse posuere n',
    'tags': ['pregnancy',],
    'answers': [
        {
            id: 1,
            'author': 'Hala Kasim',
            'text': 'भोजेश्वर मन्दिर मध्य प्रदेश की राजधानी भोपाल से लगभग ३० किलोमीटर दूर स्थित भोजपुर नामक गांव में बना एक मन्दिर है। यह मन्दिर बेतवा नदी के तट पर विन्ध्य पर्वतमालाओं के मध्य एक पहाड़ी पर स्थित है।',
            'timestamp': "2017-11-04T14:47:19.998Z",
        },
        {
            id: 2,
            'author': 'Health Professional',
            'text': 'You are fine, do not worry.',
            'timestamp': "2017-11-04T14:47:19.998Z",
        },
        {
            id: 3,
            'author': 'A new friend in this app',
            'text': 'وتُقسم كل دورة بناءً على الأحداث التي تحدث في المبيض أو تلك التي تحدث في الرحم إلى ثلاثة أطوار: الطور الجرابي والتبويض وطور الجسم الأصفر في الدورة المبيضية والحيض وطور التكاثر والطور الإفرازي في الدورة الرحمية[1]، ويُتحكم بكلتي الدورتين بهرمونات جهاز الغدد الصماء[4]، ويمكن لموانع الحمل الهرمونية أن تتعارض مع التغيرات الهرمونية الطبيعة بشكل يمنع عملية التكاث',
            'timestamp': "2017-11-04T14:47:19.998Z",
        },
    ],
};

class QuestionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: null,
        };
    }


    componentDidMount() {
        this.getQuestionByID();
    }

    getQuestionByID() {
        this.setState({
            question: sampleQuestion,
        });
    }

    render() {
        const question = this.state.question;
        if (!question) {
            return null;
        }

        const commentCards = question.answers.map(answer =>
            <Card key={answer.id}>
                <Subheader text={"By " + answer.author} />
                <Text style={styles.answerTimestamp}>Posted on: {answer.timestamp}</Text>
                <Text style={styles.answerText}>
                    {answer.text}
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

                    <Card>
                        <Subheader text={question.title}/>
                        <Text style={styles.questionText}>
                            {question.description}
                        </Text>
                    </Card>
                    {commentCards}
                </ScrollView>
            </View>
        );
    }
}

QuestionPage.propTypes = propTypes;
QuestionPage.contextTypes = contextTypes;

export default QuestionPage;
