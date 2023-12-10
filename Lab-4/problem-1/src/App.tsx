import React, { useState, useRef } from 'react';
import Header from './components/Header/Header';
import NoteArea, { NoteValues } from './components/NoteArea';
import { Subject } from 'rxjs';
import NewNoteForm, { OpenFormRequest } from './components/NewNoteForm/NewNoteForm';

function App() {
  const itemObservable = useRef(new Subject<NoteValues>());
  const openFormSubject = useRef(new Subject<OpenFormRequest>());
  const filterSubject = useRef(new Subject<string>());

  return (
    <div className="App" id="main">
      <NewNoteForm itemObservable={itemObservable.current} openFormSubject={openFormSubject.current}></NewNoteForm>
      <Header openFormSubject={openFormSubject.current} filterSubject={filterSubject.current}></Header>
      <NoteArea newItemObservable={itemObservable.current} openFormSubject={openFormSubject.current} filterSubject={filterSubject.current}></NoteArea>
    </div>
  );
}

export default App;
