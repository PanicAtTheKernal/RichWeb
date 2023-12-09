import React, { useState, useRef } from 'react';
import Header from './components/Header/Header';
import NoteArea from './components/NoteArea';
import Note from './components/Note/Note';
import { Subject } from 'rxjs';

function App() {
  const itemObservable = useRef(new Subject<React.JSX.Element>());

  return (
    <div className="App" id="main">
      <Header></Header>
      <NoteArea newItemObservable={itemObservable.current}></NoteArea>
    </div>
  );
}

export default App;
