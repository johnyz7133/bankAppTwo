document.getElementById('viewBalance').onclick = viewBalance;
document.getElementById('deposit').onclick = deposit;
document.getElementById('withdraw').onclick = withdraw;
document.getElementById('viewPosted').onclick = viewPosted;
document.getElementById('viewIncoming').onclick = viewIncoming;
document.getElementById("postTransfer").onclick = postTransfer;
document.getElementById('acceptTransfer').onclick = acceptTransfer;
document.getElementById('rejectTransfer').onclick = rejectTransfer;

function viewBalance(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = receiveData;
    var baseURL = 'http://localhost:8080/RestExample2/rest/accController/viewBalance/'
    xhttp.open('GET', baseURL + '' + sessionStorage.getItem("accountNumber"));
    xhttp.send();
    function receiveData(){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                //successful
                var response = xhttp.responseText;
                var numberResponse = Number(response);
                var content = document.createElement('h1');
                content.innerHTML = "$" + numberResponse.toFixed(2);

                formSection.appendChild(content);
            }else{
                //
            }
        }else{
            //
        }
    }
}
function deposit(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var formGroup = document.createElement('div');
    formGroup.className = "form-group";
    var label1 = document.createElement('label');
    label1.htmlFor = "depositAmount";
    label1.innerHTML = "Deposit Amount:";
    var input1 = document.createElement('input');
    input1.type = "number";
    input1.className = "form-control";
    input1.placeholder = "Enter Deposit Amount";
    input1.id = "depositAmount";
    input1.name = "depositAmount";
    formGroup.appendChild(label1);
    formGroup.appendChild(input1);

    var submitButton = document.createElement('button');
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.id = "submitPressed";
    submitButton.innerHTML = "Submit";
    formGroup.appendChild(submitButton);
    formSection.appendChild(formGroup);

    
    document.getElementById("submitPressed").onclick = accountDeposit;

    function accountDeposit(){
        var depositAmount = document.getElementById("depositAmount").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = receiveData;
        var baseURL = 'http://localhost:8080/RestExample2/rest/accController/deposit/'
        xhttp.open('GET', baseURL + '' + sessionStorage.getItem("accountNumber") +  "/" + depositAmount);
        xhttp.send();
        function receiveData(){
            if (xhttp.readyState === 4){
                if (xhttp.status === 200){
                    //successful
                    var response = xhttp.responseText;
                    if (response == 0){
                        document.getElementById("contentContainer2").innerHTML = "</br><h6>Deposit failed: Input a valid amount</h6>";
                    }
                    else if (response == 1){
                        while (formSection.firstChild) {
                            formSection.removeChild(formSection.lastChild);
                          }
                          formSection.innerHTML = "Deposit successful.";
                          document.getElementById("contentContainer2").innerHTML = '';
                    }
                }else{
                    //
                }
            }else{
                //
            }
        }
    }
    
}
function withdraw(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var formGroup = document.createElement('div');
    formGroup.className = "form-group";
    var label1 = document.createElement('label');
    label1.htmlFor = "withdrawAmount";
    label1.innerHTML = "Withdraw Amount:";
    var input1 = document.createElement('input');
    input1.type = "number";
    input1.className = "form-control";
    input1.placeholder = "Enter Withdraw Amount";
    input1.id = "withdrawAmount";
    input1.name = "withdrawAmount";
    formGroup.appendChild(label1);
    formGroup.appendChild(input1);

    var submitButton = document.createElement('button');
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.id = "submitPressed";
    submitButton.innerHTML = "Submit";
    formGroup.appendChild(submitButton);
    formSection.appendChild(formGroup);

    
    document.getElementById("submitPressed").onclick = accountWithdraw;

    function accountWithdraw(){
        var withdrawAmount = document.getElementById("withdrawAmount").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = receiveData;
        var baseURL = 'http://localhost:8080/RestExample2/rest/accController/withdraw/'
        xhttp.open('GET', baseURL + '' + sessionStorage.getItem("accountNumber") +  "/" + withdrawAmount);
        xhttp.send();
        function receiveData(){
            if (xhttp.readyState === 4){
                if (xhttp.status === 200){
                    //successful
                    var response = xhttp.responseText;
                    if (response == 0){
                        document.getElementById("contentContainer2").innerHTML = "</br><h6>Withdrawal failed: Input a valid amount</h6>";
                    }
                    else if (response == 1){
                        while (formSection.firstChild) {
                            formSection.removeChild(formSection.lastChild);
                          }
                          formSection.innerHTML = "Withdrawal successful.";
                          document.getElementById("contentContainer2").innerHTML = '';
                    }
                }else{
                    //
                }
            }else{
                //
            }
        }
    }

}
function viewPosted(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = receiveData;
    var baseURL = 'http://localhost:8080/RestExample2/rest/accController/viewPosted/'
    xhttp.open('GET', baseURL + '' + sessionStorage.getItem("accountNumber"));
    xhttp.send();
    function receiveData(){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                //successful
                var response = xhttp.responseText;
                if (response == ""){
                    console.log("abc");
                    formSection.innerHTML = "<h4>No posted transfers.</h4>";
                }
                else{
                    console.log("123");
                    var sectionedResponse = response.split("|");
                    console.log(sectionedResponse[0]);
                    for (i=0; i < sectionedResponse.length; i++){
                        formSection.innerHTML += "<h6>" + sectionedResponse[i] + "</h6></br>";
                    }
                    
                }
            }
            else{
                //
            }
        }
        else{
            //
        }
    }
}
function viewIncoming(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = receiveData;
    var baseURL = 'http://localhost:8080/RestExample2/rest/accController/viewIncoming/'
    xhttp.open('GET', baseURL + '' + sessionStorage.getItem("accountNumber"));
    xhttp.send();
    function receiveData(){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                var response = xhttp.responseText;
                if (response == ""){
                    console.log("abc");
                    formSection.innerHTML = "<h4>No incoming transfers.</h4>";
                }
                else{
                    console.log("123");
                    var sectionedResponse = response.split("|");
                    console.log(sectionedResponse[0]);
                    for (i=0; i < sectionedResponse.length; i++){
                        formSection.innerHTML += "<h6>" + sectionedResponse[i] + "</h6></br>";
                    }
                    
                }
            }
            else{
                //
            }
        }
        else{
            //
        }
    }
}
function postTransfer(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var formGroup = document.createElement('div');
    formGroup.className = "form-group";
    var label1 = document.createElement('label');
    label1.htmlFor = "receiveAcc";
    label1.innerHTML = "Receiving Account:";
    var input1 = document.createElement('input');
    input1.type = "number";
    input1.className = "form-control";
    input1.placeholder = "Enter Receiver's Account Number";
    input1.id = "receiveAcc";
    input1.name = "receiveAcc";
    formGroup.appendChild(label1);
    formGroup.appendChild(input1);

    var label2 = document.createElement('label');
    label2.htmlFor = "postAmount";
    label2.innerHTML = "Transfer Amount:";
    var input2 = document.createElement('input');
    input2.type = "number";
    input2.className = "form-control";
    input2.placeholder = "Enter Transfer Amount";
    input2.id = "postAmount";
    input2.name = "postAmount";
    formGroup.appendChild(label2);
    formGroup.appendChild(input2);


    var submitButton = document.createElement('button');
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.id = "submitPressed";
    submitButton.innerHTML = "Submit";
    formGroup.appendChild(submitButton);
    formSection.appendChild(formGroup);

    document.getElementById("submitPressed").onclick = transfer;

    function transfer(){
        var postAmount = document.getElementById("postAmount").value;
        var receiverNum = document.getElementById("receiveAcc").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = receiveData;
        var baseURL = 'http://localhost:8080/RestExample2/rest/accController/postTransfer/'
        xhttp.open('GET', baseURL + '' + sessionStorage.getItem("accountNumber") +  "/" + postAmount + "/" + receiverNum);
        xhttp.send();
        function receiveData(){
            if (xhttp.readyState === 4){
                if (xhttp.status === 200){
                    //successful
                    var response = xhttp.responseText;
                    if (response == 0){
                        document.getElementById("contentContainer2").innerHTML = "</br><h6>Posting transfer failed: Invalid input</h6>";
                    }
                    else if (response == 1){
                        while (formSection.firstChild) {
                            formSection.removeChild(formSection.lastChild);
                          }
                          formSection.innerHTML = "Transfer posted successful.";
                          document.getElementById("contentContainer2").innerHTML = '';
                    }
                }else{
                    //
                }
            }else{
                //
            }
        }
    }
}
function acceptTransfer(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var formGroup = document.createElement('div');
    formGroup.className = "form-group";
    var label1 = document.createElement('label');
    label1.htmlFor = "transferId";
    label1.innerHTML = "Transfer ID:";
    var input1 = document.createElement('input');
    input1.type = "number";
    input1.className = "form-control";
    input1.placeholder = "Enter Transfer ID";
    input1.id = "transferId";
    input1.name = "transferId";
    formGroup.appendChild(label1);
    formGroup.appendChild(input1);

    var submitButton = document.createElement('button');
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.id = "submitPressed";
    submitButton.innerHTML = "Submit";
    formGroup.appendChild(submitButton);
    formSection.appendChild(formGroup);

    document.getElementById("submitPressed").onclick = transfer;

    function transfer(){
        var transferId = document.getElementById("transferId").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = receiveData;
        var baseURL = 'http://localhost:8080/RestExample2/rest/accController/acceptTransfer/'
        xhttp.open('GET', baseURL + '' + sessionStorage.getItem("accountNumber") +  "/" + transferId);
        xhttp.send();
        function receiveData(){
            if (xhttp.readyState === 4){
                if (xhttp.status === 200){
                    //successful
                    var response = xhttp.responseText;
                    if (response == 0){
                        document.getElementById("contentContainer2").innerHTML = "</br><h6>Transfer failed: Input a valid ID</h6>";
                    }
                    else if (response == 1){
                        while (formSection.firstChild) {
                            formSection.removeChild(formSection.lastChild);
                          }
                          formSection.innerHTML = "Transfer successfully accepted.";
                          document.getElementById("contentContainer2").innerHTML = '';
                    }
                }else{
                    //
                }
            }else{
                //
            }
        }
    }
}
function rejectTransfer(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var formGroup = document.createElement('div');
    formGroup.className = "form-group";
    var label1 = document.createElement('label');
    label1.htmlFor = "transferId";
    label1.innerHTML = "Transfer ID:";
    var input1 = document.createElement('input');
    input1.type = "number";
    input1.className = "form-control";
    input1.placeholder = "Enter Transfer ID";
    input1.id = "transferId";
    input1.name = "transferId";
    formGroup.appendChild(label1);
    formGroup.appendChild(input1);

    var submitButton = document.createElement('button');
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.id = "submitPressed";
    submitButton.innerHTML = "Submit";
    formGroup.appendChild(submitButton);
    formSection.appendChild(formGroup);

    document.getElementById("submitPressed").onclick = transfer;

    function transfer(){
        var transferId = document.getElementById("transferId").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = receiveData;
        var baseURL = 'http://localhost:8080/RestExample2/rest/accController/rejectTransfer/'
        xhttp.open('GET', baseURL + '' + sessionStorage.getItem("accountNumber") +  "/" + transferId);
        xhttp.send();
        function receiveData(){
            if (xhttp.readyState === 4){
                if (xhttp.status === 200){
                    //successful
                    var response = xhttp.responseText;
                    if (response == 0){
                        document.getElementById("contentContainer2").innerHTML = "</br><h6>Transfer failed: Input a valid ID</h6>";
                    }
                    else if (response == 1){
                        while (formSection.firstChild) {
                            formSection.removeChild(formSection.lastChild);
                          }
                          formSection.innerHTML = "Transfer successfully rejected.";
                          document.getElementById("contentContainer2").innerHTML = '';
                    }
                }else{
                    //
                }
            }else{
                //
            }
        }
    }
}

