import React, { useState, useEffect } from 'react';
import colours from '../../colours';
import "./Note.css"
import { Subject } from 'rxjs';
import { NoteRequest, NoteRequestType } from '../NoteArea';

export type NoteProps = {
    id: string,
    text: string,
    colour: string,
    noteAreaSubject: Subject<NoteRequest>
}

function Note(props: NoteProps) {
    const [text, setText] = useState<string>("")
    const [colour, setColour] = useState<string>("")

    useEffect(() => {
        setText(props.text)
        let colour = colours.get(props.colour)
        if (colour === undefined) {  
            return;
        }
        setColour(`hsl(${colour[0]}, ${colour[1]}%, ${colour[2]}%)`)
    }, [props])

    return (
        <div className="Note" id="note" style={{backgroundColor: colour}}>
            <div className="NoteHeader">
                <button className="active">Edit</button>
                <button className="danger" onClick={() => props.noteAreaSubject.next({type: NoteRequestType.Delete, key: props.id})}>Delete</button>
            </div>
            <div>
                {text}
            </div>
        </div>
    );
}

export default Note;
