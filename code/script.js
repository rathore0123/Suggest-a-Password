// To show the password

const show = document.getElementById('show');
const input = document.querySelector('input');
show.addEventListener('click', function () {
    if (input.type == 'password') {
        input.setAttribute('type', 'text');
        show.innerText = 'Hide';
    }
    else {
        input.setAttribute('type', 'password');
        show.innerText = 'Show';
    }
});

// To check which character is used in passsword
function checkCharacter() {

    let number = document.getElementsByClassName('number')[0];
    let symbol = document.getElementsByClassName('symbol')[0];
    let lower = document.getElementsByClassName('lower')[0];
    let upper = document.getElementsByClassName('upper')[0];
    let myPassword = input.value;

    if (/[a-z]/.test(myPassword)) {
        lower.style.color = "red";
    } else {
        lower.style.color = "";
    }

    if (/[A-Z]/.test(myPassword)) {
        upper.style.color = "red";
    } else {
        upper.style.color = "";
    }

    if (/[0-9]/.test(myPassword)) {
        number.style.color = "red";
    } else {
        number.style.color = "";
    }

    if (/[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(myPassword)) {
        symbol.style.color = "red";
    } else {
        symbol.style.color = "";
    }
}

// To count the length of the password

input.addEventListener('input', function () {
    let passwordLength = input.value.length;
    document.querySelector('.count').textContent = "Characters Count:" + passwordLength;
    copybtn.textContent = "Copy";

    checkCharacter();
});


// // To check the password complexity

function passwordComplexity() {

    const minLength = 8;
    const myPasssword = input.value;
    const number = /[0-9]/.test(myPasssword);
    const symbol = /[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(myPasssword);
    const lower = /[a-z]/.test(myPasssword);
    const upper = /[A-Z]/.test(myPasssword);
    const passwordContainer = document.getElementsByClassName('input-password')[0];
    const text = document.getElementsByClassName('text')[0];

    if (myPasssword.length >= 15 && (lower && upper && number && symbol)) {
        passwordContainer.style.background = "green";
        text.textContent = "Very Strong";
        text.style.color = "white";
    }
    else if (myPasssword.length >= 9 && ((lower && upper && number) || (upper && number && symbol) || (lower && number && symbol) || (lower && upper && symbol))) {
        passwordContainer.style.background = "#85b806";
        text.textContent = "Strong";
        text.style.color = "white";
    }
    else if (myPasssword.length >= minLength && ((lower && upper) || (lower && number) || (lower && number) || (upper && number) || (upper && symbol) || (upper && lower) || (number && symbol) || (number && lower) || (number && upper) || (symbol && lower) || (symbol && upper) || (symbol && number))) {
        passwordContainer.style.background = "orange";
        text.textContent = "medium";
        text.style.color = "white";
    }
    else if (myPasssword.length >= 5 && (lower || upper || number || symbol)) {
        passwordContainer.style.background = "red";
        text.textContent = "Weak";
        text.style.color = "white";
    }
    else if (myPasssword.length <= 5 && (lower || upper || number || symbol)) {
        passwordContainer.style.background = "red";
        text.textContent = "Very Weak";
        text.style.color = "white";
    }
    else {
        passwordContainer.style.background = "";
        text.style.color = "";
        text.textContent = "No Password";
    }
}



// to Suiggest a Strong Password


const suggestButton = document.querySelector('.sug-paasword');
suggestButton.addEventListener('click', () => {
    copybtn.textContent = "Copy";
    let suggestPassword = "";
    const n = Math.floor(Math.random() * 6 + 15)
    for (let i = 0; i < n; i++) {

        let charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
        let rnfc = Math.floor(Math.random() * charSet.length)
        suggestPassword = suggestPassword + charSet[rnfc];
    }
    passwordComplexity(input.value = suggestPassword);
    let passwordLength = input.value.length;
    document.querySelector('.count').textContent = "Characters Count:" + passwordLength;
})

suggestButton.addEventListener('click',checkCharacter);

//To copy the password

function copy() {
    let copyPassword = "";
    copyPassword = input.value;

    copybtn.addEventListener('click', function () {
        copybtn.textContent = 'Copied'
        navigator.clipboard.writeText(copyPassword).then(function () {
            console.log('Password copied successfully');
        }, function (err) {
            console.error('Unable to copy password: ', err);
        });
    })
}

const write = input.addEventListener('input', copy);
const suggestion = suggestButton.addEventListener('click', copy);