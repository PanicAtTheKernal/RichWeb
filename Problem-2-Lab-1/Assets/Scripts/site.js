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