document.getElementById('viewCustomer').onclick = viewCustomer;
document.getElementById('registerCustomer').onclick = registerCustomer;
document.getElementById('viewPending').onclick = viewPending;
document.getElementById('acceptAcc').onclick = acceptAcc;
document.getElementById('rejectAcc').onclick = rejectAcc;
document.getElementById("viewTransaction").onclick = viewTransaction;
document.getElementById('viewTransfer').onclick = viewTransfer;

function viewCustomer() {
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }

    document.getElementById("contentContainer2").innerHTML = '';
    
    var formGroup = document.createElement('div');
    formGroup.className = "form-group";


    var label1 = document.createElement('label');
    label1.htmlFor = "uname";
    label1.innerHTML = "Customer Username:";
    var input1 = document.createElement('input');
    input1.type = "text";
    input1.className = "form-control";
    input1.placeholder = "Enter Customer Username";
    input1.id = "uname";
    input1.name = "uname";
    formGroup.appendChild(label1);
    formGroup.appendChild(input1);


    var submitButton = document.createElement('button');
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.id = "submitPressed";
    submitButton.innerHTML = "Submit";
    formGroup.appendChild(submitButton);

    formSection.appendChild(formGroup);

    var baseURL = 'http://localhost:8080/RestExample2/rest/empController/accounts/'
    document.getElementById("submitPressed").onclick = view;

    function view(){
        var cuser = document.getElementById("uname").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = receiveData;
        xhttp.open('GET', baseURL + '' + sessionStorage.getItem("username") + '/' + sessionStorage.getItem("password") + "/" + cuser);
        xhttp.send();
        function receiveData() {
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                    //successful
                    var accountHead = document.createElement('h1');
                    accountHead.innerHTML = "Accounts:";
                    formSection.appendChild(accountHead);
    
                    var response = xhttp.responseText;
                    response = JSON.parse(response);
    
                    if (response.length == 0) {
                        var emptyMessage = document.createElement('h4');
                        emptyMessage.innerHTML = "No accounts found."
                    }
                    else {
                        for (i = 0; i < response.length; i++) {
                            var idName = "clickAccount" + response[i].accnum;
                            var listAccounts = document.createElement('div');
                            listAccounts.className = "container border border-primary rounded";
    
                            var tempContent = document.createElement('p');
                            tempContent.innerHTML = "Account Number: " + response[i].accnum + "&nbsp;&nbsp;&nbsp;Balance: $" + response[i].balance + "&nbsp;&nbsp;&nbsp;Status: " + response[i].status;
    
                            listAccounts.appendChild(tempContent);
                            formSection.appendChild(listAccounts);
                        }
                    }
                }
                else {
                    //
                }
            }
            else {
                //
            }
        }
    }
}
function registerCustomer(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    //var formAction = document.createElement('form');
    //formAction.method = "POST";

    var formGroup = document.createElement('div');
    formGroup.className = "form-group";


    var label1 = document.createElement('label');
    label1.htmlFor = "fname";
    label1.innerHTML = "First Name:";
    var input1 = document.createElement('input');
    input1.type = "text";
    input1.className="form-control";
    input1.placeholder = "Enter first name";
    input1.id = "fname";
    input1.name = "fname";
    formGroup.appendChild(label1);
    formGroup.appendChild(input1);

    var label2 = document.createElement('label');
    label2.htmlFor = "lname";
    label2.innerHTML = "Last Name:";
    var input2 = document.createElement('input');
    input2.type = "text";
    input2.className = "form-control";
    input2.placeholder = "Enter last name";
    input2.id = "lname";
    input2.name = "lname";
    formGroup.appendChild(label2);
    formGroup.appendChild(input2);

    var label3 = document.createElement('label');
    label3.htmlFor = "uname";
    label3.innerHTML = "Username:";
    var input3 = document.createElement('input');
    input3.type = "text";
    input3.className="form-control";
    input3.placeholder = "Enter username";
    input3.id = "uname";
    input3.name = "uname";
    formGroup.appendChild(label3);
    formGroup.appendChild(input3);

    var label4 = document.createElement('label');
    label4.htmlFor = "pwd";
    label4.innerHTML = "Password:";
    var input4 = document.createElement('input');
    input4.type = "password";
    input4.className = "form-control";
    input4.placeholder = "Enter password";
    input4.id = "pwd";
    input4.name = "pwd";
    formGroup.appendChild(label4);
    formGroup.appendChild(input4);

    var submitButton = document.createElement('button');
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.id = "submitPressed";
    submitButton.innerHTML = "Submit";
    formGroup.appendChild(submitButton);
/*
    formAction.appendChild(formGroup1);
    formAction.appendChild(formGroup2);
    formAction.appendChild(formGroup3);
    formAction.appendChild(formGroup4);
    formAction.appendChild(submitButton);
*/
    formSection.appendChild(formGroup);

  
    //after form is created, submit it
    var baseURL = 'http://localhost:8080/RestExample2/rest/custController/createCustomer/'
    document.getElementById("submitPressed").onclick = register;

    function register(){
      var userFname = document.getElementById("fname").value;
      var userLname = document.getElementById("lname").value;
      var userUname = document.getElementById("uname").value;
      var userPass = document.getElementById("pwd").value;

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = receiveData;
      xhttp.open('GET', baseURL + '' + userFname + '/' + userLname + '/' + userUname + '/' + userPass);
      xhttp.send();

      function receiveData(){
        if (xhttp.readyState === 4){
          if (xhttp.status === 200){
            var response = xhttp.responseText;
            if (response == 0){
              document.getElementById("contentContainer2").innerHTML = "</br>Username already taken.";
            }
            else if (response == 1){
              while (formSection.firstChild) {
                formSection.removeChild(formSection.lastChild);
              }
              formSection.innerHTML = "Registration successful!";
              document.getElementById("contentContainer2").innerHTML = '';
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
function viewPending(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = receiveData;
    var baseURL = 'http://localhost:8080/RestExample2/rest/empController/viewPending/'
    xhttp.open('GET', baseURL + '' + sessionStorage.getItem("username") + "/" + sessionStorage.getItem("password"));
    xhttp.send();
    function receiveData(){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                var response = xhttp.responseText;
                if (response == ""){
                    formSection.innerHTML = "<h4>No pending accounts.</h4>";
                }
                else{
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
function acceptAcc(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var heading = document.createElement('h4');
    heading.innerHTML = "Accept Account:";
    var formGroup = document.createElement('div');
    formGroup.className = "form-group";
    var label1 = document.createElement('label');
    label1.htmlFor = "accnum";
    label1.innerHTML = "Account Number:";
    var input1 = document.createElement('input');
    input1.type = "number";
    input1.className = "form-control";
    input1.placeholder = "Enter Account Number";
    input1.id = "accnum";
    input1.name = "accnum";
    formGroup.appendChild(label1);
    formGroup.appendChild(input1);

    var submitButton = document.createElement('button');
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.id = "submitPressed";
    submitButton.innerHTML = "Submit";
    formGroup.appendChild(submitButton);
    formSection.appendChild(heading);
    formSection.appendChild(formGroup);

    document.getElementById("submitPressed").onclick = accept;

    function accept(){
        var accnum = document.getElementById("accnum").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = receiveData;
        var baseURL = 'http://localhost:8080/RestExample2/rest/empController/acceptAcc/'
        xhttp.open('GET', baseURL + '' + sessionStorage.getItem("username") +  "/" + sessionStorage.getItem("password") + "/" + accnum);
        xhttp.send();
        function receiveData(){
            if (xhttp.readyState === 4){
                if (xhttp.status === 200){
                    //successful
                    var response = xhttp.responseText;
                        while (formSection.firstChild) {
                            formSection.removeChild(formSection.lastChild);
                          }
                          formSection.innerHTML = "Action completed.";
                          document.getElementById("contentContainer2").innerHTML = '';
                    
                }else{
                    //
                }
            }else{
                //
            }
        }
    }
}

function rejectAcc(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var heading = document.createElement('h4');
    heading.innerHTML = "Reject Account:";
    var formGroup = document.createElement('div');
    formGroup.className = "form-group";
    var label1 = document.createElement('label');
    label1.htmlFor = "accnum";
    label1.innerHTML = "Account Number:";
    var input1 = document.createElement('input');
    input1.type = "number";
    input1.className = "form-control";
    input1.placeholder = "Enter Account Number";
    input1.id = "accnum";
    input1.name = "accnum";
    formGroup.appendChild(label1);
    formGroup.appendChild(input1);

    var submitButton = document.createElement('button');
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.id = "submitPressed";
    submitButton.innerHTML = "Submit";
    formGroup.appendChild(submitButton);
    formSection.appendChild(heading);
    formSection.appendChild(formGroup);

    document.getElementById("submitPressed").onclick = accept;

    function accept(){
        var accnum = document.getElementById("accnum").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = receiveData;
        var baseURL = 'http://localhost:8080/RestExample2/rest/empController/rejectAcc/'
        xhttp.open('GET', baseURL + '' + sessionStorage.getItem("username") +  "/" + sessionStorage.getItem("password") + "/" + accnum);
        xhttp.send();
        function receiveData(){
            if (xhttp.readyState === 4){
                if (xhttp.status === 200){
                    //successful
                    var response = xhttp.responseText;
                        while (formSection.firstChild) {
                            formSection.removeChild(formSection.lastChild);
                          }
                          formSection.innerHTML = "Action completed.";
                          document.getElementById("contentContainer2").innerHTML = '';
                    
                }else{
                    //
                }
            }else{
                //
            }
        }
    }
}
function viewTransaction(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = receiveData;
    var baseURL = 'http://localhost:8080/RestExample2/rest/empController/viewTransaction/'
    xhttp.open('GET', baseURL + '' + sessionStorage.getItem("username") + "/" + sessionStorage.getItem("password"));
    xhttp.send();
    function receiveData(){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                var response = xhttp.responseText;
                if (response == ""){
                    formSection.innerHTML = "<h4>No transaction history.</h4>";
                }
                else{
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
function viewTransfer(){
    var formSection = document.getElementById('contentContainer');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("contentContainer2").innerHTML = '';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = receiveData;
    var baseURL = 'http://localhost:8080/RestExample2/rest/empController/viewTransfer/'
    xhttp.open('GET', baseURL + '' + sessionStorage.getItem("username") + "/" + sessionStorage.getItem("password"));
    xhttp.send();
    function receiveData(){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                var response = xhttp.responseText;
                if (response == ""){
                    formSection.innerHTML = "<h4>No transfer history.</h4>";
                }
                else{
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