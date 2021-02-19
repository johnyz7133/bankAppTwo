document.getElementById('viewAccounts').onclick = viewAccount;
document.getElementById('applyAccount').onclick = applyForAccount;

function viewAccount() {
    var formSection = document.getElementById('showContent2');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    var formSectionClear = document.getElementById('showContent');
    while (formSectionClear.firstChild) {
        formSectionClear.removeChild(formSectionClear.lastChild);
    }
    document.getElementById("showStatus").innerHTML = '';

    //retrieve accounts and their balance
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = receiveData;
    var baseURL = 'http://localhost:8080/RestExample2/rest/custController/validAccounts/'
    xhttp.open('GET', baseURL + '' + sessionStorage.getItem("username") + '/' + sessionStorage.getItem("password"));
    xhttp.send();
    
    function receiveData(){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                //successful
                var accountHead = document.createElement('h1');
                accountHead.innerHTML = "Accounts:";
                formSection.appendChild(accountHead);

                var response = xhttp.responseText;
                response = JSON.parse(response);
                
                if (response.length == 0){
                    var emptyMessage = document.createElement('h4');
                    emptyMessage.innerHTML = "No activated accounts found."
                }
                else{
                    for (i = 0; i<response.length; i++){
                        var idName = "clickAccount" + response[i].accnum;
                        var listAccounts = document.createElement('div');
                        listAccounts.className = "container p-3 my-3 border border-primary rounded";
                        
                        var tempContent = document.createElement('h4');
                        tempContent.innerHTML = "Account Number: " + response[i].accnum + "&nbsp;&nbsp;&nbsp;Balance: $" + response[i].balance + "&nbsp;&nbsp;&nbsp;";
                        
                        var tempName = "submitButton" + i;
                        tempName = document.createElement('button');
                        tempName.type = "button";
                        tempName.className = "btn btn-primary";
                        tempName.id = idName;
                        console.log(tempName.id);
                        tempName.onclick =  (function(i) {return function() {
                            console.log(this.id);
                            console.log(i);
                            console.log(response[i].accnum);
                            sessionStorage.setItem("accountNumber", response[i].accnum);
                            location.href = "account.html";
                        };})(i);
                        tempName.innerHTML = "View Details";

    
                        listAccounts.appendChild(tempContent);
                        listAccounts.appendChild(tempName);
                        formSection.appendChild(listAccounts);
                        
                        


                        
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
function enterAccount(accnum){
    console.log(accnum);
}

function applyForAccount() {
    var formSection = document.getElementById('showContent');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    var formSectionClear = document.getElementById('showContent2');
    while (formSectionClear.firstChild) {
        formSectionClear.removeChild(formSectionClear.lastChild);
    }
    document.getElementById("showStatus").innerHTML = '';

    var formGroup = document.createElement('div');
    formGroup.className = "form-group";


    var label1 = document.createElement('label');
    label1.htmlFor = "balance";
    label1.innerHTML = "Starting balance:";
    var input1 = document.createElement('input');
    input1.type = "number";
    input1.className = "form-control";
    input1.placeholder = "Enter starting balance";
    input1.id = "balance";
    input1.name = "balance";
    formGroup.appendChild(label1);
    formGroup.appendChild(input1);

    var submitButton = document.createElement('button');
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.id = "submitPressed";
    submitButton.innerHTML = "Submit";
    formGroup.appendChild(submitButton);

    formSection.appendChild(formGroup);

    //after submit is pushed, go to server
    var baseURL = 'http://localhost:8080/RestExample2/rest/custController/applyAccount/'
    document.getElementById("submitPressed").onclick = apply;

    function apply(){
      var startBalance = document.getElementById("balance").value;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = receiveData;
      xhttp.open('GET', baseURL + '' + sessionStorage.getItem("username") + '/' + sessionStorage.getItem("password") + '/' + startBalance);
      xhttp.send();

      function receiveData(){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                //successful
                var response = xhttp.responseText;
                if (response == 0){
                  document.getElementById("showStatus").innerHTML = "</br>Application failed: Input a valid amount";
                }
                else if (response == 1){
                  while (formSection.firstChild) {
                    formSection.removeChild(formSection.lastChild);
                  }
                  formSection.innerHTML = "Application succesful. Please wait for an employee to approve your account.";
                  document.getElementById("showStatus").innerHTML = '';
                }
                else{
                    document.getElementById("showStatus").innerHTML = "</br>ERROR" + response;
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
}