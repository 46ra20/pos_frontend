const handlePromotionalSMS=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML = ''
    classChangeForSpinner('d-none','d-flex')
    const div = document.createElement('div')
    div.id="promotional_sms"
    parent.append(div)
    handleOnClickSelector(event)
    await showContactList()
}

const showContactList=()=>{
    const promotional_sms = document.getElementById('promotional_sms')
    promotional_sms.innerHTML=''
    promotional_sms.classList.add('border','rounded','shadow')
    fetch(url+'promotional/promotional_list/')
    .then(r=>r.json())
    .then(d=>{
        let n=0;
        promotional_sms.innerHTML=`
            <div class="d-flex fw-semibold text-center">
                <div class="col-1"><p class="p-1">No.</p></div>
                <div class="col-2 border-start border-end"><p class="p-1">Customer Name</p></div>
                <div class="col-2"><p class="p-1">Mobil</p></div>
                <div class="col-2 border-start border-end"><p class="p-1">Address</p></div>
                <div class="col-1"><p class="p-1">City</p></div>
                <div class="col-2 border-start border-end"><p class="p-1">Country</p></div>
                <div class="col-2"><p class="p-1">Action</p></div>
            </div>
        `
        console.log(d)
        d.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('d-flex','border-top','text-center')
            div.innerHTML=`
                <div class="col-1"><p class="text-center p-1">${++n}.</p></div>
                <div class="col-2 border-start border-end"><p class="p-1">${element.customer_name}</p></div>
                <div class="col-2"><p class="p-1">${element.mobile_no?element.mobile_no:'-'}</p></div>
                <div class="col-2 border-start border-end" ><p class="p-1">${element.address?element.address:'-'}</p></div>
                <div class="col-1"><p class="p-1">${element.city?element.city:'-'}</p></div>
                <div class="col-2 border-start border-end"><p class="p-1">${element.country?element.country:'-'}</p></div>
                <div class="col-2"><p class="p-1 m-1"><button class="btn btn-primary">Send SMS</button></p></div>
            `
            promotional_sms.append(div)
        });
        classChangeForSpinner('d-flex','d-none')
    })
}
