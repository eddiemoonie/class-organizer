class classOrganizerAdapter {
  constructor() {
    this.baseURL = "http://localhost:3000/api/v1";
  }

  getSubjects() {
    return fetch(this.baseURL + "/subjects").then(res => res.json());
  }

  getSubject(id) {
    return fetch(this.baseURL + "/subjects/" + id).then(res => res.json());
  }

  getAssignments(id) {
    return fetch(this.baseURL + "/subjects/" + id + "/assignments").then(res => res.json());
  }

  createSubject(subject) {
    return fetch(this.baseURL + "/subjects", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(subject)
    }).then(res => res.json());
  }

  delSubject(subjectId) {
    return fetch(this.baseURL + `/subjects/${subjectId}`, {
      method: "DELETE"
    }).then(res => res.json());
  }

  // createAssignments(assignment) {
  //   return fetch(this.baseURL = "/subjects" + id )
  // }
}
