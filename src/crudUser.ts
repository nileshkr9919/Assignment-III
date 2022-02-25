// import data from "./data.json";
import { Role, User } from "./user.js";
import interfaceCRUD from "./interface";
export class crudUser implements interfaceCRUD<User> {
    users: User[];
    hostElement: HTMLDivElement;
    data: any;
    constructor() {
        this.users = [];
        this.hostElement = document.getElementById("table-container")! as HTMLDivElement;
        fetch("../src/data.json")
            .then(response => response.json())
            .then(data => {
                this.data = data;
            }
            );
    }

    loadData(): void {
        this.data.forEach((element) => {
            this.users.push(new User({ id: element.id, firstName: element.firstName, middleName: element.middleName, lastName: element.lastName, email: element.email, phone: element.phone, role: element.role, address: element.address }));
        });
        this.render();
    }
    render(): void {
        if (this.users.length === 0) {
            return;
        }
        let tableElement: HTMLTableElement = document.createElement("table");
        tableElement.classList.add("table");
        let theadElement: HTMLTableSectionElement = document.createElement("thead");
        let tbodyElement: HTMLTableSectionElement = document.createElement("tbody");
        let trElement: HTMLTableRowElement = document.createElement("tr");
        let thElement: HTMLTableHeaderCellElement = document.createElement("th");
        let tdElement: HTMLTableDataCellElement = document.createElement("td");
        let dropdownElement: HTMLSelectElement;
        thElement.innerText = "First Name";
        trElement.appendChild(thElement);
        thElement = document.createElement("th");
        thElement.innerText = "Middle Name";
        trElement.appendChild(thElement);
        thElement = document.createElement("th");
        thElement.innerText = "Last Name";
        trElement.appendChild(thElement);
        thElement = document.createElement("th");
        thElement.innerText = "Email";
        trElement.appendChild(thElement);
        thElement = document.createElement("th");
        thElement.innerText = "Phone";
        trElement.appendChild(thElement);
        thElement = document.createElement("th");
        thElement.innerText = "Role";
        trElement.appendChild(thElement);
        thElement = document.createElement("th");
        thElement.innerText = "Address";
        trElement.appendChild(thElement);
        thElement = document.createElement("th");
        thElement.innerText = "Actions";
        trElement.appendChild(thElement);

        theadElement.appendChild(trElement);
        tableElement.appendChild(theadElement);
        this.users.forEach(element => {
            trElement = document.createElement("tr");
            trElement.setAttribute("id", element.id.toString());
            tdElement = document.createElement("td");
            tdElement.innerText = element.firstName;
            trElement.appendChild(tdElement);
            tdElement = document.createElement("td");
            tdElement.innerText = element.middleName !== undefined ? element.middleName : "";
            trElement.appendChild(tdElement);
            tdElement = document.createElement("td");
            tdElement.innerText = element.lastName;
            trElement.appendChild(tdElement);
            tdElement = document.createElement("td");
            tdElement.innerText = element.email;
            trElement.appendChild(tdElement);
            tdElement = document.createElement("td");
            tdElement.innerText = element.phone;
            trElement.appendChild(tdElement);
            tdElement = document.createElement("td");
            dropdownElement = document.createElement("select");
            dropdownElement.classList.add("role-control");
            dropdownElement.innerHTML = `<option value="Super Admin">Super Admin</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Subscriber">Subscriber</option>`;
            if (element.role === "Super Admin") {
                dropdownElement.children[0].setAttribute("selected", "selected");
            }
            else if (element.role === "Admin") {
                dropdownElement.children[1].setAttribute("selected", "selected");
            }
            else {
                dropdownElement.children[2].setAttribute("selected", "selected");
            }
            dropdownElement.setAttribute("disabled", "true");
            tdElement.appendChild(dropdownElement);
            // tdElement.innerText = dropdownElement.value;
            // tdElement.innerText = element.role;
            trElement.appendChild(tdElement);
            tdElement = document.createElement("td");
            tdElement.innerText = element.address;
            trElement.appendChild(tdElement);
            tdElement = document.createElement("td");

            let buttonElement: HTMLButtonElement = document.createElement("button");

            buttonElement.innerText = "Edit";
            buttonElement.classList.add("edit-button");
            buttonElement.addEventListener("click", () => {
                this.edit(event!);
            });
            tdElement.appendChild(buttonElement);

            buttonElement = document.createElement("button");
            buttonElement.innerText = "Delete";
            buttonElement.classList.add("delete-button");
            buttonElement.addEventListener("click", () => {
                this.delete(element);
            });
            tdElement.appendChild(buttonElement);

            buttonElement = document.createElement("button");
            buttonElement.innerText = "Save";
            buttonElement.classList.add("save-button");
            buttonElement.addEventListener("click", () => {
                this.update(element);
                console.log(element);
            });
            buttonElement.style.display = "none";
            tdElement.appendChild(buttonElement);

            buttonElement = document.createElement("button");
            buttonElement.innerText = "Cancel";
            buttonElement.classList.add("cancel-button");
            buttonElement.addEventListener("click", () => {
                this.refresh();
            });
            buttonElement.style.display = "none";
            tdElement.appendChild(buttonElement);

            trElement.appendChild(tdElement);

            tbodyElement.appendChild(trElement);
        });
        tableElement.appendChild(tbodyElement);
        this.hostElement.appendChild(tableElement);

        let addUser: HTMLButtonElement = document.createElement("button");
        addUser.innerText = "+";
        addUser.setAttribute("id", "add-user");
        addUser.addEventListener("click", () => {
            this.addUser();
            addUser.setAttribute("disabled", "true");
        }
        );
        this.hostElement.appendChild(addUser);

    }

