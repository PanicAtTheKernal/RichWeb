// eslint-disable-next-line no-undef
const rxjsM = rxjs;

class Notes {
    content = "";
    parent = null;
    deleteSubject;

    constructor(content, parent) {
        this.content = content;
        this.parent = parent;
        this.deleteSubject = new rxjsM.Subject;
    }
}

const noteSubject = new rxjsM.Subject();

noteSubject.pipe(
    rxjsM.scan((notes, newNote) => [...notes, newNote], [])
).subscribe((value) => console.log(value));

const note1 = new Notes("Test", null, noteSubject);
const note2 = new Notes("Test2", note1, noteSubject);
const note3 = new Notes("Test3", null, noteSubject);

noteSubject.next(note1);
noteSubject.next(note2);
noteSubject.next(note3);

