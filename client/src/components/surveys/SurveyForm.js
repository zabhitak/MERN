import _ from 'lodash';
import React from 'react';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(formFields, ({label, name}) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  //   <div>
  //     <Field
  //       label="Survey Title"
  //       type="text"
  //       name="surveyTitle"
  //       // component="input"
  //       component={SurveyField}
  //     />
  //     <Field
  //       label="Email Body"
  //       type="text"
  //       name="body"
  //       component={SurveyField}
  //     />

  //     <Field label="Email" type="text" name="title" component={SurveyField} />

  //     <Field
  //       label="Receipient Title"
  //       type="text"
  //       name="emails"
  //       component={SurveyField}
  //     />
  //   </div>

//   onSurveySubmit = (formValues) => {
//     console.log(formValues);
//     this.props.onSubmit();
//   };

  render() {
    
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({name}) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
