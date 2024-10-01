const handleStock=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML = ''

    const div = document.createElement('div')
    div.id="view_stock"
    parent.append(div)
    handleOnClickSelector(event)
    await showStock()

}


const showStock=()=>{
    const view_stock = document.getElementById('view_stock')
    view_stock.innerHTML=''
    view_stock.classList.add('border','rounded')
    view_stock.innerHTML=`
        <div>
            <div class="d-flex border-top text-center fw-bold">
                    <div class="col-1">No</div>
                    <div class="col-3 border-start border-end">Product Name</div>
                    <div class="col-2">Company Name</div>
                    <div class="col-2 border-start border-end">Date</div>
                    <div class="col-1">Quantity</div>
                    <div class="col-1 border-start border-end">Current Price</div>
                    <div class="col-1">Purchase Price</div>
                    <div class="col-1 border-start">Sales Price</div>
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
                    <div class="col-1"><p class="p-1 text-center">${++n}</p></div>
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
    })
        // 'product_name','company_name','date_time','product_quantity','current_price','purchase_price','sales_price'
}
handleStock()
showStock()