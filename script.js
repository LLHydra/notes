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
            text: notetext
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
        <button id="closeBtn" onclick="closeditpopup()">Cancel</button>
        </div>
        `;

        document.body.appendChild(editingpopup);
    }

    function closeditpopup() {
        const editingpopup = document.getElementById("editing-container");

        if(editingpopup) editingpopup.remove();
        
    }

    function updatenote() {
        const notetext = document.getElementById('note-text').value.trim();
        const editingpopup = document.getElementById('editing-container');

        if(notetext !== '') {
            const noteId = editingpopup.getAttribute('data-note-id');
            let notes = JSON.parse(localStorage.getItem('notes')) || [];

            const updatednotes = notes.map(note => {
                if (note.id == noteId) {
                    return { id: note.id, text: notetext };
                }
                return note;
            });

            localStorage.setItem('notes', JSON.stringify(updatednotes));

            editingpopup.remove();

            displaynotes();
        }
    }

    function deletenote(noteId) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note.id !== noteId);

        localStorage.setItem('notes', JSON.stringify(notes));
        displaynotes();
    } 

// login

const loginForm= document.getElementById("login-form");
const loginButton= document.getElementById("login-form-submit")
const loginErrorMsg = document.getElementById("login-error-msg")
const show = document.getElementById("container");
const hide = document.getElementById("overlay");
const hidelogin = document.getElementById("main");
const hideform = document.getElementById("login-form");
const logout = document.getElementById("log-out");
const guys= [hide, hidelogin, hideform];


loginButton.addEventListener("click", (e) => {e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if(localStorage.getItem("username") === null & localStorage.getItem("password") === null) {
        localStorage.setItem("password", password);
        localStorage.setItem("username", username);
    
    }

    if(username === localStorage.getItem("username") && password === localStorage.getItem("password")) {
        sessionStorage.setItem("isLoggedIn", "true");
        alert ("You have succesfully logged in.");
        location.reload()
    }else {
        loginErrorMsg.style.opacity = 1;
    }
})

if (sessionStorage.getItem("isLoggedIn") === "true") {
    for (let i = 0; i < guys.length; i++) {
        guys[i].style.display = "none"
    }
    show.style.display= "block";
window.onload = () => {
    document.getElementById("user-name").textContent = localStorage.getItem("username");

    welcome.style.opacity = 1;
    welcome.style.visibility= "visible";
    logout.style.visibility = "visible";
    logout.style.opacity= 1;


    setTimeout(() => {
        welcome.style.opacity= 0;
        welcome.style.visibility = "hidden";
    
    }, 5000);
}
    displaynotes();
    
}

function logoutme() {

localStorage.clear();
sessionStorage.clear();
location.reload();

}
logout.addEventListener("click", logoutme)
