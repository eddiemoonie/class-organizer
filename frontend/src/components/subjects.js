class Subjects {
  constructor() {
    this.subjects = [];
    this.adapter = new classOrganizerAdapter();
    this.initBindingAndEventListeners();
    this.fetchAndLoadSubjects();
  }

  initBindingAndEventListeners() {
    this.subjectTabs = document.getElementById("subjects");
    this.subjectFormCont = document.getElementById("subject-form-container")
    this.subjectForm = document.getElementById("subject-form")
    this.subjectHead = document.getElementById("subject-head")
    this.subjectTabs.addEventListener("click", e => {
      this.subjectId = event.target.dataset.id;
      this.selectSubject(this.subjectId);
      this.fetchAndLoadAssignments(this.subjectId);
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
      })
      .then(clearSubjectForm)
      .then(this.renderFormBtn.click())
  }
}
