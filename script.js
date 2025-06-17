function popup() {

    const popupcontainer = document.createElement("div");

        popupcontainer.innerHTML = `
        <div id="popupcontainer">
        <h1>NEW NOTE</h1>
        <textarea id="note-text" placeholder="Enter your note..."></textarea>
        <div id="btn-container">
        <button id="submitBtn" onclick="createnote()">Create Note</button>
        <button id="closeBtn" onclick="closepopup()">Close</button>
        </div>
        </div>
        `;
        document.body.appendChild(popupcontainer);
}

function closepopup() {
    const popupcontainer = document.getElementById("popupcontainer");
    if(popupcontainer) {
        popupcontainer.remove();
    }
}

function createnote() {
    const popupcontainer = document.getElementById('popupcontainer');
    const notetext = document.getElementById('note-text').value;
    if (notetext.trim() !== '') {
        const note = {
            id: new Date().getTime(),
            Text: notetext
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));

        document.getElementById('note-text').value = '';

        popupcontainer.remove();
        displaynotes();
        }
    }

    function displaynotes() {
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML = '';

        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <span>${note.text}</span>
            <div id="notebtn-container">
            <button id="editBtn" onclick="editnote(${note.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deletenote(${note.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
            `;
            notesList.appendChild(listItem);
        });
    }

    function editnote(noteId) {
        const notes = JSON.parse(localStorage.getItem('note')) || [];
        const noteToEdit = notes.find(note => noteId.id == noteId);
        const notetext = noteToEdit ? noteToEdit.text : '';
        const editingpopup = document.createElement("div");

        editingpopup.innerHTML = `
        <div id="editing-container" data-note-id="${noteId}">
        <h1>EDIT NOTE</h1>
        <textarea id="note-text">${notetext}</textarea>
        <div id="btn-container">
        <button id="submitBtn" onclick="updatenote()">Done</button>
        <button id="closeBtn" onclick="closeditpopup()>Cancel</button>
        </div>
        </div>
        `;

        document.body.appendChild(editingpopup);
    }

    function closeditpopup() {
        const editingpopup = document.getElementById("editing-container");

        if(editingpopup) {
            editingpopup.remove();
        }
    }

    function updatenote() {
        const notetext = document.getElementById('note-text').value.trim();
        const editingpopup = document.getElementById('editing-container');

        if(notetext !== '') {
            const noteId = document.getAttribute('data-note-Id');
            let notes = JSON.parse(localstorage.getItem('notes')) || [];

            const updatednotes = notes.map(note => {
                if (note.id == noteId) {
                    return { id: note.id, text: notetext };
                }
                return note;
            });

            localstorage.setItem('notes', JSON.stringify(updatednotes));

            editingpopup.remove();

            displaynotes();
        }
    }

    function deletenote(noteId) {
        let note = JSON.parse(localStorage.getItem('note')) || [];
        note = note.filter(note => note.id !== noteId);

        localStorage.setItem('notes', JSON.stringify(notes));
        displaynotes();
    }

    displaynotes();