const handleCategoryPage=async(e)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''

    const div=document.createElement('div');
    div.id="category_details_view"
    div.classList.add('col-6','mx-auto','my-4')

    const addCategory = document.createElement('div');
    const detailsDiv  = document.createElement('div')
    detailsDiv.id="details_div"

    addCategory.innerHTML=`
        <form class="d-flex" method="post" onsubmit="handleAddCategory(event)">
            <div class="mb-3 col-8 pe-2">
                <input
                    type="search"
                    class="form-control"
                    name=""
                    id="add_category"
                    placeholder="Add category..."
                />
            </div>
            <div class="mb-3 col-4">
                <input
                    type="submit"
                    class="form-control btn btn-primary"
                    name=""
                    placeholder="Add category..."
                    value="Add Category"
                />
            </div>
        </form>
    `


    div.appendChild(addCategory)
    div.appendChild(detailsDiv)
    parent.append(div)
    await handleDetails('product/product_category/')

    handleOnClickSelector(e);
}

const handleAddCategory=(event)=>{
    event.preventDefault()
    let category = document.getElementById('add_category').value
    fetch(url+'product/product_category/',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({'category':category,'slug':category})
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        category=''
        handleDetails('product/product_category/')
    })

}

const handleDetails=(link)=>{
    const div = document.getElementById('category_details_view')
    const detailsDiv = document.getElementById('details_div');
    // detailsDiv.innerHTML=''

    fetch(url+link)
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        let cnt=1;
        detailsDiv.classList.add('border','rounded')
        detailsDiv.innerHTML=`
            <div class="d-flex align-items-center border-bottom">
                <div class="col-1 m-0 p-2 fw-semibold"><p>No.</p></div>
                <div class="col-8 m-0 p-2 fw-semibold border-start"><p>Name</p></div>
                <div class="col-3 m-0 p-2 fw-semibold border-start">
                    <p class="text-center">Action</p>
                </div>
            </div>
            `
        d.forEach(element => {
            const categoryDiv = document.createElement('div')
            categoryDiv.classList.add('d-flex','border-bottom','align-items-center')
            categoryDiv.innerHTML=`
                <div class="col-1 m-0 p-2"><p>${cnt}</p></div>
                <div class="col-8 m-0 p-2 border-start"><p>${element.category||element.brand||element.unit}</p></div>
                <div class="col-3 m-0 p-2 d-flex justify-content-around border-start">
                    <button class="btn btn-outline-danger" onclick="handleCategoryDelete('${link}','${element.id}','${element.category||element.brand||element.unit}')" data-bs-toggle="tooltip" data-bs-title="Delete category"><i class="fa-solid fa-trash"></i></button>
                </div>
            `
            detailsDiv.append(categoryDiv)
            cnt++;
        });
    })
    div.appendChild(detailsDiv)
}



const handleCategoryDelete=(link,id,category)=>{
    const con = confirm(`Are you sure?\n${category}`,"Delete Category")
    console.log(con)
    if(con==true){
        categoryDelete(id,link)
        handleDetails(link)
    }
}
const categoryDelete=(id,link)=>{
    fetch(url+link+`${id}/`,{
        method:'Delete'
    })
    .then(r=>r.text())
    .then(d=>{
        console.log(d)
        handleDetails(link)
    })
}

const handleBrandPage=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''

    const div=document.createElement('div');
    div.id="category_details_view"
    div.classList.add('col-6','mx-auto','my-4')

    const addCategory = document.createElement('div');
    const detailsDiv  = document.createElement('div')
    detailsDiv.id="details_div"

    addCategory.innerHTML=`
        <form class="d-flex" method="post" onsubmit="handleAddBrand(event)">
            <div class="mb-3 col-8 pe-2">
                <input
                    type="search"
                    class="form-control"
                    name=""
                    id="add_category"
                    placeholder="Add brand..."
                />
            </div>
            <div class="mb-3 col-4">
                <input
                    type="submit"
                    class="form-control btn btn-primary"
                    name=""
                    placeholder="Add category..."
                    value="Add Brand"
                />
            </div>
        </form>
    `


    div.appendChild(addCategory)
    div.appendChild(detailsDiv)
    parent.append(div)
    await handleDetails('product/product_brand/')

    handleOnClickSelector(event);

}

const handleAddBrand=(event)=>{
    event.preventDefault()
    let category = document.getElementById('add_category').value
    fetch(url+'product/product_brand/',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({'brand':category,'slug':category})
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        category=''
        handleDetails('product/product_brand/')
    })

}

const handleUnit=async(e)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''

    const div=document.createElement('div');
    div.id="category_details_view"
    div.classList.add('col-6','mx-auto','my-4')

    const addCategory = document.createElement('div');
    const detailsDiv  = document.createElement('div')
    detailsDiv.id="details_div"

    addCategory.innerHTML=`
        <form class="d-flex" method="post" onsubmit="handleAddUnit(event)">
            <div class="mb-3 col-8 pe-2">
                <input
                    type="search"
                    class="form-control"
                    name=""
                    id="add_category"
                    placeholder="Add unit..."
                />
            </div>
            <div class="mb-3 col-4">
                <input
                    type="submit"
                    class="form-control btn btn-primary"
                    name=""
                    placeholder="Add category..."
                    value="Add Unit"
                />
            </div>
        </form>
    `


    div.appendChild(addCategory)
    div.appendChild(detailsDiv)
    parent.append(div)
    await handleDetails('product/product_unit/')

    handleOnClickSelector(e);

}

const handleAddUnit=(event)=>{
    event.preventDefault()
    let category = document.getElementById('add_category').value
    fetch(url+'product/product_unit/',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({'unit':category,'slug':category})
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        category=''
        handleDetails('product/product_unit/')
    })

}


// handleCategoryPage()
// handleBrandPage()
// handleUnit()


