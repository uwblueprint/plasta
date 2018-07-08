import { Form, Text } from 'react-form';
import React, { Component } from 'react';

class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Form onSubmit={submittedValues => this.setState({ submittedValues })}>
          {formApi => (
            <div>
              <button
                onClick={() => formApi.addValue('siblings', '')}
                type="button"
                className="mb-4 mr-4 btn btn-success"
              >
                Add Plastic
              </button>
              <form onSubmit={formApi.submitForm} id="dynamic-form">
                {formApi.values.siblings &&
                  formApi.values.siblings.map((sibling, i) => (
                    <div key={`sibling${i}`}>
                      <label htmlFor={`sibling-name-${i}`}>PlasticType</label>
                      <Text field={['siblings', i]} id={`sibling-name-${i}`} />
                      <button
                        onClick={() => formApi.removeValue('siblings', i)}
                        type="button"
                        className="mb-4 btn btn-danger"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </form>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default DynamicForm;
