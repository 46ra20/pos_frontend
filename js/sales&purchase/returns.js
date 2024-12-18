const handleReturns=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''
    classChangeForSpinner('d-none','d-flex')

    parent.innerHTML=`
        <div>
            <h3 class="text-center p-3 m-0 fw-bold border-bottom">Return Product</h3>
            <div class="d-flex">
                <div class="col-6 border-end" id="add_returns_items"></div>
                <div class="col-6" id="returns_history"></div>
            </div>
        </div>
    `

    handleOnClickSelector(event)
    await ReturnsItems()
    await handleReturnsHistory()
}

const ReturnsItems=()=>{
    const add_returns_items = document.getElementById('add_returns_items')
    const div = document.createElement('div')
    div.innerHTML=`
        <div class="col-11 mx-auto">
             <div class="m-0 p-0">
                    <input
                        type="text"
                        class="form-control d-none"
                        id="product_id"
                        aria-describedby="helpId"
                        placeholder="Find your product.."
                        autocomplete="off"
                        required
                    />
                </div>
            <form class="border p-3 mt-2 rounded shadow" onsubmit="handleProductReturn(event)">
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
                    <ul class="dropdown-menu col-4 border border-secondary" id="show_search_result">
                            <li id="spinner_div">                    
                                <img src="image/spinner.gif" id="login_spin" class="d-block mx-auto" alt="" style="height: 20px;width: 20px;">
                            </li>
                    </ul>
                </div>
               
                <div class="mb-3">
                    <label for="" class="form-label">Where From</label>
                    <select
                        class="form-select form-select-md"
                        name="return_from"
                        id=""
                        required
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="OURSELF">Ourself</option>
                    </select>
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Problem</label>
                        <input
                            type="text"
                            class="form-control"
                            name="problem"
                            id=""
                            aria-describedby="helpId"
                            placeholder="Enter your problem"
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
                    <input type="submit" class="btn btn-primary w-100" value="Return"/>
            </form>
        </div>
    `
    add_returns_items.append(div)
}

const handleProductReturn=(event)=>{
    event.preventDefault()
    const data = new FormData(event.target)
    // console.log(event.target)
    data.append('product',parseInt(document.getElementById('product_id').value))
    data.append('return_by',current_user())
    // console.log('i am from form',data)

    fetch(url+'product_sales/return/',{
        method:'POST',
        body:data
    })
    .then(r=>r.json())
    .then(d=>console.log(d))    
}



const handleSearchByKey=(event)=>{
    event.preventDefault()
    const show_search_result = document.getElementById('show_search_result')
    // show_search_result.classList.replace('d-none','d-block')
    const frm = document.getElementById('search_box')
    
    // fetch(url+`product/search_product/x/`)
    fetch(url+`product/search_product/${frm.value?frm.value:'x'}/`)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
        show_search_result.innerHTML=``
        if(data.length>0){
            data.forEach(element=>{
                // console.log(element)
                const el = element
                const li = document.createElement('li')
                li.classList.add('d-flex','p-2','border-bottom','justify-content-between')
                li.innerHTML=`
                    <div  class='col-6'>${element.product_name}</div>
                    <div class='col-4'>${element.product_code}</div>
                    <div  class='col-2'><button class="btn btn-outline-warning" onclick="handleItemAddForReturn('${element.id}','${element.product_name}')"><i class="fa-solid fa-circle-plus"></i></button></div>
                `
                show_search_result.append(li)
            })
            
        }
        else{
            const li = document.createElement('li')
            li.innerHTML=`
                <p class="text-center">No item found</p>
            `
            show_search_result.append(li)

        }
        
    })
}

const handleItemAddForReturn=(id,name)=>{
    // console.log(id,name)
    document.getElementById('search_box').value=`${name}`
    document.getElementById('product_id').value=`${id}`
    // console.log(document.getElementById('product_id'))
}

// return history
const handleReturnsHistory=()=>{
    const history=document.getElementById('returns_history')
    history.innerHTML=''

    fetch(url+'product_sales/return_by_key/all/')
    .then(res=>res.json())
    .then(d=>{
        let n=1;
        console.log(d)
        const div = document.createElement('div')
            div.classList.add('border-bottom','fw-semibold','text-center','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1"><p class="p-1">No.</p></div>
                <div class="col-4 border-start border-end"><p class="p-1">Product Name</p></div>
                <div class="col-4"><p class="p-1">Problem</p></div>
                <div class="col-3 border-start border-end"><p class="p-1">From</p></div>
            `
            history.append(div)
        
        d.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('border-bottom','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1"><p class="p-1 text-center">${n}.</p></div>
                <div class="col-4 border-start border-end"><p class="p-1">${element.product}</p></div>
                <div class="col-4"><p class="p-1">${element.problem}</p></div>
                <div class="col-3 border-start border-end"><p class="p-1">${element.return_from}</p></div>
                `
            history.append(div)
            n++
        });
        classChangeForSpinner('d-flex','d-none')
    })
}
// handleReturns()
// ReturnsItems()
// handleReturnsHistory()
// alert()