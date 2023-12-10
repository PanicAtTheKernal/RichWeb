import React, {useState, useRef, useEffect } from 'react';
import Note, { NoteProps } from './Note/Note';
import { Subject, filter } from 'rxjs';
import { OpenFormRequest } from './NewNoteForm/NewNoteForm';

export type NoteValues = {
    key: string,
    text: string,
    colour: string,
    type: string,
}

export enum NoteRequestType {
    Delete,
    Edit
}

export type NoteRequest = {
    type: NoteRequestType,
    key: string
}

type NoteAreaProps = {
    newItemObservable: Subject<NoteValues>
    openFormSubject: Subject<OpenFormRequest>
} 

function NoteArea(props: NoteAreaProps) {
    const noteSubject = useRef(new Subject<NoteRequest>())
    const [notes, setNotes] = useState<Array<NoteValues>>([
        {key: crypto.randomUUID(), text: "Hello world!", colour: "red", type: "education"},
        {key: crypto.randomUUID(), text: "Test note", colour: "blue", type: "education"} 
    ])

    // Function to handle delete note requests
    const deleteSubscriber = useRef(noteSubject.current.pipe(
        filter((request: NoteRequest) => request.type === NoteRequestType.Delete)
        ).subscribe((request: NoteRequest) => {
            setNotes((currentNotes) => {
                // Remove the note that mentioned in the id
                return currentNotes.filter(note => note.key !== request.key)
            })
    }))

    const editSubscriber = useRef(
        noteSubject.current.pipe(
            filter((request: NoteRequest) => request.type === NoteRequestType.Edit)
        ).subscribe((request: NoteRequest) => {
            let requestNoteIndex = notes.findIndex(note => note.key === request.key); 
            props.openFormSubject.next({open: true, request: notes[requestNoteIndex]})
        })    
    )

    const newNoteSubscriber = useRef(props.newItemObservable.subscribe({
        next (newNote: NoteValues) {
            if (notes.find((note) => note.key === newNote.key)) {
                // Loop through the notes and replace the old note with the new note
                setNotes(notes.map((note) => {
                    if (note.key === newNote.key) {
                        return newNote;
                    }
                    return note;
                }));
                return;
            }

            setNotes([
                    ...notes,
                    newNote
            ])
        }
    }))

    return (
        <div className="NoteArea" id="noteArea">
            {notes.map((note) => {
                return <Note id={note.key} text={note.text} colour={note.colour} noteAreaSubject={noteSubject.current} key={note.key} type={note.type}></Note>
            })}
        </div>
    );
}

export default NoteArea;
