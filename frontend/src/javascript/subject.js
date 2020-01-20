document.addEventListener('DOMContentLoaded',
() => {
  console.log('subject.js is loaded...')
});

class Subject {
  constructor(name, id) {
    this.name = name
    this.id = id
  }

  renderSubjectTab() {
    // render subject navigation bar
    let button = document.createElement('button');
    let removeIcon = document.createElement('span');

    button.className = 'tablinks';
    button.textContent = `${this.name} `;

    removeIcon.className = 'glyphicon glyphicon-remove-circle';
    removeIcon.id = `delete-subject-${this.id}`;
    removeIcon.setAttribute('data-subject-id', `${this.id}`)

    button.append(removeIcon);
    subjectTabs.append(button);

    // subject tab event listener
    button.addEventListener('click', e => {
      e.preventDefault();
      this.renderSubject()
      // subjectTabs.textContent = ''
      // fetchSubjects();
      assignList.textContent = ''
      // fetchAssignments(`${this.id}`)
    })

    // delete subject
    let removeBtn = document.getElementById(`delete-subject-${this.id}`)

    removeBtn.addEventListener('click', e => {
      let delObj = {
        method: 'DELETE'
      }

      fetch(`${SUBJECTS_URL}/${e.target.dataset.subjectId}`, delObj)
        .then(resp => resp.json())
        .then(function (json) {
          e.target.parentNode.remove();
        })
        .then(clearSubjectView)
    })
  }

  renderSubject() {

    console.log(`rendering ${this.name}`)

    // render subject header
    subjectHead.textContent = `${this.name}`

    // render assignment form
    renderAssignmentForm();

    // add assignment
    assignForm.addEventListener('submit', e => {
      e.preventDefault()

      let assignName = e.target.name.value

      let formData = {
        name: assignName,
        subject_id: `${this.id}`,
      }

      let configObj = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      }

      // NEED TO FIX
      return fetch(ASSIGNMENTS_URL, configObj)
        .then(parseJSON)
        .then(assign => {
          let newAssign = new Assignment(assign.name, assign.subject_id, assign.id)
          console.log(newAssign)
          // allAssign.push(newAssign);

          //////
          fetch(SUBJECTS_URL)
            .then(parseJSON)
            .then(json => json.data.find(subject => subject.id === newAssign.subject_id))
          // newAssign.subject.renderSubject();
          //need to fix this
          // renderSubject(newAssign.subject_id);
          // fetchAssignments(newAssign.subject_id);
        })
        .then(clearAssignForm)
    })
  }
}

//fetch subjects
function fetchSubjects() {
  fetch(SUBJECTS_URL)
    //parseJSON = response => response.json()
    .then(parseJSON)
    .then(json => json.data.forEach(subject => {
      let newSubject = new Subject(subject.attributes.name, subject.id)
      console.log(newSubject)
      newSubject.renderSubjectTab()
    }))
    // .then(clickFirstTab)
}

//add new subject
function addNewSubject() {
  subjectForm.addEventListener('submit', e => {
    e.preventDefault()

    let subjectName = e.target.name.value

    let formData = {
      name: subjectName,
    }

    let configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    return fetch(SUBJECTS_URL, configObj)
      .then(parseJSON)
      .then(subject => {
        let newSubject = new Subject(subject.name, subject.id)
        console.log(newSubject)
        // newSubject.renderSubjectTab()
        subjectTabs.textContent = ''
        fetchSubjects();
        newSubject.renderSubject()
      })
      .then(clearSubjectForm)
      .then(clickAddClass)
  })
}
