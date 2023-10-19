class NumberDirectory {
    numbers = [];
    numberDirectoryTableHeader;

    constructor(initialNumbers = []) {
        this.numbers = initialNumbers;
        this.numberDirectoryTableHeader = document.getElementById('phoneDirectoryTableHeader');
        this.renderNumbers();
    }

    renderNumbers(customNumbers, hasResults) {
        const numberDirectoryTable = document.getElementById('phoneDirectoryTable');
        let numbers = this.numbers;
        
        if (customNumbers !== undefined) {
            numbers = customNumbers;
        }
        
        numberDirectoryTable.innerHTML = "";

        //Print error if number doesn't exist
        if(numbers.length === 0) {
            const errorDiv = document.createElement("div");
            errorDiv.id = "noResult";
            errorDiv.innerText = "No results found";
            numberDirectoryTable.appendChild(errorDiv);
            return;
        }

        //Clear the table
        numberDirectoryTable.appendChild(this.numberDirectoryTableHeader);




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
        const hasResults = newNumbers.length > 0;
        this.renderNumbers(newNumbers, hasResults);
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