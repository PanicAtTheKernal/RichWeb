import React, {useState, useRef, useEffect } from 'react';
import { NoteValues } from '../NoteArea';
import "./NewNoteForm.css"
import { Subject } from 'rxjs';
import colours from '../../colours';

export type NewNoteFormProps = {
    itemObservable: Subject<NoteValues>
    openFormSubject: Subject<boolean>
}

function NewNoteForm(props: NewNoteFormProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [checked, setChecked] = useState<boolean>(true);
    const [currentColour, setCurrentColour] = useState<string>("orange");
    const [colourName, setColourName] = useState<Array<string>>(() => {
        let coloursNames: string[] = []
        colours.forEach((value, key) => {
            coloursNames.push(key)
        })
        return coloursNames
    });

    const openFormSubscriber = useRef(props.openFormSubject.subscribe({
        next(open: boolean) {
            setOpen(open)
        }
    }))

    const submitHandler = () => {
        console.log(text)
        if (text === "") {
            return;
        };

        props.itemObservable.next({
            key: crypto.randomUUID(),
            text: text,
            colour: currentColour
        })
        setOpen(false);
        setText("")
    }

    useEffect(() => {

    }, [])

    return (
        <dialog id="noteFormDialog" open={open}>
            <form id="noteForm" name="noteForm" method="dialog">
                <div id="FormHeader">
                    <label htmlFor="noteContent" id="noteLabel" className='heading'><h2>Add note:</h2></label>
                    <button className='danger' onClick={() => setOpen(false)}><h3>X</h3></button>
                </div>
                <textarea id="noteContent" name="noteContent" value={text} rows={5} cols={40} onChange={(newText) => setText(newText.target.value)} placeholder="Enter note content" required></textarea>
                <input id="noteEdit" name="noteEdit" type="hidden" value="false"/>
                <input id="noteIndex" name="noteIndex" type="hidden" value="0"/>
                <div id="colourSelection">
                    <label><h3>Select colour:</h3></label>
                    {
                        colourName.map((colour, index) => {
                            return <div id="colourSelectionField">
                                <input type="radio" id={colour} name="noteColour" value={colour} checked={currentColour === colour} onChange={(newColour) => {setCurrentColour(newColour.target.value)}}></input>
                                <label htmlFor={colour} style={{color: "white"}}>{colour}</label>
                            </div>
                        })
                    }
                </div>
                <button id="submitButton" className='active' onClick={submitHandler}>Submit</button>
            </form>
        </dialog>
    );  
}

export default NewNoteForm;
