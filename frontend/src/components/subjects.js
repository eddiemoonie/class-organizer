class Subjects {
  constructor() {
    this.subjects = [];
    this.adapter = new classOrganizerAdapter();
    this.initBindingAndEventListeners();
    this.fetchAndLoadSubjects();
  }

  initBindingAndEventListeners() {
    //subjects
    this.subjectTabs = document.getElementById("subjects")
    this.subjectFormCont = document.getElementById("subject-form-container")
    this.subjectForm = document.getElementById("subject-form")
    this.subjectHead = document.getElementById("subject-head")
    this.subjectTabs.addEventListener("click", e => {

      this.subjectId = e.target.id;
      this.delSubjectId = e.target.dataset.subjectId

      if(this.subjectId) {
        this.selectSubject(this.subjectId)
      } else if(this.delSubjectId) {
        this.delSubject(this.delSubjectId)
      }

      debugger
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
      this.createSubject(e)
    })

    //assignments
    this.assignList = document.getElementById('assignments')
    this.assignList.addEventListener("click", e => {
      this.delAssignmentId = e.target.dataset.assignmentId
    })
    this.assignForm = document.getElementById('assignment-form')
    this.assignForm.addEventListener("submit", e => {
      this.createAssignment(e)
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
    this.subjectTabs.innerHTML = this.subjects
      .map(subject => subject.renderTab())
      .join(" ")
  }

  clearSubjectForm() {
    document.querySelector('.subject-input').value = ""
  }

  createSubject(e) {
    e.preventDefault();
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
      })
      .then(clearSubjectForm)
      .then(this.renderFormBtn.click())
  }

  createAssignment(e) {
    e.preventDefault();
    debugger
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
        debugger
        subject.assignments.push(new Assignment(assignment.data))
      })
      .then(() => subject.renderAssignments())
      .then(clearAssignmentForm)
  }

  delSubject(subject) {
    this.adapter
      .delSubject(subject)
      .then(() => {
        this.subjects = this.subjects.filter(obj => obj.id !== subject)
        let object = document.getElementById(subject)
        object.remove()
        this.subjectHead.innerHTML = ""
      })
      .then(closeAssignmentForm)
  }

  selectSubject(subject) {
    this.adapter
      .getSubject(subject)
      .then(subject => {
        this.subjectHead.innerHTML = subject.data.attributes.name

        const id = document.getElementById("subject-id")
        id.value = subject.data.id
      })
      .then(renderAssignmentForm)
      .then(this.fetchAndLoadAssignments(subject))
  }
}
