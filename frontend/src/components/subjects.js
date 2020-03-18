class Subjects {
  constructor() {
    this.subjects = [];
    this.adapter = new classOrganizerAdapter();
    this.initBindingAndEventListeners();
    this.fetchAndLoadSubjects();
  }

  initBindingAndEventListeners() {
    this.alertBox = document.getElementById("alert-box")
    this.message = document.getElementById("message")
    this.closeMessage = document.getElementById("close-message")
    //subjects
    this.subjectTabs = document.getElementById("subjects")
    this.subjectFormCont = document.getElementById("subject-form-container")
    this.subjectForm = document.getElementById("subject-form")
    this.subjectHead = document.getElementById("subject-head")
    this.subjectHead.addEventListener("click", e => {
      this.editSubjectId = e.target.id.slice(7)
      this.renderUpdateForm(this.editSubjectId)
    })
    this.subjectEditFormCont = document.getElementById("subject-edit-container")
    this.subjectEditForm = document.getElementById("subject-edit-form")
    this.subjectEditForm.addEventListener("submit", e => {
      this.editSubject(e)
    })
    this.subjectTabs.addEventListener("click", e => {
      this.subjectId = e.target.id;
      this.delSubjectId = e.target.dataset.subjectId
      if(!!this.delSubjectId) {
        this.delSubject(this.delSubjectId)
      } else if(this.subjectId) {
        this.selectSubject(this.subjectId)
      }
    })
    this.renderFormBtn = document.getElementById('render-form-button');
    this.renderFormBtn.addEventListener("click", e => {
      console.log('add class button was clicked')
      if(this.subjectFormCont.style.display === 'block') {
        e.preventDefault();
        this.renderFormBtn.style.backgroundColor = '#f1f1f1';
        this.subjectFormCont.style.display = 'none';
      } else {
        e.preventDefault();
        this.renderFormBtn.style.backgroundColor = '#BBBBB9';
        this.subjectFormCont.style.display = 'block';
      }
    })
    this.subjectForm.addEventListener("submit", e => {
      e.preventDefault()
      if (e.target[0].value !== "") {
        this.createSubject(e)
        // this.alertBox.innerHTML =  `<p id="message">${e.target[0].value} has been added <span id="close-message" class="glyphicon glyphicon-remove-circle" onclick=closeAlert() data-subject-id="${this.id}"></span></p>`
      } else {
        this.alertBox.innerHTML = `<p id="message">Please enter subject name <span id="close-message" class="glyphicon glyphicon-remove-circle" onclick=closeAlert() data-subject-id="${this.id}"></span></p>`
      }
    })

    //assignments
    this.assignList = document.getElementById('assignments')
    this.assignList.addEventListener("click", e => {
      this.delAssignmentId = e.target.dataset.assignmentId
      if(!!this.delAssignmentId) {
        this.delAssignment(this.delAssignmentId)
      }
    })
    this.assignForm = document.getElementById('assignment-form')
    this.assignForm.addEventListener("submit", e => {
      if (e.target[1].value) {
        this.createAssignment(e)
      }
    })
  }

  fetchAndLoadSubjects() {
    const subjects = this.adapter
      .getSubjects()
      .then(json => {
        json.data.forEach(subject => {
          this.subjects.push(new Subject(subject))
        })
      })
      .then(() => this.render())
  }

  fetchAndLoadAssignments(subjectId) {
    const subject = this.subjects.find(
      subject => subject.id === subjectId
    )

    const assignments = this.adapter
      .getAssignments()
      .then(json => {
        subject.assignments = []

        let assignList = []
        assignList = json.data.filter(assignment => assignment.relationships.subject.data.id === subjectId)
        assignList.forEach(assign => {
          subject.assignments.push(new Assignment(assign))
        })
      })
      .then(() => subject.renderAssignments())
  }

  render() {
    this.subjects.sort((a, b) => a.id - b.id)
    this.subjectTabs.innerHTML = this.subjects
      .map(subject => subject.renderTab())
      .join(" ")
  }

  createSubject(e) {
    // e.preventDefault();
    const subject = {
      name: e.target.name.value
    }
    this.adapter
      .createSubject(subject)
      .then(subject => {
        let newSubject = new Subject(subject.data)
        this.subjects.push(newSubject)
        this.render()
        this.selectSubject(newSubject.id)
        this.alertBox.innerHTML =  `<p id="message">${newSubject.name} has been added <span id="close-message" class="glyphicon glyphicon-remove-circle" onclick=closeAlert() data-subject-id="${newSubject.id}"></span></p>`
      })
      .then(clearSubjectForm)
      .then(this.renderFormBtn.click())
  }

  createAssignment(e) {
    e.preventDefault();
    const assignment = {
      name: e.target.name.value,
      subject_id: e.target[0].value
    }
    const subject = this.subjects.find(
      subject => subject.id === assignment.subject_id
    )
    this.adapter
      .createAssignment(assignment)
      .then(assignment => {
        subject.assignments.push(new Assignment(assignment.data))
      })
      .then(() => subject.renderAssignments())
      .then(clearAssignmentForm)
  }

  //update
  renderUpdateForm(subject) {
    if (this.subjectEditFormCont.style.display === "none") {
      this.adapter
      .getSubject(subject)
      .then(subject => {
        this.subjectEditFormCont.style.display = "block"
        let editSubjectObj = document.getElementById("edit-subject-id")
        editSubjectObj.value = subject.data.id
      })
    } else {
      this.subjectEditFormCont.style.display = "none"
    }
  }

  editSubject(e) {
    e.preventDefault();
    const subject = {
      name: e.target.name.value
    }
    this.adapter
      .updateSubject(e.target[0].value, subject)
      .then((e) => {
        // this.subjects = this.subjects.filter(subject => subject.id !== e.data.id)
        let newSubject = new Subject(e.data)
        let index = this.subjects.findIndex(subject => subject.id === e.data.id)
        this.subjects.splice(index, 1, newSubject)
        this.render()
      })
      .then(this.selectSubject(e.target[0].value))
      .then(clearEditSubjectForm)
  }

  delSubject(subject) {
    this.adapter
      .delSubject(subject)
      .then(() => {
        this.subjectEditFormCont.style.display = "none"
        this.subjects = this.subjects.filter(obj => obj.id !== subject)
        let object = document.getElementById(subject)
        object.remove()
        this.subjectHead.innerHTML = ""
        this.assignList.innerHTML = ""
      })
      .then(closeAssignmentForm)
  }

  delAssignment(assignment) {
    this.adapter
      .delAssignment(assignment)
      .then(() => {
        let assignLi = document.getElementById(`assign-${assignment}`)
        assignLi.remove()
      })
  }

  selectSubject(subject) {
    debugger
    this.adapter
      .getSubject(subject)
      .then(subject => {
        debugger
        if (this.closeMessage !== null && subject !== this.closeMessage.attributes[3].value) {
          debugger
          closeAlert
        }
        this.subjectEditFormCont.style.display = "none"
        this.subjectHead.innerHTML = `${subject.data.attributes.name}  <button type="button" id="edit-btn" class="btn btn-default btn-sm"><span id="update-${subject.data.id}" class="glyphicon glyphicon-edit"></span></button>`
        // const id = document.getElementById("subject-id")
        // id.value = subject.data.id
        let subjectObj = document.getElementById("subject-id")
        subjectObj.value = subject.data.id
      })
      .then(renderAssignmentForm)
      .then(this.fetchAndLoadAssignments(subject))
  }
}
