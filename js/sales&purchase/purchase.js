const handlePurchase=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''
    classChangeForSpinner('d-none','d-flex')
    parent.innerHTML=`
        <div>
            <h3 class="text-center p-3 m-0 fw-bold border-bottom">Purchase Product</h3>
            <div class="d-flex">
                <div class="col-6 border-end" id="add_Purchase_items"></div>
                <div class="col-6" id="Purchase_history"></div>
            </div>
        </div>
    `

    handleOnClickSelector(event)
    await PurchaseItems()
    await handlePurchaseHistory()
}

const PurchaseItems=()=>{
    const add_Purchase_items = document.getElementById('add_Purchase_items')
    const div = document.createElement('div')
    div.innerHTML=`
        <div class="mx-auto">
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
            <form class="border col-11 mx-auto p-3 my-3 rounded shadow" onsubmit="handleProductPurchase(event)">
                <div class="mb-3">
                    <label for="" class="form-label">Product Name</label>
                    <input
                        type="text"
                        class="form-control"
                        name=""
                        id="search_box"
                        onkeyup="handleSearchByKey(event)"
                        aria-describedby="helpId"
                        placeholder="Find your product.."
                        data-bs-toggle="dropdown" aria-expanded="false"
                        required
                    />
                    <ul class="dropdown-menu col-4 border-0" id="show_search_result">
                    </ul>
                </div>
               
                <div class="mb-3">
                    <label for="" class="form-label">Company Name</label>
                    <input
                        type="text"
                        class="form-control"
                        name="company_name"
                        id=""
                        aria-describedby="helpId"
                        placeholder="Example: Bata Corporation"
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Quantity</label>
                    <input
                        type="number"
                        class="form-control"
                        name="quantity"
                        id="quantity"
                        aria-describedby="helpId"
                        placeholder="How many.."
                        min=1
                        required
                    />
                </div>
                <div class="d-flex gap-2">
                    <div class="mb-3">
                        <label for="" class="form-label">Purchase Price</label>
                        <input
                            type="number"
                            class="form-control"
                            name="purchase_price"
                            id="purchase_price"

                            onkeyup="handleTotalCalculation(event)"
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Sales Price</label>
                        <input
                            type="number"
                            class="form-control"
                            name="sales_price"
                            id=""
                            placeholder="0.00"
                            required
                        />
                    </div>
                </div>
                <div class="mb-3">
                        <label for="" class="form-label">Total Price</label>
                        <input
                            type="number"
                            class="form-control"
                            name="total_price"
                            id="total_price"
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
                            onkeyup="handleOutstanding(event)"
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Outstanding</label>
                        <input
                            type="number"
                            class="form-control"
                            name="outstanding"
                            id="outstanding"
                            placeholder="0.00"
                            disabled
                        />
                    </div>
                </div>
                <button class="btn btn-primary w-100">Purchase Item
                    <img src="image/spinner.gif" id="login_spin" class="d-none" alt="" style="height: 20px;width: 20px;">
                </button>
            </form>
        </div>
    `
    add_Purchase_items.append(div)
}

const handleProductPurchase=(event)=>{
    event.preventDefault()
    const data = new FormData(event.target)
    document.getElementById('login_spin').classList.replace('d-none','d-inline')

    // console.log(event.target)
    data.append('product',parseInt(document.getElementById('product_id').value))
    data.append('purchase_by',current_user())
    data.append('total_price',getValue('total_price'))
    data.append('outstanding',getValue('outstanding'))
    console.log('i am from form',data)

    fetch(url+'product/purchase/',{
        method:'POST',
        body:data
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        handlePurchaseHistory()
        document.getElementById('login_spin').classList.replace('d-inline','d-none')

        event.target.reset()
    })
}



// const handleSearchByKey=(event)=>{
//     event.preventDefault()
//     const show_search_result = document.getElementById('show_search_result')
//     // show_search_result.classList.replace('d-none','d-block')
//     const frm = document.getElementById('search_box')
    
//     // fetch(url+`product/search_product/x/`)
//     fetch(url+`product/search_product/${frm.value?frm.value:'x'}/`)
//     .then(res=>res.json())
//     .then(data=>{
//         // console.log(data)
//         show_search_result.innerHTML=``
//         data.forEach(element=>{
//             // console.log(element)
//             const el = element
//             const li = document.createElement('li')
//             li.classList.add('d-flex','p-2','border-bottom','justify-content-around','bg-dark','text-white')
//             li.innerHTML=`
//                 <div>${element.product_name}</div>
//                 <div>${element.product_code}</div>
//                 <button class="btn btn-outline-warning" onclick="handleItemAddForPurchase('${element.id}','${element.product_name}')"><i class="fa-solid fa-circle-plus"></i></button>
//             `
//             show_search_result.append(li)
//         })
//     })
// }

const handleItemAddForPurchase=(id,name)=>{
    // console.log(id,name)
    document.getElementById('search_box').value=`${name}`
    document.getElementById('product_id').value=`${id}`
    // console.log(document.getElementById('product_id'))
}

const handleTotalCalculation=(event)=>{
    const quantity = document.getElementById('quantity')
    const total = document.getElementById('total_price')
    total.value=quantity.value * event.target.value
}

const handleOutstanding=(event)=>{
    const outstanding = document.getElementById('outstanding')
    const total = document.getElementById('total_price')

    outstanding.value=total.value-event.target.value
}


// Purchase history
const handlePurchaseHistory=()=>{
    const history=document.getElementById('Purchase_history')
    history.innerHTML=''

    fetch(url+'product/view_purchase/')
    .then(res=>res.json())
    .then(d=>{
        let n=1;
        console.log(d)
        const div = document.createElement('div')
            div.classList.add('border-bottom','fw-semibold','text-center','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1"><p class="p-1">No.</p></div>
                <div class="col-5 border-start border-end"><p class="p-1">Product Name</p></div>
                <div class="col-4"><p class="p-1">Company Name</p></div>
                <div class="col-2 border-start border-end"><p class="p-1">Quantity</p></div>
            `
            history.append(div)
        
        d.forEach(element => {
            console.log(element)
            const div = document.createElement('div')
            div.classList.add('border-bottom','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1"><p class="text-center p-1">${n}.</p></div>
                <div class="col-5 border-start border-end"><p class="p-1">${element?.product_name}</p></div>
                <div class="col-4"><p class="p-1">${element?.company_name}</p></div>
                <div class="col-2 border-start border-end"><p class="p-1">${element?.quantity}</p></div>
                `
            history.append(div)
            n++
        });
        classChangeForSpinner('d-flex','d-none')
    })
}
