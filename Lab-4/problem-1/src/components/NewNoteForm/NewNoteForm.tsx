import React, {useState, useRef, useEffect } from 'react';
import { NoteValues } from '../NoteArea';
import { Subject } from 'rxjs';

export type NewNoteFormProps = {
    itemObservable: Subject<NoteValues>
    openFormSubject: Subject<boolean>
}

function NewNoteForm(props: NewNoteFormProps) {
    const [open, setOpen] = useState<boolean>(false);

    const openFormSubscriber = useRef(props.openFormSubject.subscribe({
        next(open: boolean) {
            setOpen(open)
        }
    }))

    return (
        <dialog id="noteFormDialog" open={open}>
            <form id="noteForm" name="noteForm" method="dialog">
                <label htmlFor="noteContent" id="noteLabel"><h3>Add note:</h3></label>
                <br></br>
                <textarea id="noteContent" name="noteContent" rows={5} cols={40} required></textarea>
                <br></br>
                <input id="noteEdit" name="noteEdit" type="hidden" value="false"/>
                <input id="noteIndex" name="noteIndex" type="hidden" value="0"/>
                <div id="colourSelection">
                </div>
                <button id="submitButton">Submit</button>
            </form>
        </dialog>
    );  
}

export default NewNoteForm;
