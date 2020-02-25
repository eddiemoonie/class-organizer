class Assignment {
  constructor(assignmentJSON) {
    this.id = assignmentJSON.id
    this.name = assignmentJSON.attributes.name
  }

  render() {
    return `
    <li id="assign-${this.id}" class="assignment">${this.name}<span id="delete-assignment-${this.id}" class="glyphicon glyphicon-trash" data-assignment-id="${this.id}"></span></li>`
  }
}

function renderAssignmentForm() {
  console.log('rendering form')

  const assignForm = document.getElementById('assignment-form')

  if(assignForm.style.visibility = 'hidden') {
    assignForm.style.visibility = 'visible';
  }
}

function closeAssignmentForm() {
  console.log('closing form')

  const assignForm = document.getElementById('assignment-form')

  if(assignForm.style.visibility = 'visible') {
    assignForm.style.visibility = 'hidden'
  }
}

function clearAssignmentForm() {
  document.querySelector('.assignment-input').value = ""
}
