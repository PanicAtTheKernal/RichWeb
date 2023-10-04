const colours = {
    red: [0, 100, 65],
    blue: [216, 100, 65],
    green: [120, 100, 65],
    yellow: [60, 100, 65],
    orange: [36, 100, 65],
};

class Notes {
    constructor(InitialNotes, maxCols) {
        this.notes = InitialNotes;
        this.maxCols = maxCols;
        this.renderNotes();
    }

    addNote(content, colour) {
        this.notes.push({text: content, colour: colour});
        this.renderNotes()
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
            
            deleteButton.textContent = "Delete";
            
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

const notes = new Notes([{text: "test Note", colour: "red"}, {text: "Another note", colour: "blue"}]);
createColourSelection();

function submitNote() {
    const noteContent = document.forms["noteForm"]["noteContent"].value;
    const noteColour = document.forms["noteForm"]["noteColour"].value;
    const noteDialog = document.getElementById("noteFormDialog");
    notes.addNote(noteContent, noteColour);
    noteDialog.close();
}

function openNoteDialog() {
    const noteDialog = document.getElementById("noteFormDialog");
    noteDialog.show();
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