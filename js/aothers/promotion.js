const handlePromotionalSMS=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML = ''

    const div = document.createElement('div')
    div.id="promotional_sms"
    parent.append(div)
    await handleOnClickSelector(event)
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
            <div class="d-flex fw-bold text-center">
                <div class="col-1"><p>No.</p></div>
                <div class="col-2 border-start border-end"><p>Customer Name</p></div>
                <div class="col-2"><p>Mobil</p></div>
                <div class="col-2 border-start border-end"><p>Address</p></div>
                <div class="col-1"><p>City</p></div>
                <div class="col-2 border-start border-end"><p>Country</p></div>
                <div class="col-2"><p>Action</p></div>
            </div>
        `
        console.log(d)
        d.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('d-flex','border-top','text-center')
            div.innerHTML=`
                <div class="col-1"><p>${++n}</p></div>
                <div class="col-2 border-start border-end"><p>${element.customer_name}</p></div>
                <div class="col-2"><p>${element.mobile_no?element.mobile_no:'-'}</p></div>
                <div class="col-2 border-start border-end" ><p>${element.address?element.address:'-'}</p></div>
                <div class="col-1"><p>${element.city?element.city:'-'}</p></div>
                <div class="col-2 border-start border-end"><p>${element.country?element.country:'-'}</p></div>
                <div class="col-2"><p><button class="btn btn-primary">Send SMS</button></p></div>
            `
            promotional_sms.append(div)
        });
    })
}
