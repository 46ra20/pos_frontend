const handleCategoryPage=async(e)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''

    const div=document.createElement('div');
    div.id="category_details_view"
    div.classList.add('col-6','mx-auto')

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
    await handleDetails()

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
        handleDetails()
    })

}

const handleDetails=()=>{
    const div = document.getElementById('category_details_view')
    const detailsDiv = document.getElementById('details_div');
    // detailsDiv.innerHTML=''

    fetch(url+'product/product_category/')
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
                <div class="col-8 m-0 p-2 border-start"><p>${element.category}</p></div>
                <div class="col-3 m-0 p-2 d-flex justify-content-around border-start">
                    <button class="btn" onclick="handleCategoryDelete('${element.id}','${element.category}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            `
            detailsDiv.append(categoryDiv)
            cnt++;
        });
    })
    div.appendChild(detailsDiv)
}



const handleCategoryDelete=(id,category)=>{
    const con = confirm(`Are you sure?\n${category}`,"Delete Category")
    console.log(con)
    if(con==true){
        categoryDelete(id)
        handleDetails()
    }
    // console.log(category)
    // const parent = document.getElementById('canvas_details')
    // const div=document.createElement('div')
    // div.id="confirmation_message_dialog"
    // div.classList.add('h-100','w-100','position-fixed','top-0','d-flex')
    // div.style="top:50px;background-color:#00000"
    // div.classList.replace('d-none','d-flex')

    // const messageDiv = document.createElement('div')
    // messageDiv.classList.add('col-3')
    // messageDiv.style="margin-left:150px;margin-top:50px;"
    // messageDiv.innerHTML=`
    // <div class="bg-light border rounded p-4">
    //     <p class="fw-bold">Are you sure?</p>
    //     <p class="fw-semibold">${category}</p>
    //     <div class="d-flex gap-2 justify-content-end">
    //         <button class="btn btn-danger" onclick="categoryDelete('${id}')">Yes</button>
    //         <button class="btn btn-primary" onclick="document.getElementById('confirmation_message_dialog').classList.replace('d-flex','d-none')">No</button>
    //     </div>
    // </div>
    // `
    
    // div.append(messageDiv)
    // parent.append(div)
}
const categoryDelete=(id)=>{
    fetch(url+`product/product_category/${id}/`,{
        method:'Delete'
    })
    .then(r=>r.text())
    .then(d=>{
        console.log(d)
        handleDetails()
    })
}

const handleBrandPage=(event)=>{
    handleOnClickSelector(event);

}

// handleCategoryPage()
handleBrandPage()


