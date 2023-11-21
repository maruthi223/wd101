const inputdate = document.getElementById('dob');

inputdate.addEventListener("input",()=>validateAgeRange(inputdate.value));
function validateAgeRange(valid_d) {
    const inputDate = new Date(valid_d);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - inputDate.getFullYear();
    if(age < 18 || age > 55){
        inputdate.setCustomValidity('The age should be above 18 and below 55 years old');
        inputdate.reportValidity();
    }else{
        inputdate.setCustomValidity('');

    }
}

let userForm=document.getElementById('user-form');

let retriveData = ()=>{
    let entries = localStorage.getItem('userEntries');
    if(entries){
        entries=JSON.parse(entries);
    }else{
        entries=[];
    }
    return entries;
};

let userEntries=retriveData();

const dispalyData=()=>{
    const entries = retriveData();

    const tableEntries = entries.map((entry)=>{
        const namecell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailcell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordcell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobcell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptedtermscell = `<td class='border px-4 py-2'>${entry.acceptedterms}</td>`;
        const row = `<tr>${namecell} ${emailcell} ${passwordcell} ${dobcell} ${acceptedtermscell}</tr>`;
        return row;
    }).join('\n');

    const table = `<table class="table-auto w-full borde border-collapse border-gray-300"">
        <tr>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Email</th>
            <th class="px-4 py-2 border">Password</th>
            <th class="px-4 py-2 border">dob</th>
            <th class="px-4 py-2 border">accepted terms?</th>
        </tr>${tableEntries}</table>`;

let details = document.getElementById('user-entries');
details.innerHTML = table;
};
const saveUserinfo = (events) =>{
    events.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const acceptedterms = document.getElementById('acceptTerms').checked;

    const entry={
        name:name,
        password:password,
        dob:dob,
        email:email,
        acceptedterms:acceptedterms
    };
    userEntries = retriveData();
    userEntries.push(entry);
    localStorage.setItem('userEntries', JSON.stringify(userEntries));
    dispalyData();
}
userForm.addEventListener('submit',saveUserinfo); 
dispalyData();
