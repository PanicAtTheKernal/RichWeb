class NumberDirectory {
    numbers = [];

    constructor(initialNumbers = []) {
        this.numbers = initialNumbers;
        this.renderNumbers();
    }

    renderNumbers(customNubmers) {
        const numberDirectoryTable = document.getElementById('phoneDirectoryTable');
        const numberDirectoryTableHeader = document.getElementById('phoneDirectoryTableHeader');
        let numbers = this.numbers;

        //Clear the table
        numberDirectoryTable.innerHTML = "";
        numberDirectoryTable.appendChild(numberDirectoryTableHeader);

        if(customNubmers !== undefined) {
            numbers = customNubmers;
        }

        numbers.forEach((number) => {
            console.log(`${number['phone']}`);
            const newTableRow = document.createElement('tr');
            const nameTableValue = document.createElement('td');
            const phoneTableValue = document.createElement('td');
            const emailTableValue = document.createElement('td');

            nameTableValue.innerText = number['name'];
            phoneTableValue.innerText = number['phone'];
            emailTableValue.innerText = number['email'];

            newTableRow.appendChild(nameTableValue);
            newTableRow.appendChild(phoneTableValue);
            newTableRow.appendChild(emailTableValue);

            numberDirectoryTable.appendChild(newTableRow);
        });
    }

    addNumber(newNumber) {
        if (newNumber === undefined) throw new Error();
        this.numbers.push(newNumber);
        this.renderNumbers();
    }

    getNumbers() {
        return this.numbers;
    }

    filterNumbers(searchNumber) {
        let newNumbers = [];
        this.numbers.forEach((number) => {
            const phoneNumber = number['phone'];
            if (phoneNumber.startsWith(`${searchNumber}`)) newNumbers.push(number);
        });
        this.renderNumbers(newNumbers);
    }
}


const numDir = new NumberDirectory([{name: 'John Doe', phone: '0875430923', email: 'john.doe@test.com'}]);

function submitNewNumber() {
    const contactName = document.forms["newPhoneForm"]["cname"].value;
    const phone = document.forms["newPhoneForm"]["phone"].value;
    const email = document.forms["newPhoneForm"]["email"].value;

    document.forms["newPhoneForm"]["cname"].value = "";
    document.forms["newPhoneForm"]["phone"].value = "";
    document.forms["newPhoneForm"]["email"].value = "";

    if (!contactName || !phone || !email) {
        throw new Error("Empty values");
    } else {
        numDir.addNumber({name: contactName, phone: phone, email: email});
    }
}

function search() {
    const searchValue = document.getElementById("numberSearch").value;
    numDir.filterNumbers(searchValue);
}

let state = false;
function buttonClick() {
    document.getElementById("text").style.color = (state) ? "blue" : "black";
    state = !state;
}