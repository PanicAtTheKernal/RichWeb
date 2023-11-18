import * as rxjs from 'rxjs';

const colours = {
    red: [0, 100, 65],
    blue: [216, 100, 65],
    green: [120, 100, 65],
    yellow: [60, 100, 65],
    orange: [36, 100, 65],
};

class Note {
    constructor(text, colour, parent, notes) {
        this.notes = notes;
        this.text = text;
        this.colour = colour;
        this.deleteSubject = new rxjs.Subject;
        this.parent = parent;
        if (parent != null) {
            this.deleteSubscription = this.parent.deleteSubject.subscribe(() => {
                console.log("Child note \"" + this.text + "\" has been notified of deletion");
                this.delete();
            })
        }
    }

    delete() {
        this.deleteSubject.next();
        if (this.deleteSubscription != null) {
            this.deleteSubscription.unsubscribe();
        }
        const noteIndex = this.notes.notes.indexOf(this);
        this.notes.notes.splice(noteIndex, 1)
        console.log("Note " + this.content + " has been deleted");
    }
}

class Notes {
    constructor(InitialNotes, maxCols) {
        this.notes = InitialNotes;
        this.maxCols = maxCols;
        this.renderNotes();
    }

    addNote(content, colour, parent) {
        this.notes.push(new Note(content, colour, parent, this));
        this.renderNotes()
    }

    editNote(content, colour, index) {
        this.notes[index].text = content;
        this.notes[index].colour = colour;
        this.renderNotes();
    }

    deleteNote(index) {
        this.notes[index].delete();
        this.renderNotes();
    }

    getNote(index) {
        return this.notes[index];
    }

    renderNotes() {
        const noteArea = document.getElementById("noteArea");

        noteArea.innerHTML = "";

        this.notes.forEach((note, index) => {
            const newNote = document.createElement("div");
            const noteHeading = document.createElement("div");
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");

            editButton.textContent = "Edit";
            rxjs.fromEvent(editButton, "click").subscribe(() => openNoteDialog(index));
            
            deleteButton.textContent = "Delete";
            rxjs.fromEvent(deleteButton, "click").subscribe(() => notes.deleteNote(index));
                        
            noteHeading.className = "noteHeader";
            noteHeading.appendChild(editButton);
            noteHeading.appendChild(deleteButton);
            
            newNote.className = "note";
            newNote.style = `background-color: hsl(${colours[note.colour][0]}, ${colours[note.colour][1]}%, ${colours[note.colour][2]}%)`;
            newNote.appendChild(noteHeading);
            newNote.appendChild(document.createTextNode(note.text));
            
            noteArea.appendChild(newNote);
        })
    }
}

const notes = new Notes([]);
notes.addNote("Test note", "red");
notes.addNote("Another note", "blue");
createColourSelection();

function submitNote() {
    const noteContent = document.forms["noteForm"]["noteContent"].value;
    const noteColour = document.forms["noteForm"]["noteColour"].value;
    const noteParent = document.forms["noteForm"]["noteParent"].value;
    const noteDialog = document.getElementById("noteFormDialog");
    if(document.getElementById("noteEdit").value == "true") {
        const noteIndex = parseInt(document.getElementById("noteIndex").value);
        notes.editNote(noteContent, noteColour, noteIndex);
    } else {
        notes.addNote(noteContent, noteColour, noteParent);
    }
    noteDialog.close();
}

function openNoteDialog(noteIndex) {
    if (noteIndex != undefined) {
        document.getElementById("noteLabel").innerText = "Edit note:";
        document.getElementById("noteContent").value = notes.getNote(noteIndex).text;
        document.getElementById("noteEdit").value = "true";
        document.getElementById("noteIndex").value = `${noteIndex}`;
    } else {
        document.getElementById("noteLabel").innerText = "Add note:";
        document.getElementById("noteContent").value = "";
        document.getElementById("noteEdit").value = "false";
    }
    createParentSelection();
    const noteDialog = document.getElementById("noteFormDialog");
    noteDialog.show();
}

function createParentSelection() {
    const parentSelection = document.getElementById("parentSelection");
    const parents = notes.notes;
    const title = document.createElement("label")
    title.textContent = "Select parent:";

    parentSelection.innerHTML = "";
    parentSelection.appendChild(title);
    parentSelection.appendChild(document.createElement("br"));

    parents.forEach((key, index) => {
        const radioButton = document.createElement("input");
        const label = document.createElement("label");

        radioButton.type = "radio";
        radioButton.id = key;
        radioButton.name = "noteParent";
        radioButton.value = key;
        if (index === 0) radioButton.checked = true;

        label.setAttribute("for", key);
        label.textContent = `Note: ${key.text}`;

        parentSelection.appendChild(radioButton);
        parentSelection.appendChild(label);
        parentSelection.appendChild(document.createElement("br"));
    });
}

function createColourSelection() {
    const colourSelection = document.getElementById("colourSelection");
    const colourKeys = Object.keys(colours);
    const title = document.createElement("label")
    title.textContent = "Select colour:";

    colourSelection.appendChild(title);
    colourSelection.appendChild(document.createElement("br"));
    
    colourKeys.forEach((key, index) => {
        const radioButton = document.createElement("input");
        const label = document.createElement("label");

        radioButton.type = "radio";
        radioButton.id = key;
        radioButton.name = "noteColour";
        radioButton.value = key;
        if (index === 0) radioButton.checked = true;

        label.setAttribute("for", key);
        label.textContent = key;

        colourSelection.appendChild(radioButton);
        colourSelection.appendChild(label);
        colourSelection.appendChild(document.createElement("br"));
    });
}

const addButton = document.getElementById("addButton");
const submitButton = document.getElementById("submitButton");
rxjs.fromEvent(addButton, "click").subscribe(() => openNoteDialog());
rxjs.fromEvent(submitButton, "click").subscribe(() => submitNote());

// class Note {
//     content = "";
//     parent = null;
//     deleteSubject;
//     deleteSubscription = null;
//     notes;

//     constructor(content, parent) {
//         this.content = content;
//         this.deleteSubject = new rxjs.Subject;
//         this.parent = parent;
//         if (parent != null) {
//             this.deleteSubscription = this.parent.deleteSubject.subscribe(() => {
//                 console.log("Child note " + this.content + " has been notified of deletion");
//                 this.delete();
//             })
//         }
//     }

//     delete() {
//         this.deleteSubject.next();
//         if (this.deleteSubscription != null) {
//             this.deleteSubscription.unsubscribe();
//         }
//         console.log("Note " + this.content + " has been deleted");
//     }
// }


// const note1 = new Note("Test", null);
// const note2 = new Note("Test2", note1);
// const note3 = new Note("Test3", note1);
// const note4 = new Note("Test4", note2);
// const note5 = new Note("Test5", note4);


// note1.delete();