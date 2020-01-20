document.addEventListener('DOMContentLoaded',
() => {
  console.log('assignment.js is loaded...')
});

let allAssign = [];

class Assignment {
  constructor(name, subject_id, id) {
    this.name = name;
    this.subject_id = subject_id;
    this.id = id;
  }

  renderAssignments() {
    console.log('render assignments');

    let assignLi = document.createElement('li')

    assignLi.className = 'assignment'
    assignLi.textContent = `${this.name}`

    assignList.append(assignLi)
  }
}

function fetchAssignments(subject_id) {
  fetch(ASSIGNMENTS_URL)
    .then(parseJSON)
    .then(json => json.data.forEach(assign => {
      if (assign.relationships.subject.data.id === subject_id) {
        let newAssign = new Assignment(assign.attributes.name, assign.relationships.subject.data.id, assign.id)
        allAssign.push(newAssign);
        newAssign.renderAssignments();
      }
    }))
}
