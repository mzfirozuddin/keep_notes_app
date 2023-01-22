const addBtn = document.querySelector(".addButton");


// here we define the updateLocalStorageData() function
const updateLocalStorageData = ()=>{
    const textAreaData = document.querySelectorAll("textarea");
    // console.log(textAreaData);
    const noteValues = [];  // This is a empty array, Here we add all data

    //forEach(currValue, index, arr, this)
    textAreaData.forEach((note)=>{
        return noteValues.push(note.value);
    });

    // console.log(noteValues);

    localStorage.setItem("noteValues", JSON.stringify(noteValues));
}


// For arrow function we have to define first then call
const addNewNote = (text = "")=>{
    
    const newNote = document.createElement("div");
    newNote.classList.add("note");

    const htmlData = `
    <div class="operation">
        <button class="save"><i class="fa-regular fa-square-check"></i></button>
        <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"> </div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    newNote.innerHTML = htmlData;
    // console.log(newNote);


    // insertAdjacentElement("Plece", Element);
    // newNote.insertAdjacentHTML("afterbegin", htmlData);
    // console.log(newNote);


    document.body.appendChild(newNote);

    // getting the reference of save, edit, delete button. div.main, textarea
    const saveBtn = newNote.querySelector(".save"); 
    const editBtn = newNote.querySelector(".edit"); 
    const deleteBtn = newNote.querySelector(".delete"); 
    const mainDiv = newNote.querySelector(".main"); 
    const textArea = newNote.querySelector("textarea"); 

    // stor the text in main div
    textArea.value = text;
    mainDiv.innerText = text;

    // deleting the note
    deleteBtn.addEventListener("click", ()=>{
        newNote.remove();
        updateLocalStorageData();
    });


    // save the note
    saveBtn.addEventListener("click", ()=>{
       let checkMain = mainDiv.classList.contains("hidden");
       let checkTextarea = textArea.classList.contains("hidden");
       //console.log(checkMain);
       //console.log(checkTextarea);

        if (checkTextarea == false && checkMain == true) {
            textArea.classList.add("hidden");
            mainDiv.classList.remove("hidden");
        }


    });

    
    // edit the note
    editBtn.addEventListener("click", ()=>{
        let checkMain = mainDiv.classList.contains("hidden");
        let checkTextarea = textArea.classList.contains("hidden");
        //console.log(checkMain);
        //console.log(checkTextarea);
 
         if (checkTextarea == true && checkMain == false) {
            textArea.classList.remove("hidden");
             mainDiv.classList.add("hidden");
         }
     });


     // textarea value change
     textArea.addEventListener("change", (event)=>{
        const value = event.target.value;
        // console.log(value);
        mainDiv.innerText = value;


        // Here we store and update data in Local Storage
        updateLocalStorageData();
     });


    
}

// getting data back from local storage
const lsNotes = JSON.parse(localStorage.getItem("noteValues"));

if (lsNotes) {

    lsNotes.forEach((note)=>{
        addNewNote(note);
    });
}


// addBtn.addEventListener("click", addNewNote);
addBtn.addEventListener("click", () => {
    addNewNote();
});



