import {Field, Form} from 'formik';
import React, {Component} from 'react';
import {View} from 'react-native';

class QuestionForm extends Component() {
    render() {
        return (
                <Form className="whatever">
                    <Field name="firstName" placeholder="First Name"/>
                    <Field name="lastName" placeholder="Last Name"/>
                    <Field name="email" type="email" placeholder="Email Address"/>
                    <button type="submit">Submit</button>
                </Form>
        );
    }
}

export default QuestionForm;
