const handleExpanses=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''
    classChangeForSpinner('d-none','d-flex')
    parent.innerHTML=`
        <h3 class="text-center p-3 fw-bold border-bottom mb-0">Expenses List</h3>
        <div class="d-lg-flex">
            <div class="col-sm-12 col-lg-5 border-end p-2" id="add_Expense_items"></div>
            <div class="col-sm-12 col-lg-7" id="Expense_history">
            </div>
        </div>
    `

    handleOnClickSelector(event)
    await ExpenseItems()
    await handleExpenseHistory()
}

const ExpenseItems=()=>{
    const add_Expense_items = document.getElementById('add_Expense_items')
    const div = document.createElement('div')
    div.innerHTML=`
        <div class="col-11 mx-auto">
            <form class="border p-2 rounded shadow" onsubmit="handleProductExpense(event)">
                <div class="mb-3">
                    <label for="" class="form-label">For What</label>
                    <input
                        type="text"
                        class="form-control"
                        name="for_what"
                        aria-describedby="helpId"
                        placeholder="Example: Tea"
                        required
                    />
                </div>
               
                    <div class="mb-3">
                        <label for="" class="form-label">Price</label>
                        <input
                            type="text"
                            class="form-control"
                            name="amount"
                            id="amount"
                            aria-describedby="helpId"
                            placeholder="0.00"
                        />
                    </div>
                    <div class="d-flex gap-2">
                        <div class="mb-3">
                            <label for="" class="form-label">Cash</label>
                            <input
                                type="number"
                                class="form-control"
                                name="cash"
                                id="cash"
                                onkeyup="expenseCalculation(event)"
                                aria-describedby="helpId"
                                placeholder="0.00"
                                min=1
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Outstanding</label>
                            <input
                                type="number"
                                class="form-control"
                                name="outstanding"
                                id="outstanding"
                                aria-describedby="helpId"
                                placeholder="0.00"
                                disabled
                            />
                        </div>
                    </div>
                    <input type="submit" class="btn btn-primary w-100" value="Expense"/>
            </form>
        </div>
    `
    add_Expense_items.append(div)
}

const handleProductExpense=(event)=>{
    event.preventDefault()
    const data = new FormData(event.target)
    // console.log(event.target)
    data.append('expense_by',current_user())
    data.append('outstanding',getValue('outstanding'))
    // console.log('i am from form',data)

    fetch(url+'expanses_and_payments/expanse_add/',{
        method:'POST',
        body:data
    })
    .then(r=>r.json())
    .then(d=>console.log(d))    
}


//Expense calculation

const expenseCalculation=(event)=>{
    const amount = document.getElementById('amount')
    event.target.max=amount.value
    const outstanding = document.getElementById('outstanding')
    outstanding.value=amount.value-event.target.value
}




// Expense history
const handleExpenseHistory=()=>{
    const history=document.getElementById('Expense_history')
    history.innerHTML=''

    fetch(url+'expanses_and_payments/expanse/')
    .then(res=>res.json())
    .then(d=>{
        let n=1;
        console.log(d)
        const div = document.createElement('div')
            div.classList.add('border-bottom','fw-semibold','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1"><p>No.</p></div>
                <div class="col-4 border-start border-end"><p>For What</p></div>
                <div class="col-2"><p>Amount</p></div>
                <div class="col-2 border-start border-end"><p>Cash</p></div>
                <div class="col-2"><p>Outsta.</p></div>
            `
            history.append(div)
        
        d.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('border-bottom','d-flex','align-items-center','gap-2')
            div.innerHTML=`
                <div class="col-1"><p>${n}</p></div>
                <div class="col-4 border-start border-end"><p>${element.for_what}</p></div>
                <div class="col-2"><p>${element.amount} ৳</p></div>
                <div class="col-2 border-start border-end"><p>${element.cash} ৳</p></div>
                <div class="col-2"><p>${element.outstanding} ৳</p></div>
                `
            history.append(div)
            n++
        });
        classChangeForSpinner('d-flex','d-none')
    })
}

// handleExpanses()
// ExpenseItems()
// handleExpenseHistory()
