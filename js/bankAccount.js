const handleBankAccount=(event)=>{
    const parent = document.getElementById('canvas_details')
    const parentDiv = document.createElement('div')
    parentDiv.classList.add('d-flex','justify-content-center','gap-3','flex-wrap')
    parent.innerHTML=''

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
                <p><span class="fw-bold">Mobile No.:</span> ${element.mobile}</p>
                <p><span class="fw-bold">Address:</span> ${element.address}</p>
                <p><span class="fw-bold">City:</span> ${element.city}</p>
                <p><span class="fw-bold">Country:</span> ${element.country}</p>
            `
            parentDiv.append(div)
        });
    })

    parent.append(parentDiv)
    handleOnClickSelector(event)
}

// handleBankAccount()