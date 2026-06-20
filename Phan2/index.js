let Students = [
    ["John", "A235"],
    ["Albert", "B280"],
    ["John", "C490"],
]
let mode = "name";


function sortStudent(id, a, b) {
    items.sort((a, b) => a[id] - b[id]);
}

function add() {
    let newStudentName = document.getElementById("stu_name").value;
    let newStudentId = document.getElementById("stu_id").value;
    if (newStudentId != "" && newStudentName != "") {
        Students.push([newStudentName, newStudentId]);
        document.getElementById("Message").innerHTML = `<p>Student added!</p>`;
        showAll();
        document.getElementById("stu_name").value = "";
        document.getElementById("stu_id").value = "";
    } else document.getElementById("Message").innerHTML = `<p>Not enough info!</p>`
}

function showFormEdit(index) {
    document.getElementById("stu_name").value = Students[index][0];
    document.getElementById("stu_id").value = Students[index][1];
    document.getElementById("submit").onclick = () => edit(index)
    document.getElementById("submit").innerText = "Edit";
}

function edit(index) {
    let editedStudentName = document.getElementById("stu_name").value;
    let editedStudentId = document.getElementById("stu_id").value;
    if (editedStudentId != "" && editedStudentName != "") {
        Students[index][0] = editedStudentName;
        Students[index][1] = editedStudentId;
        document.getElementById("Message").innerHTML = `<p>Student changed!</p>`;
        showAll();
        document.getElementById("stu_name").value = "";
        document.getElementById("stu_id").value = "";
    } else document.getElementById("Message").innerHTML = `<p>Not enough info!</p>`
    document.getElementById("submit").onclick = () => add();
    document.getElementById("submit").innerHTML = "Submit";
}


function remove(index) {

    const form = document.createElement('dialog');
    form.innerHTML = `
  <h4>Are You Sure?</h4>
  <button id="yes">Yes</button>
  <button id="no">No</button>
`;
    document.body.appendChild(form);

    form.showModal();

    form.querySelector('#yes').addEventListener("click", () => {
        Students.splice(index, 1);
        showAll();
        form.close();
        form.remove();
    });
    form.querySelector('#no').addEventListener("click", () => {
        form.close();
        form.remove();
    });
}

function showAll() {
    let studentsHTML = "";
    let index = 1;

    document.getElementById("sortName").addEventListener("click", () => {
        Students.sort((a, b) => a[0].localeCompare(b[0]));
    });
    document.getElementById("sortId").addEventListener("click", () => {
        Students.sort((a, b) => a[1].localeCompare(b[1]));
    });




    for (let i = 0; i < Students.length; i++) {
        studentsHTML += `
        <tr>
            <td>${index}</td>
            <td>${Students[i][0]}</td>
            <td>${Students[i][1]}</td>   
            <td>
                <button onclick="showFormEdit(${i})">Change</button>
            </td>
            <td>
                <button onclick="remove(${i})">Remove</button>
            </td>
            
        </tr>
        `;
        index++;
    }

    document.getElementById("list").innerHTML = studentsHTML;
}

showAll();