class Subject {
  constructor(subjectJSON) {
    this.id = subjectJSON.id;
    this.name = subjectJSON.attributes.name;
    this.assignments = [];
  }

  renderTab() {
    return `<button id=${this.id} class="tablinks">
              ${this.name}
              <span id="delete-subject-${this.id}" class="glyphicon glyphicon-remove-circle" data-subject-id="${this.id}"></span>
            </button>`
  }

  renderBody() {
    console.log(`rendering ${this.name}`)

    // render subject header
    const subjectHead = document.getElementById("subject-head")
    subjectHead.textContent = `${this.name}`

    // render assignment form
    renderAssignmentForm();
  }
}

function clearSubjectForm() {
  document.querySelector('.subject-input').value = ""
}

function clickAddClass() {
  renderFormBtn.click()
}
