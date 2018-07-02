//listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
    //Hide result
    document.getElementById('results').style.display = 'none';
    
    //Show loader
    document.getElementById('loading').style.display = 'block';
    
    setTimeout(calculateResults,2000);
    
    e.preventDefault();
});

//Calculate Results
function calculateResults(){
    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    const compound = document.getElementById('compound');
    
    
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 ;
    const calculatedPayments = parseFloat(years.value) ;
    const compoundPerYear = parseFloat(compound.value);
    //compute monthly payment
    const x = Math.pow(1 + calculatedInterest/compoundPerYear, calculatedPayments*compoundPerYear);
    const monthly = (principal*x)/12/calculatedPayments;
//    console.log(x);
//    console.log(calculatedInterest);
//    console.log(calculatedPayments);
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments*12).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments*12)-principal).toFixed(2);
        
        //Show Results
        document.getElementById('results').style.display = 'block';
        
        //hide loader
        document.getElementById('loading').style.display = 'none';


    } else {
        showError('please check your number');
    }
    
}

//Show Error
function showError(error){
     //Hide Results
        document.getElementById('results').style.display = 'none';
        
        //hide loader
        document.getElementById('loading').style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');
    
    //Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    //Add Class
    errorDiv.className = 'alert alert-danger';
    
    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    
    //Insert error above heading
    card.insertBefore(errorDiv, heading);
    
    //Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

//Clear error
function clearError(){
    document.querySelector('.alert').remove();
}


