const handleBankAccount=async(event)=>{
    classChangeForSpinner('d-none','d-flex')
    const parent = document.getElementById('canvas_details')

    parent.innerHTML=''
    const parentDiv = document.createElement('div')
    parent.innerHTML=`
        <h3 class="text-center p-3 fw-bold border-bottom mb-3">Bank Accounts List</h3>
    `
    parentDiv.classList.add('d-flex','justify-content-center','gap-3','flex-wrap')

    fetch(url+`owner_and_bank_account/bank_account/`)
    .then(res=>res.json())
    .then(data=>{
        data.forEach(element => {
            const div =document.createElement('div')
            div.classList.add('col-5','shadow','border','rounded','p-3')

            div.innerHTML=`
                <h2><span class="fw-bold">${element.bank_name}</span></h2>
                <p><span class="fw-bold">Account Name.:</span> ${element.account_name}</p>
                <p><span class="fw-bold">Account No.:</span> ${element.account_no}</p>
                <p><span class="fw-bold">Mobile: </span> ${element.mobile}</p>
                <p><span class="fw-bold">Address: </span> ${element.address}</p>
                <p><span class="fw-bold">City: </span> ${element.city}</p>
                <p><span class="fw-bold">Country: </span> ${element.country}</p>
            `
            parentDiv.append(div)
        });
        classChangeForSpinner('d-flex','d-none')
    })

    parent.append(parentDiv)

    handleOnClickSelector(event)
}

// handleBankAccount()