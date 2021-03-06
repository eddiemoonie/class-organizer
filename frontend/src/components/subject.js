class Subject {
  constructor(subjectJSON) {
    this.id = subjectJSON.id;
    this.name = subjectJSON.attributes.name;
    this.assignments = [];
  }

  renderTab() {
    return `<button id=${this.id} class="tablinks">
              ${this.name}
              <span id="delete-subject-${this.id}" class="glyphicon glyphicon-remove" data-subject-id="${this.id}"></span>
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

  renderAssignments() {
    console.log("rendering assignments")

    const assignList = document.getElementById('assignments')
    assignList.innerHTML = this.assignments
      .map(assignment => assignment.render())
      .join(" ")
  }
}

function clearSubjectForm() {
  document.querySelector('.subject-input').value = ""
}

function clickAddClass() {
  renderFormBtn.click()
}

function clearEditSubjectForm() {
  document.getElementById('edit-input').value = ""
}

function closeAlert() {
  console.log('click')
  const message = document.getElementById("message")
  message.style.visibility = "hidden"
}