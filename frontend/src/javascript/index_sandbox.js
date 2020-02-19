document.addEventListener('DOMContentLoaded',
() => {
  fetchSubjects();
  addNewSubject();
  console.log('index.js is loaded...');
});

function clearSubjectForm() {
  document.querySelector('.subject-input').value = ""
}

function clearSubjectView() {
  subjectHead.textContent = '';
  assignForm.style.visibility = 'hidden'
}

function clickAddClass() {
  renderFormBtn.click()
}

function clickFirstTab(){
  subjectTabs.firstElementChild.click()
}

function renderAssignmentForm() {
  console.log('rendering form');
  if(assignForm.style.visibility = 'hidden') {
    assignForm.style.visibility = 'visible';
  }
}

function clearAssignForm() {
  document.querySelector('.assignment-input').value = ""
}

renderFormBtn.addEventListener('click', e => {
  console.log('add class button was clicked')
  if(subjectForm.style.display === 'block') {
    e.preventDefault();
    renderFormBtn.style.backgroundColor = '#f1f1f1';
    subjectForm.style.display = 'none';
  } else {
    e.preventDefault();
    renderFormBtn.style.backgroundColor = '#BBBBB9';
    subjectForm.style.display = 'block';
  }
});
