const handleDamage=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''
    classChangeForSpinner('d-none','d-flex')

    parent.innerHTML=`
        <div>
            <h3 class="text-center p-2 fw-bold mb-3">Damage Product</h3>
            <div class="d-flex border-top">
                <div class="col-6 border-end p-2" id="add_Damage_items"></div>
                <div class="col-6" id="Damage_history"></div>
            </div>
        </div>
    `

    handleOnClickSelector(event)
    await DamageItems()
    await handleDamageHistory()
}

const DamageItems=()=>{
    const add_Damage_items = document.getElementById('add_Damage_items')
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
                        required
                    />
                </div>
            <form class="border p-3 rounded shadow" onsubmit="handleProductDamage(event)">
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
                    <button class="btn btn-primary w-100 my-2">Submit
                    <img src="image/spinner.gif" id="login_spin" class="d-none" alt="" style="height: 20px;width: 20px;">
                    </button>
            </form>
        </div>
    `
    add_Damage_items.append(div)
}

const handleProductDamage=(event)=>{
    event.preventDefault()
    const data = new FormData(event.target)
    // console.log(event.target)
    document.getElementById('login_spin').classList.replace('d-none','d-inline')

    data.append('product',parseInt(document.getElementById('product_id').value))
    data.append('added_by',current_user())
    console.log('i am from form',data)

    fetch(url+'product_sales/damage_add/',{
        method:'POST',
        body:data
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        handleDamageHistory()
        document.getElementById('login_spin').classList.replace('d-inline','d-none')

    })    
}



// damage history
const handleDamageHistory=()=>{
    const history=document.getElementById('Damage_history')
    history.innerHTML=''

    fetch(url+'product_sales/damage_get/')
    .then(res=>res.json())
    .then(d=>{
        let n=1;
        console.log(d)
        const div = document.createElement('div')
            div.classList.add('border-bottom','fw-semibold','text-center','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1"><p>No.</p></div>
                <div class="col-5 border-start border-end px-1"><p>Product Name</p></div>
                <div class="col-3 px-1 border-end"><p>Problem</p></div>
                <div class="col-3 px-1"><p>Amount</p></div>
            `
            history.append(div)
        
        d.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('border-bottom','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1"><p>${n}</p></div>
                <div class="col-5 border-start border-end px-1"><p>${element.product_name}</p></div>
                <div class="col-3 px-1 border-end"><p>${element.problem}</p></div>
                <div class="col-3 px-1"><p>${element.amount} TK</p></div>
                `
            history.append(div)
            n++
        });
        classChangeForSpinner('d-flex','d-none')

    })
}


// handleDamage()