const handleSales=(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML = ''

    const div = document.createElement('div')
    // div.classList.add('d-flex')
    div.innerHTML=`
        <div class="d-flex border-bottom">
            <div class="col-7">
                <div class="px-2">
                    <form class="d-flex justify-content-end gap-2" onsubmit="handleSearch(event)" method="post">
                        <div class="mb-3">
                            <input
                                type="text"
                                class="form-control"
                                name=""
                                id="search_box"
                                aria-describedby="helpId"
                                placeholder="product name or code"
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
                    </form>
                </div>
            </div>
            <div class="border-start col-5">
                <div class="d-flex justify-content-end">
                        <p class="bg-warning px-4 py-2 rounded">History</p>
                </div>
            </div>
        </div>
        <div class="d-flex">
            <div class="col-7">
            </div>
            <div class="border-start col-5" id="sales_history">
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


const LoadHistory=()=>{
    const history = document.getElementById('sales_history')

    for(let i=0;i<100;i++){
        const p = document.createElement('p')
        p.innerText=i;
        p.classList.add('border-bottom','py-1','px-2','my-1')
        history.appendChild(p)
    }
}

const handleSearch=(event)=>{
    event.preventDefault()
    
    
}

handleSales()