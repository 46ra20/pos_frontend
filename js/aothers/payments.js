const handlePayments=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''
    parent.innerHTML=`
        <div class="d-flex">
            <div class="col-6 border-end" id="add_Payment_items"></div>
            <div class="col-6" id="Payment_history"></div>
        </div>
    `

    handleOnClickSelector(event)
    await PaymentItems()
    await handlePaymentHistory()
}

const PaymentItems=()=>{
    const add_Payment_items = document.getElementById('add_Payment_items')
    const div = document.createElement('div')
    div.innerHTML=`
        <div class="col-11 mx-auto">
            <h3 class="text-center p-2 fw-bold border-bottom mb-3">Payment</h3>
             <div class="m-0 p-0">
                    <input
                        type="text"
                        class="form-control d-none"
                        id="product_id"
                        aria-describedby="helpId"
                        placeholder="Find your product.."
                        required
                    />
                </div>
            <form class="border p-3 rounded shadow" onsubmit="handleProductPayment(event)">
                <div class="mb-3">
                    <label for="" class="form-label">Product Name</label>
                    <input
                        type="text"
                        class="form-control"
                        name=""
                        id="search_box"
                        onkeyup="handleSearchByCompanyName(event)"
                        aria-describedby="helpId"
                        placeholder="Find your product.."
                        data-bs-toggle="dropdown" aria-expanded="false"
                        required
                    />
                    <ul class="dropdown-menu col-4 border-0" id="show_search_result">
                    </ul>
                </div>
               
                    <div class="mb-3">
                        <label for="" class="form-label">Total Price</label>
                        <input
                            type="text"
                            class="form-control"
                            name="total_price"
                            id="total_price"
                            aria-describedby="helpId"
                            placeholder="0.00"
                            disabled
                        />
                    </div>
                    <div class="d-flex gap-2">
                        <div class="mb-3">
                            <label for="" class="form-label">Cash</label>
                            <input
                                type="number"
                                class="form-control"
                                name="cash"
                                id="cash"
                                onkeyup="calculateOutstanding(event)"
                                aria-describedby="helpId"
                                placeholder="0.00"
                                min=1
                                required
                            />
                        </div>
                        <div class="mb-3 d-none">
                            <label for="" class="form-label">Outstanding</label>
                            <input
                                type="number"
                                class="form-control"
                                name="outstanding"
                                id="outstanding_calculate"
                                aria-describedby="helpId"
                                placeholder="0.00"
                                disabled
                            />
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Outstanding</label>
                            <input
                                type="number"
                                class="form-control"
                                name="outstanding"
                                id="outstanding"
                                aria-describedby="helpId"
                                placeholder="0.00"
                                disabled
                            />
                        </div>
                    </div>
                    <input type="submit" class="btn btn-primary w-100" value="Payment"/>
            </form>
        </div>
    `
    add_Payment_items.append(div)
}

const handleProductPayment=(event)=>{
    event.preventDefault()
    const data = new FormData(event.target)
    // console.log(event.target)
    data.append('product',parseInt(document.getElementById('product_id').value))
    data.append('Payment_by',current_user())
    // console.log('i am from form',data)

    fetch(url+'product_sales/Payment/',{
        method:'POST',
        body:data
    })
    .then(r=>r.json())
    .then(d=>console.log(d))    
}



const handleSearchByCompanyName=(event)=>{
    event.preventDefault()
    const show_search_result = document.getElementById('show_search_result')
    // show_search_result.classList.replace('d-none','d-block')
    const frm = document.getElementById('search_box')
    
    // fetch(url+`product/search_product/x/`)
    fetch(url+`expanses_and_payments/payment/${event.target.value}/`)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
        show_search_result.innerHTML=``
        data.forEach(element=>{
            // console.log(element)
            const el = element
            const li = document.createElement('li')
            li.classList.add('d-flex','p-2','border-bottom','justify-content-around','bg-dark','text-white')
            li.innerHTML=`
                <div>${element.company_name}</div>
                <button class="btn btn-outline-warning" onclick="setValue(${element.total_price},${element.outstanding})"><i class="fa-solid fa-circle-plus"></i></button>
            `
            show_search_result.append(li)
        })
    })
}

// set value 
const setValue=(tp,outstanding)=>{
    document.getElementById('total_price').value=tp
    document.getElementById('outstanding').value=outstanding
    document.getElementById('outstanding_calculate').value=outstanding
    document.getElementById('cash').max=outstanding
}

// calculateOutstanding
const calculateOutstanding=(event)=>{
    let outstanding = document.getElementById('outstanding_calculate').value
    if(outstanding>-1){
        document.getElementById('outstanding').value=outstanding-event.target.value
    }
}

// Payment history
const handlePaymentHistory=()=>{
    const history=document.getElementById('Payment_history')
    history.innerHTML=''

    fetch(url+'expanses_and_payments/payment/all/')
    .then(res=>res.json())
    .then(d=>{
        let n=1;
        console.log(d)
        const div = document.createElement('div')
            div.classList.add('border-bottom','py-1','px-2','my-1','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1 fw-semibold">No.</div>
                <div class="col-5 fw-semibold border-start border-end px-1">Company Name</div>
                <div class="col-3 fw-semibold px-1">Total Price</div>
                <div class="col-3 fw-semibold border-start border-end px-1">Outstanding</div>
            `
            history.append(div)
        
        d.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('border-bottom','py-1','px-2','my-1','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1 fw-semibold">${n}</div>
                <div class="col-5 fw-semibold border-start border-end px-1">${element.company_name}</div>
                <div class="col-3 px-1">${element.total_price}</div>
                <div class="col-3 border-start border-end px-1">${element.outstanding}</div>
                `
            history.append(div)
            n++
        });
    })
}