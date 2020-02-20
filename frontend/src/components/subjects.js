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

      if(this.delSubjectId) {
        this.delSubject(this.delSubjectId)
      } else if(this.subjectId){
        this.selectSubject(this.subjectId)
        this.fetchAndLoadAssignments(this.subjectId)
      }
      // this.fetchAndLoadAssignments(this.subjectId);
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
      .getAssignments(subjectId)
      .then(json => {
        json.data.forEach(assignment =>
          subject.assignments.push(new Assignment(assignment))
        )
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
        newSubject.renderBody()
        debugger
      })
      .then(clearSubjectForm)
      .then(this.renderFormBtn.click())
  }

  createAssignment(e) {
    e.preventDefault();
    const assignment = {
      name: e.target.name.value,
      subject_id: this.subjectId
    }
    const subject = this.subjects.find(
      subject => subject.id === assignment.subject_id
    )
    this.adapter
      .createAssignment(assignment)
      .then(assignment => {
        subject.assignments.push(new Assignment(assignment.data))
        debugger
      })
      .then(() => subject.renderAssignments())
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
    console.log(subject)
    this.adapter
      .getSubject(subject)
      .then(subject => {
        this.subjectHead.innerHTML = subject.data.attributes.name
      })
      .then(renderAssignmentForm)
  }
}
