import React, {useState, useRef, useEffect } from 'react';
import { NoteValues } from '../NoteArea';
import "./NewNoteForm.css"
import { Subject } from 'rxjs';

export type NewNoteFormProps = {
    itemObservable: Subject<NoteValues>
    openFormSubject: Subject<boolean>
}

function NewNoteForm(props: NewNoteFormProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");

    const openFormSubscriber = useRef(props.openFormSubject.subscribe({
        next(open: boolean) {
            setOpen(open)
        }
    }))

    const submitHandler = () => {
        setOpen(false);
        console.log(text)
        if (text === "") return;

        props.itemObservable.next({
            key: crypto.randomUUID(),
            text: text,
            colour: "red"
        })
    }


    return (
        <dialog id="noteFormDialog" open={open}>
            <form id="noteForm" name="noteForm" method="dialog">
                <div id="FormHeader">
                    <label htmlFor="noteContent" id="noteLabel" className='heading'><h2>Add note:</h2></label>
                    <button className='danger' onClick={() => setOpen(false)}><h3>X</h3></button>
                </div>
                <textarea id="noteContent" name="noteContent" rows={5} cols={40} onChange={(newText) => setText(newText.target.value)} required></textarea>
                <input id="noteEdit" name="noteEdit" type="hidden" value="false"/>
                <input id="noteIndex" name="noteIndex" type="hidden" value="0"/>
                <div id="colourSelection">
                </div>
                <button id="submitButton" className='active' onClick={submitHandler}>Submit</button>
            </form>
        </dialog>
    );  
}

export default NewNoteForm;
