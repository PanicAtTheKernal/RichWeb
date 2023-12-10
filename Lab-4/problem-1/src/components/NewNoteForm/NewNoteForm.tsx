import React, {useState, useRef, useEffect } from 'react';
import { NoteValues } from '../NoteArea';
import "./NewNoteForm.css"
import { Subject } from 'rxjs';
import colours from '../../colours';

export type OpenFormRequest = {
    open: boolean,
    request: NoteValues | null
}

export type NewNoteFormProps = {
    itemObservable: Subject<NoteValues>
    openFormSubject: Subject<OpenFormRequest>
}

function NewNoteForm(props: NewNoteFormProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(true);
    const [currentColour, setCurrentColour] = useState<string>("orange");
    const [colourName, setColourName] = useState<Array<string>>(() => {
        let coloursNames: string[] = []
        colours.forEach((value, key) => {
            coloursNames.push(key)
        })
        return coloursNames
    });

    const openFormSubscriber = useRef(props.openFormSubject.subscribe({
        next(request: OpenFormRequest) {
            setOpen(request.open);
            if( request.request != null) {
                setEditMode(true)
                setText(request.request.text)
                setCurrentColour(request.request.colour)
                setKey(request.request.key)
            } else {
                setEditMode(false)
            }
        }
    }))

    const submitHandler = () => {
        console.log(text)
        if (text === "") {
            return;
        };

        const newKey = (editMode) ? key : crypto.randomUUID()

        props.itemObservable.next({
            key: newKey,
            text: text,
            colour: currentColour
        })
        setOpen(false);
        setText("")
    }

    const fetchActivity = async () => {
        setText("")
        setOpen(false);
        try {
            const result = await fetch("http://www.boredapi.com/api/activity/")
            const json = await result.json()
    
            const newKey = (editMode) ? key : crypto.randomUUID()
            const randomColourIndex = Math.floor(Math.random() * colourName.length)
            const newColour = (editMode) ? currentColour : colourName[randomColourIndex]
    
            props.itemObservable.next({
                key: newKey,
                text: json["activity"],
                colour: newColour
            })
            setText("")
        } catch (error) {
            setOpen(true)
            setText("Failed to make suggestion")
        }
    }

    return (
        <dialog id="noteFormDialog" open={open}>
            <form id="noteForm" name="noteForm" method="dialog">
                <div id="FormHeader">
                    <label htmlFor="noteContent" id="noteLabel" className='heading'><h2>Add note:</h2></label>
                    <button className='danger formButton' onClick={() => setOpen(false)}><h3>X</h3></button>
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
                <div id='newNoteFormButtons'>
                    <button id="submitButton" className='active formButton' onClick={submitHandler}>Submit</button>
                    <button id="submitButton" className='active formButton' onClick={async () => { await fetchActivity()}}>Suggestion</button>
                </div>
            </form>
        </dialog>
    );  
}

export default NewNoteForm;
