let cnt=1;

const handleSales=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML = ''

    const div = document.createElement('div')
    // div.classList.add('d-flex')
    div.innerHTML=`
        <div class="d-flex border-bottom">
            <div class="col-7 d-flex justify-content-center">
                <div class="col-10">
                    <div class="d-flex gap-2">
                        <input 
                            type="text"
                            class="form-control text-end"
                            name="search_key"
                            id="search_box"
                            onkeyup="handleSearch(event)"
                            data-bs-toggle="dropdown" aria-expanded="false"
                            placeholder="search key"
                        />
                        <button class="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">Search</button>
                        <ul class="dropdown-menu col-4 border-0" id="show_search_result">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="border-start col-5">
                <div class="d-flex justify-content-end">
                        <p class="bg-warning px-4 py-2 rounded">History</p>
                </div>
            </div>
        </div>
        <div class="d-flex">
            <div class="col-7" id="brochure_form">
                <form class="col-10 mx-auto my-3 border rounded p-3" action="" method="post" onsubmit="handleBrochureForm(event)">
                    <div class="mb-3">
                        <label for="" class="form-label">Customer Name</label>
                        <input
                        type="text"
                        class="form-control"
                        name="customer_name"
                        id=""
                        aria-describedby="helpId"
                        placeholder="Your name"
                        required
                        />
                    </div>
                    <div class="d-flex gap-2">
                        <div class="mb-3">
                        <label for="" class="form-label">Mobile No.</label>
                        <input
                        type="text"
                        class="form-control"
                        name="mobile_no"
                        id=""
                        aria-describedby="helpId"
                        placeholder="01*********"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Address</label>
                        <input
                        type="text"
                        class="form-control"
                        name="address"
                        id=""
                        aria-describedby="helpId"
                        placeholder="Address"
                        required
                        />
                    </div>
                    </div>
                    <div class="d-flex gap-2 justify-content-between">
                        <div class="mb-3">
                        <label for="" class="form-label">City</label>
                        <input
                            type="text"
                            class="form-control"
                            name="city"
                            id=""
                            aria-describedby="helpId"
                            placeholder="Your City"
                            
                        />
                        </div>
                        <div class="mb-3">
                        <label for="" class="form-label">Country</label>
                        <input
                            type="text"
                            class="form-control"
                            name="country"
                            id=""
                            value="Bangladesh"
                            aria-describedby="helpId"
                            placeholder="Your Country"
                            
                        />
                        </div>
                        
                    </div>
                    <div>
                        <p class="fw-bold">Items Description</p>
                        <div class="border">
                            <div class="d-flex border-bottom">
                                <div class="col-1">
                                    <p class="fw-semibold m-0 p-2">No.</p>
                                </div>
                                <div class="border-start border-end col-5">
                                    <p class="fw-semibold m-0 p-2">Item Name</p>
                                </div>
                                <div class="col-4">
                                    <p class="fw-semibold m-0 p-2">Quantity</p>
                                </div>
                                <div class="col-2 border-start">
                                    <p class="fw-semibold m-0 p-2">Price</p>
                                </div>
                            </div>
                            <div id="items_description"></div>
                            <div class="d-flex justify-content-end">
                                <p class="fw-bold m-0 p-2">Total:</p>
                                <div class="col-2 border-start"> <p class="m-0 p-2" id="totalPrice">0.00</p></div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <input
                            type="submit"
                            class="form-control btn btn-primary my-2"
                            value="Submit"
                        />
                        </div>

                </form>
            </div>
            <div class="col-5 border-start" id="sales_history">
            </div>
        </div>
    `
    parent.append(div)
    LoadHistory()
    handleOnClickSelector(event)
}

// .addEventListener('DOMContentLoaded',(event)=>{
//     for(let i=0;i<100;i++){
//         console.log(i)
//     }
// })