    addUser(): void {
        let trElement: HTMLTableRowElement = document.createElement("tr");
        let tdElement: HTMLTableDataCellElement = document.createElement("td");
        let inputElement: HTMLInputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", "First Name");
        inputElement.classList.add("first-name-control");
        tdElement.appendChild(inputElement);
        trElement.appendChild(tdElement);
        tdElement = document.createElement("td");
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", "Middle Name");
        inputElement.classList.add("middle-name-control");
        tdElement.appendChild(inputElement);
        trElement.appendChild(tdElement);
        tdElement = document.createElement("td");
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", "Last Name");
        inputElement.classList.add("last-name-control");
        tdElement.appendChild(inputElement);
        trElement.appendChild(tdElement);
        tdElement = document.createElement("td");
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", "Email");
        inputElement.classList.add("email-control");
        tdElement.appendChild(inputElement);
        trElement.appendChild(tdElement);
        tdElement = document.createElement("td");
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", "Phone");
        inputElement.classList.add("phone-control");
        tdElement.appendChild(inputElement);
        trElement.appendChild(tdElement);
        tdElement = document.createElement("td");
        let dropdownElement: HTMLSelectElement = document.createElement("select");
        dropdownElement.classList.add("role-control");
        dropdownElement.innerHTML = `<option value="Super Admin">Super Admin</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Subscriber" selected>Subscriber</option>`;
        tdElement.appendChild(dropdownElement);
        trElement.appendChild(tdElement);
        tdElement = document.createElement("td");
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", "Address");
        inputElement.classList.add("address-control");
        tdElement.appendChild(inputElement);
        trElement.appendChild(tdElement);
        tdElement = document.createElement("td");
        let buttonElement: HTMLButtonElement = document.createElement("button");
        buttonElement.innerText = "Save";
        buttonElement.classList.add("save-button");
        buttonElement.addEventListener("click", () => {
            if (this.validate()) {
                this.create({
                    id: this.users.length + 1,
                    firstName: (document.getElementsByClassName("first-name-control")[0] as HTMLInputElement).value,
                    middleName: (document.getElementsByClassName("middle-name-control")[0] as HTMLInputElement).value,
                    lastName: (document.getElementsByClassName("last-name-control")[0] as HTMLInputElement).value,
                    email: (document.getElementsByClassName("email-control")[0] as HTMLInputElement).value,
                    phone: (document.getElementsByClassName("phone-control")[0] as HTMLInputElement).value,
                    role: dropdownElement.selectedIndex === 0 ? Role.SUPERADMIN : dropdownElement.selectedIndex === 1 ? Role.ADMIN : Role.SUBSCRIBER,
                    address: (document.getElementsByClassName("address-control")[0] as HTMLInputElement).value
                });
            }
            else {
                alert("Please fill all the fields");
            }
        }
        );
        tdElement.appendChild(buttonElement);
        buttonElement = document.createElement("button");
        buttonElement.innerText = "Cancel";
        buttonElement.classList.add("cancel-button");
        buttonElement.addEventListener("click", () => {
            this.refresh();
        });
        tdElement.appendChild(buttonElement);

        trElement.appendChild(tdElement);
        let tbodyElement: HTMLTableSectionElement = document.getElementsByTagName("tbody")[0];
        tbodyElement.appendChild(trElement);
    }


