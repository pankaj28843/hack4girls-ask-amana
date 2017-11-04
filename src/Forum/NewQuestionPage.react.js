import {ScrollView, StyleSheet, View, Text} from 'react-native';
import React, {Component, PropTypes} from 'react';

import {Toolbar, Button} from 'react-native-material-ui';
// import {Field, Form, Formik} from 'formik';
// import {QuestionForm} from './QuestionForm.react';
import { Form, Input, Label} from 'react-native-clean-form';

const styles = StyleSheet.create({
    inputLabel:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        fontSize: 20,
    },
    submitButton: {
        fontSize: 20,
    },
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


class NewQuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            author: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigator.pop()}
                    centerElement={this.props.route.title}
                />
                <ScrollView style={styles.container}>

                    <Form>
                        <Label><Text style={styles.inputLabel}>Your Name</Text></Label>
                        <Input style={styles.input} placeholder="Enter your name here ..."/>
                        <Label><Text style={styles.inputLabel}>Your Question</Text></Label>
                        <Input
                            style={styles.input}
                            placeholder="Enter your question here ..." multiline={true} numberOfLines={5}
                            inlineLabel={false}/>

                        <Button style={styles.submitButton} raised primary text="POST" icon="done" iconPlacement="right" />

                        {/*<Button icon="md-checkmark" iconPlacement="right" onPress={this.save}>Post</Button>*/}

                    </Form>
                </ScrollView>
            </View>
        );
    }
}

NewQuestionPage.propTypes = propTypes;
NewQuestionPage.contextTypes = contextTypes;

export default NewQuestionPage;
