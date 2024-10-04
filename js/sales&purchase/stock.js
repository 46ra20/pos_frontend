const handleStock=async(event)=>{
    const user_id = sessionStorage.getItem('user_id')
    if(!user_id){
        window.location.href='index.html'
    }
    classChangeForSpinner('d-none','d-flex')
    const parent = document.getElementById('canvas_details')
    parent.innerHTML = ''

    parent.innerHTML=`
        <div class="mb-3 border-bottom">
            <h2 class="fw-bold text-center">Stock List</h2>
        </div>
    `

    const div = document.createElement('div')
    div.id="view_stock"
    parent.append(div)
    handleOnClickSelector(event)
    await showStock()
}


const showStock=()=>{
    const view_stock = document.getElementById('view_stock')
    // view_stock.innerHTML=''
    view_stock.classList.add('border','rounded')
    view_stock.innerHTML=`
        <div>
            <div class="d-flex border-top text-center fw-bold align-items-center">
                    <div class="col-1" style="height:60px">No</div>
                    <div class="col-3 border-start border-end" style="height:60px">Product Name</div>
                    <div class="col-2" style="height:60px">Company Name</div>
                    <div class="col-2 border-start border-end" style="height:60px">Date</div>
                    <div class="col-1" style="height:60px">Quantity</div>
                    <div class="col-1 border-start border-end" style="height:60px">Current Price</div>
                    <div class="col-1" style="height:60px">Purchase Price</div>
                    <div class="col-1 border-start" style="height:60px">Sales Price</div>
               </div>
        </div>
    `
    fetch(url+'product/view_stock/')
    .then(r=>r.json())
    .then(d=>{
        let n=0
        d.forEach(element => {
            const div = document.createElement('div')
            div.innerHTML= `
               <div class="d-flex border-top">
                    <div class="col-1"><p class="p-1 text-center">${++n}.</p></div>
                    <div class="col-3 border-start border-end"><p class="p-1">${element.product_name}</p></div>
                    <div class="col-2"><p class="p-1">${element.company_name}</p></div>
                    <div class="col-2 border-start border-end"><p class="p-1">${element.date_time}</p></div>
                    <div class="col-1"><p class="p-1">${element.product_quantity}</p></div>
                    <div class="col-1 border-start border-end"><p class="p-1">${element.current_price}<p></div>
                    <div class="col-1"><p class="p-1">${element.purchase_price}</p></div>
                    <div class="col-1 border-start"><p class="p-1">${element.sales_price}</p></div>
               </div>
            `
            view_stock.append(div)
        });
        classChangeForSpinner('d-flex','d-none')
    })
        // 'product_name','company_name','date_time','product_quantity','current_price','purchase_price','sales_price'
}
handleStock()
showStock()