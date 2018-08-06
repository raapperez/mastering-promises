import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import beautify from 'js-beautify';
import hljs from 'highlightjs';

const beautifyOptions = {
  break_chained_methods: true,
  indent_size: 2,
}

class Question extends PureComponent {

  static propTypes = {
    isMultiplayer: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    problem: PropTypes.func.isRequired,
    answers: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    hljs.initHighlighting();
  }

  render() {
    const { isMultiplayer, description, problem } = this.props;
    return (
      <div>
        <div>{description}</div>
        <div>
          <pre>
            <code className="javascript" dangerouslySetInnerHTML={{
              __html: beautify(problem.toString(), beautifyOptions).replace(/\n/g, '<br>')
                .replace(/\s/g, '&nbsp;')
            }}>
            </code>
          </pre>
        </div>
      </div>
    );
  }
}

export default Question;
