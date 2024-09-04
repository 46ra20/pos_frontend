const handleOwner=(e)=>{
    const parent = document.getElementById('canvas_details')
    const parentDiv = document.createElement('div')
    parentDiv.classList.add('d-flex','justify-content-center','gap-3','flex-wrap')
    parent.innerHTML=''
    fetch(url+'owner_and_bank_account/owner_list/')
    .then(res=>res.json())
    .then(data=>{
        data.forEach(element => {
            const div = document.createElement('div')            
            div.classList.add('col-5','shadow','border','rounded','p-3')

            div.innerHTML=`
                <h2><span class="fw-bold">Name:</span> ${element.name}</h2>
                <p><span class="fw-bold"> Designation:</span> ${element.designation}</p>
                <p><span class="fw-bold"> School:</span> ${element.school}</p>
                <p><span class="fw-bold"> Collage:</span> ${element.collage}</p>
                <p><span class="fw-bold"> University:</span> ${element.university}</p>
                <p><span class="fw-bold"> Address:</span> ${element.address}</p>
                <p><span class="fw-bold"> City:</span> ${element.city}</p>
                <p><span class="fw-bold"> Country:</span> ${element.country}</p>
            `
            parentDiv.appendChild(div)
        });
    })


    parent.append(parentDiv)
    handleOnClickSelector(e)
}

// handleOwner()