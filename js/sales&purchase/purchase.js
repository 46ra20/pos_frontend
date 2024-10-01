const handlePurchase=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''
    parent.innerHTML=`
        <div class="d-flex">
            <div class="col-6 border-end" id="add_Purchase_items"></div>
            <div class="col-6" id="Purchase_history"></div>
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
            <h3 class="text-center p-2 fw-bold border-bottom mb-3">Purchase Product</h3>
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
            <form class="border col-11 mx-auto p-3 rounded shadow" onsubmit="handleProductPurchase(event)">
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
                        placeholder="Bata Corporation"
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Quantity</label>
                    <input
                        type="number"
                        class="form-control"
                        name="quantity"
                        id=""
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
                            id=""
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
                <input type="submit" class="btn btn-primary w-100" value="Purchase Item"/>
            </form>
        </div>
    `
    add_Purchase_items.append(div)
}

const handleProductPurchase=(event)=>{
    event.preventDefault()
    const data = new FormData(event.target)
    // console.log(event.target)
    data.append('product',parseInt(document.getElementById('product_id').value))
    data.append('purchase_by',1)
    // console.log('i am from form',data)

    fetch(url+'product/purchase/',{
        method:'POST',
        body:data
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        handlePurchaseHistory()
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
            div.classList.add('border-bottom','py-1','px-2','my-1','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1 fw-semibold">No.</div>
                <div class="col-5 fw-semibold border-start border-end px-1">Product Name</div>
                <div class="col-4 fw-semibold px-1">Company Name</div>
                <div class="col-2 fw-semibold border-start border-end px-1">Quantity</div>
            `
            history.append(div)
        
        d.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('border-bottom','py-1','px-2','my-1','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1 fw-semibold">${n}</div>
                <div class="col-5 fw-semibold border-start border-end px-1">${element.product_name}</div>
                <div class="col-4 px-1">${element.company_name}</div>
                <div class="col-3 border-start border-end px-1">${element.quantity}</div>
                `
            history.append(div)
            n++
        });
    })
}
