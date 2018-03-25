import { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import './Notes.css';

class Notes extends Component {
  state = { mode: 'text' };

  componentDidMount() {
    require('codemirror/mode/markdown/markdown');
    this.setState({ mode: 'markdown' });
  }

  render() {
    const { mode } = this.state;
    return (
      <CodeMirror
        dataLoaded={this.state.loaded}
        className="Notes"
        value={`# My notes\n\n- [url](${this.props.url})\n\n...`}
        options={{ mode }}
      />
    );
  }
}

export default Notes;
