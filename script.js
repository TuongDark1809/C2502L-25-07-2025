document.addEventListener("DOMContentLoaded", () => {
    let editingIndex = null;
    let staffList = [];
    const storedStaffList = localStorage.getItem("staffList");
    if (storedStaffList) {
        try {
            staffList = JSON.parse(storedStaffList);
        } catch (error) {
            console.error(e)
        };
    };


    document.getElementById("staffForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const staff = {
            id: Math.floor(Math.random()* 100000),
            name: document.getElementById("staffName").value.trim(),
            age: document.getElementById("staffAge").value,
            gender: document.querySelector('input[name="staffGender"]:checked')?.value,
            position: document.getElementById("staffPosition").value,
            note: document.getElementById("staffNote").value.trim(),
        };
        
        staffList.push(staff);
        saveStaffList();
        renderStaffList(staffList);

        if (editingIndex !== null) {
            changeStaffList(editingIndex, staff, staffList);
        }
    });


    function saveStaffList() {
        localStorage.setItem('staffList', JSON.stringify(staffList));
    };


    function changeStaffList(index, object, array) {
        array.splice(index, 1, object);
        array.pop();
        index = null;
        document.getElementById("staffFormButton").textContent = "Thêm";
        saveStaffList();
        renderStaffList(array);
    };


    function renderStaffList(array) {
        document.getElementById("staffTableBody").innerHTML = "";
        
        array.forEach((object, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${index + 1}</td>
            <td>#${object.id}</td>
            <td>${object.name}</td>
            <td>${object.age}</td>
            <td>${object.gender}</td>
            <td>${object.position}</td>
            <td>${object.note}</td>
            <td><button class="delete">Xóa</button>
                <button class="edit">Sửa</button></td>`;

            row.querySelector(".delete").addEventListener("click", () => {
                staffList = staffList.filter((_, i) => i !== index);
                saveStaffList();
                renderStaffList(staffList);
            });

            row.querySelector(".edit").addEventListener("click", () => {
                document.getElementById("staffName").value = object.name;
                document.getElementById("staffAge").value = object.age;
                document.querySelector(`input[name="staffGender"][value="${object.gender}"]`).checked = true;
                document.getElementById("staffPosition").value = object.position;
                document.getElementById("staffNote").value = object.note;

                editingIndex = index;
                document.getElementById("staffFormButton").textContent = "Sửa";
            });

            document.getElementById("staffTableBody").appendChild(row);
        });
    };
});