    validate(): boolean {
        let isValid: boolean = true;
        let firstName: string = (document.getElementsByClassName("first-name-control")[0] as HTMLInputElement).value;
        let email: string = (document.getElementsByClassName("email-control")[0] as HTMLInputElement).value;
        let phone: string = (document.getElementsByClassName("phone-control")[0] as HTMLInputElement).value;
        if (firstName === "" || email === "" || phone === "") {
            (document.getElementsByClassName("first-name-control")[0] as HTMLInputElement).classList.add("invalid-control");
            isValid = false;
        }
        return isValid;
    }

    refresh(): void {
        this.hostElement.innerHTML = " ";
        setTimeout(() => { this.render(); }, 100);
    }

    create(item: User): void {
        this.users.push(item);
        this.refresh();
    }

    read(): User[] {
        return this.users;
    }

    edit(event: any): void {
        let row = event.target.parentElement.parentElement as HTMLTableRowElement;
        row.contentEditable = "true";
        let td = row.children[row.childElementCount - 1] as HTMLTableCellElement;
        td.contentEditable = "false";
        let dropdownElement = row.children[5].children[0] as HTMLSelectElement;
        dropdownElement.removeAttribute("disabled");
        // dropdownElement.options.selectedIndex = -1;
        event.target.parentElement.children[0].style.display = "none";
        event.target.parentElement.children[1].style.display = "none";
        event.target.parentElement.children[2].style.display = "flex";
        event.target.parentElement.children[3].style.display = "flex";
    }

    delete(item: User): void {
        this.users.splice(this.users.indexOf(item), 1);
        this.refresh();
    }

    update(item: User): void {
        let index: number;
        this.users.forEach((element, i) => {
            if (element.id === item.id) {
                index = i;
            }
        });
        let tr = document.getElementById(item.id.toString()) as HTMLTableRowElement;
        this.users[index].firstName = tr.cells[0].textContent;
        this.users[index].middleName = tr.cells[1].textContent;
        this.users[index].lastName = tr.cells[2].textContent;
        this.users[index].email = tr.cells[3].textContent;
        this.users[index].phone = tr.cells[4].textContent;
        // this.users[index].role = table.rows[index + 1].cells[5].children[0].textContent; 
        let dropdownElement = tr.cells[5].children[0] as HTMLSelectElement;
        if (dropdownElement.options.selectedIndex === 0) {
            this.users[index].role = Role.SUPERADMIN;
        }
        else if (dropdownElement.options.selectedIndex === 1) {
            this.users[index].role = Role.ADMIN;
        }
        else {
            this.users[index].role = Role.SUBSCRIBER;
        }
        dropdownElement.setAttribute("disabled", "true");
        this.users[index].address = tr.cells[6].textContent;
        this.refresh();
    }
}