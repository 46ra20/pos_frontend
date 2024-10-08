const handleProduct=async(e)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML = ''
    classChangeForSpinner('d-none','d-flex')

    const div = document.createElement('div')
    // div.classList.add('d-flex')
    div.innerHTML=`
        <div class="d-flex border-bottom justify-content-end">
            <div class="">
                <div class="px-2">
                    <from class="d-flex justify-content-end gap-2">
                        <div class="mb-3">
                            <input
                                type="text"
                                class="form-control"
                                name=""
                                id="search_box"
                                aria-describedby="helpId"
                                placeholder="Product Name or Code"
                                onkeyup="handleProductSearch(event)"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <input
                                type="submit"
                                class="form-control btn btn-primary"
                                name=""
                                id="search_box"
                                aria-describedby="helpId"
                                value="Search"
                            />
                        </div>
                    </from>
                </div>
            </div>
        </div>
        <div class="d-flex">
            <div class="col-7">
                <form class="m-3 col-10 mx-auto d-block border p-3 rounded shadow" onsubmit="handleSubmit(event)" method="post">
                   <div class="mb-3">
                        <label for="" class="form-label">Product Name</label>
                        <input
                            type="text"
                            class="form-control"
                            name="product_name"
                            id="product_name"
                            aria-describedby="helpId"
                            placeholder="Product Name"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Product Code</label>
                        <input
                            type="text"
                            class="form-control"
                            name="product_code"
                            id="product_code"
                            aria-describedby="helpId"
                            placeholder="Product Code"
                            required
                        />
                    </div>
                    <div>
                        <p class="form-label">Select Category</p>
                        <div class="d-flex gap-2 flex-wrap" id="select_category">
                        </div>
                    </div>
                    <select class="form-select  my-2" aria-label="Default select example" id="select_brand">
                        <option selected>Select Brand</option>
                    </select>
                    <button type="submit" class="btn btn-primary d-block w-100" value="Add Product">Add Product</button>

                </form>
            </div>
            <div class="border-start col-5" id="product_list">
            </div>
        </div>
    `
    parent.append(div)
    LoadProduct('all')
    handleOnClickSelector(e)
    await handleCategory()
    await handleBrand()
}

// .addEventListener('DOMContentLoaded',(event)=>{
//     for(let i=0;i<100;i++){
//         console.log(i)
//     }
// })


const LoadProduct=(key)=>{
    const history = document.getElementById('product_list')
    history.innerHTML=''
    history.innerHTML=`
        <div>
            <img src="image/spinner.gif" style="height:100px;width:100px" class="img-fluid d-flex mx-auto align-items-center my-4">
        </div>
    `
    const parentDiv = document.createElement('div')
    // parentDiv=s
    fetch(url+`product/get_all/${key?key:'all'}/`)
    .then(res=>res.json())
    .then(d=>{
        let n=1;
        console.log(d)
        const div = document.createElement('div')
            div.classList.add('border-bottom','fw-semibold','text-center','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1" style="height:60px"><p  class="p-1">No.</p></div>
                <div class="col-5 border-start border-end" style="height:60px"><p class="p-1">Product Name</p></div>
                <div class="col-2 border-end" style="height:60px"><p class="p-1">Pro. Code</p></div>
                <div class="col-2" style="height:60px">
                    <p class="p-1">Action</p>
                </div>
            `
            parentDiv.append(div)
        d.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('border-bottom','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1"><p class="p-1 text-center">${n}.</p></div>
                <div class="col-5 border-start border-end"><p class="p-1">${element.product_name}</p></div>
                <div class="col-2 border-end"><p class="p-1">${element.product_code}</p></div>
                <div class="col-2 d-flex justify-content-around">
                    <button class="btn  class="p-1""><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn  class="p-1"" onclick="handleDelete('${element.id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            `
            parentDiv.append(div)
            n++
        });
        history.innerHTML=''
        history.append(parentDiv)
        classChangeForSpinner('d-flex','d-none')

    })
}

const handleProductSearch=(event)=>{
    LoadProduct(event.target.value)
}


const handleCategory=()=>{
    const parent  = document.getElementById('select_category')

    fetch(url+'product/product_category/')
    .then(res=>res.json())
    .then(data=>{
        data.forEach(element => {
            
            const check = document.createElement('div')
            check.classList.add('form-check','form-check=inline')
            check.innerHTML=`
                    <input class="form-check-input" type="checkbox" id="${element.id}" value="${element.id}">
                    <label class="form-check-label" for="${element.id}">${element.category}</label>
                `
            parent.append(check)
            
        });
    })
}


const handleBrand=()=>{
    const parent = document.getElementById('select_brand')
    fetch(url+`product/product_brand/`)
    .then(res=>res.json())
    .then(data=>{
        data.forEach(element => {
            const option = document.createElement('option')
            option.value=element.id
            option.innerText=element.brand 
            parent.append(option)
        });
    })
}


const handleSubmit=(e)=>{
    e.preventDefault()
    const frm = e.target
    const form = new FormData(frm)
    const category=[]
    const productObject = {}
    

    const category_query = document.getElementById('select_category').querySelectorAll('input')
    category_query.forEach(element => {
        if(element.checked){
            category.push(element.id)
        }
    });
    // form.append('category',category)
    form.append('added_by',1)
    const brand = document.getElementById('select_brand').value
    form.append('brand',brand)

    for(const [name,value] of form){
        productObject[name]=value
    }
    productObject['category']=category

    fetch(url+'product/add_product/1/',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(productObject)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        LoadProduct()
        e.target.reset()
    })
}

const handleDelete = (id)=>{
    console.log(id)
    fetch(url+`product/delete_product/${id}/`,{
        method:'delete'
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        LoadProduct()
    })
}


// handleProduct(event)
// handleCategory()
// handleBrand()