// right side
const LoadHistory=()=>{
    const history = document.getElementById('sales_history')
    history.innerHTML=''

    fetch(url+'product_sales/sales/')
    .then(res=>res.json())
    .then(d=>{
        let n=1;
        // console.log(d)
        const div = document.createElement('div')
            div.classList.add('border-bottom','py-1','px-2','my-1','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1 fw-semibold">No.</div>
                <div class="col-4 fw-semibold border-start border-end p-1">Customer Name</div>
                <div class="col-3 border-end fw-semibold">Total Price</div>
                <div class="col-3 border-end fw-semibold">Outstanding</div>
            `
            history.append(div)
        
        d.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('border-bottom','py-1','px-2','my-1','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1 fw-semibold">${n}</div>
                <div class="col-4 fw-semibold border-start border-end p-1">${element.customer_name}</div>
                <div class="col-3 border-end">${element.total_price} ta</div>
                <div class="col-3 border-end">${element.outstanding} ta</div>`
            history.append(div)
            n++
        });
    })
}




// left side

const handleSearch=(event)=>{
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
        data.forEach(element=>{
            // console.log(element)
            const el = element
            const li = document.createElement('li')
            li.classList.add('d-flex','p-2','border-bottom','justify-content-around','bg-dark','text-white')
            li.innerHTML=`
                <div>${element.product_name}</div>
                <div>${element.product_code}</div>
                <button class="btn btn-outline-warning" onclick="handleItemAdd('${element.id}','${element.product_name}','${element.seals_price}','${element.quantity}')"><i class="fa-solid fa-circle-plus"></i></button>
            `
            show_search_result.append(li)
        })
    })
}


const handleBrochureForm=(event)=>{
    event.preventDefault()
    const total_price = document.getElementById('totalPrice').innerText
    const formData = new FormData(event.target)
    
    let sales_item = []
    const salesObject = {}
    const child = document.getElementById('items_description').childNodes
    child.forEach(i=>{
        console.log(i.id)
        // sales_item+=i.id;
        sales_item.push(parseInt(i.id))
    })

    formData.append('seller',1)
    formData.append('total_price',total_price)
    formData.append('cash',total_price)
    formData.append('outstanding',0)
    // formData.append('sales_item',sales_item)

    for(const [name,value] of formData){
        salesObject[name]=value
    }
    salesObject['sales_item'] = sales_item;

    // console.log(salesObject)

    fetch(url+'product_sales/sales_save/',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(salesObject)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.type=='success'){
            event.target.reset()
            sales_item=[]
            LoadHistory()
        }
    }
    )

}

const handleItemAdd=async(identification,nm,pr,qn)=>{
    // console.log(nm,pr,qn)
    const items_description = document.getElementById('items_description')
    // console.log(items_description)

    const div = document.createElement('div')
    div.id=identification
    div.innerHTML=`
        <div class="d-flex border-bottom align-items-center">
            <div class="col-1">
                <p class="fw-semibold m-0 p-2">${cnt}</p>
            </div>
            <div class="border-start border-end col-5">
                <p class="fw-semibold m-0 p-2">${nm}</p>
            </div>
            <div class=" col-4 d-flex">
                <div class="input-group p-2" id="span_name">
                    <input type="number" class="form-control col-6 d-block rounded" max="${qn}" min="1" value="1" aria-label="Dollar amount (with dot and two decimal places)" onchange="handleCalculation(event)">
                    <span name="${pr}"></span>
                </div>
                
            </div>
            <div class="col-2 border-start">
                <p class="m-0 p-2 itemPrice" name="price">${pr}</p>
            </div>
        </div>
    `
    items_description.append(div)
    await getTotal()
    document.getElementById('search_box').value=''
    cnt++;
}


const handleCalculation=(e)=>{

    const priceShow = e.target.parentNode.parentNode.parentNode.querySelectorAll("p[name='price']")
    const itemPrice = e.target.parentNode.querySelectorAll("span[name]")
    
    const sales_price = itemPrice[0].attributes['name'].value;
    
    priceShow[0].innerText=e.target.value*sales_price

    getTotal()
}


const getTotal=()=>{
    const getAllPrice = document.getElementById('items_description').querySelectorAll(".itemPrice")
    let total = 0;
    getAllPrice.forEach(e=>{
        total += parseFloat(e.innerText)
    })
    document.getElementById('totalPrice').innerText=total
    console.log(total)
}

const handlePrint=()=>{
    const brochure_form = document.getElementById('brochure_form').innerHTML
    
    const a = window.open('','','height=500px,width=500px')
    a.document.write('<htm>');
    a.document.write('<body>');
    a.document.write(brochure_form)
    a.document.write('</body></html>')
    a.document.close()
    a.print()
    
    console.log('hello')
}

// handleSales()