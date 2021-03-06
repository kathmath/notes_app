//js for note taking app with local storage
//KAM 9/22/2015


//starting variables
var newNoteInput = document.getElementById("new");
var addButton = document.querySelector("input.add");


//get notes from local storage
var getNotes = function() {
  var myNotes = [];
  var storedNotes = localStorage.getItem('notes');
  
  if (storedNotes !== null) {
    myNotes = JSON.parse(storedNotes);
  }

  return myNotes; //return array of notes
}

//build html from notes in local storage
var showNotes = function() {
  var notes = getNotes();
  var myNotes = "";

  for (var i = 0; i < notes.length; i++) {
    var editButton = '<button class = "edit"></button>';
    var deleteButton = '<button class = "delete"></button>';
    var editInput = '<input class = "editInput"/>'
    myNotes += '<li class = "note" id = ' + i + '>' + '<label>' + notes[i] + '</label>' + editInput + editButton + deleteButton + '</li>';
    // console.log(myNotes);
  }

  document.getElementById('myNotes').innerHTML = myNotes; 
  bindNoteEvents();
  document.getElementById('new').focus();
}


var addNote = function() {
  // console.log("adding note");

  if(newNoteInput.value !== "") {

    var newNote = newNoteInput.value;
    var myNotes = getNotes();
    myNotes.push(newNote);

    //make array JSON value of notes key in local storage
    localStorage.setItem('notes', JSON.stringify(myNotes));

    showNotes();
  }

  newNoteInput.value = "";
}


var deleteNote = function() {
  // console.log("deleting note");
  var note = this.parentNode;
  var i = note.getAttribute('id');
  // console.log(i);
  var notes = getNotes();
  notes.splice(i, 1);
  // console.log(notes);

  //remove from local storage
  localStorage.setItem('notes', JSON.stringify(notes));

  showNotes();
}


var editNote = function() {
  // console.log("editing note"); 

  var note = this.parentNode;
  var editInput = note.querySelector("input");
  // console.log(editInput);
  var label = note.querySelector("label"); 
  var containsClass = note.classList.contains("editMode");

  if(containsClass) {
  //switch from edit mode
    note.classList.remove("editMode");
    label.innerText = editInput.value;  
  } else {
    //take other notes out of editMode
    var checkNotes = document.querySelectorAll("li.editMode");
    if(checkNotes !== []) {
      for(var i = 0; i < checkNotes.length; i++) {
      checkNotes[i].classList.remove("editMode");
      };
    }
    //switch to edit mode
    note.classList.add("editMode");
    editInput.value = label.innerText;
  }
};

//events

addButton.onclick = addNote;

var bindNoteEvents = function() {
  // console.log("Bind note events");

  //select note children
  var editButtons = document.querySelectorAll("button.edit");
  var deleteButtons = document.querySelectorAll("button.delete");
  var labels = document.querySelectorAll("label");

  for(var i = 0; i < editButtons.length; i++) {
    editButtons[i].onclick = editNote;
  };

  for(var i = 0; i < labels.length; i++) {
    labels[i].onclick = editNote;
  };

  for(var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].onclick = deleteNote;
  };
  
}


//show notes from local storage onload
showNotes();



