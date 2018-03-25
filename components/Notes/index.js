import CodeMirror from 'react-codemirror';
require('codemirror/mode/markdown/markdown');

const Notes = props => (
  <CodeMirror
    className="Notes"
    value={`# My notes\n\n- [url](${props.url})\n\n...`}
    options={{ mode: 'markdown' }}
  />
);

export default Notes;
