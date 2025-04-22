import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here');

  return (
    <div className="h-[500px]">
      <Editor
        height="100%"
        defaultLanguage="cpp" // or "javascript", "python", etc
        defaultValue={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark" // or "light"
      />
    </div>
  );
};

export default CodeEditor;