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
