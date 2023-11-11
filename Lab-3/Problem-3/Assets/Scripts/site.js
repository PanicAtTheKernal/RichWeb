class Note {
    content = "";
    parent = null;
    deleteSubject;
    deleteSubscription = null;
    notes;

    constructor(content, parent) {
        this.content = content;
        this.deleteSubject = new rxjs.Subject;
        this.parent = parent;
        if (parent != null) {
            this.deleteSubscription = this.parent.deleteSubject.subscribe(() => {
                console.log("Child note " + this.content + " has been notified of deletion");
                this.delete();
            })
        }
    }

    delete() {
        this.deleteSubject.next();
        if (this.deleteSubscription != null) {
            this.deleteSubscription.unsubscribe();
        }
        console.log("Note " + this.content + " has been deleted");
    }
}


const note1 = new Note("Test", null);
const note2 = new Note("Test2", note1);
const note3 = new Note("Test3", note1);
const note4 = new Note("Test4", note2);
const note5 = new Note("Test5", note4);


note1.delete();