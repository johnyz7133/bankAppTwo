document.getElementById('loginButton').onclick = loginForm;
document.getElementById('registerButton').onclick = registerForm;

function loginForm(){
  var formSection = document.getElementById('formChange');
  while (formSection.firstChild) {
      formSection.removeChild(formSection.lastChild);
  }
  document.getElementById("showStatus").innerHTML = '';


  var formGroup = document.createElement('div');
  formGroup.className = "form-group";


  var label1 = document.createElement('label');
  label1.htmlFor = "uname";
  label1.innerHTML = "Username:";
  var input1 = document.createElement('input');
  input1.type = "text";
  input1.className="form-control";
  input1.placeholder = "Enter username";
  input1.id = "uname";
  input1.name = "uname";
  formGroup.appendChild(label1);
  formGroup.appendChild(input1);

  var label2 = document.createElement('label');
  label2.htmlFor = "pwd";
  label2.innerHTML = "Password:";
  var input2 = document.createElement('input');
  input2.type = "password";
  input2.className = "form-control";
  input2.placeholder = "Enter password";
  input2.id = "pwd";
  input2.name = "pwd";
  formGroup.appendChild(label2);
  formGroup.appendChild(input2);

  var submitButton = document.createElement('button');
  submitButton.type = "button";
  submitButton.className = "btn btn-primary";
  submitButton.id = "submitPressed";
  submitButton.innerHTML = "Submit";
  formGroup.appendChild(submitButton);

  formSection.appendChild(formGroup);

  //after form is created, submit it
  var baseURL = 'http://localhost:8080/RestExample2/rest/custController/login/'
  document.getElementById("submitPressed").onclick = login;

  function login(){
    var userUname = document.getElementById("uname").value;
    var userPass = document.getElementById("pwd").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = receiveData;
    xhttp.open('GET', baseURL + '' + userUname + '/' + userPass);
    xhttp.send();

    function receiveData(){
      if (xhttp.readyState === 4){
        if (xhttp.status === 200){
          var response = xhttp.responseText;
          console.log(response);
          if (response == 0){
            document.getElementById("showStatus").innerHTML = "</br>Login failed: Username or password incorrect.";
          }
          else if (response == 1){
            //valid customer
            //use another xhr to retrieve customer info
            var baseURL2 = 'http://localhost:8080/RestExample2/rest/custController/customerInfo/'
            var xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = receiveCustomerData;
            xhttp2.open('GET', baseURL2 + '' + userUname + '/' + userPass);
            xhttp2.send();

            function receiveCustomerData(){
              if (xhttp2.readyState === 4){
                if (xhttp.status === 200){
                  //successful
                  var response2 = xhttp2.responseText;
                  response2 = JSON.parse(response2);

                  //store information to session storage
                  sessionStorage.setItem("firstname", response2.firstname);
                  sessionStorage.setItem("lastname", response2.lastname);
                  sessionStorage.setItem("username", userUname);
                  sessionStorage.setItem("password", userPass);
                  sessionStorage.setItem("id", response2.id);

                  //redirect to customer page
                  location.href = "customer.html";

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
          else if (response == 2){
            //valid employee
            //use another xhr to retrieve employee info
            var baseURL2 = 'http://localhost:8080/RestExample2/rest/empController/empInfo/'
            var xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = receiveEmployeeData;
            xhttp2.open('GET', baseURL2 + '' + userUname + '/' + userPass);
            xhttp2.send();

            function receiveEmployeeData(){
              if (xhttp2.readyState === 4){
                if (xhttp.status === 200){
                  //successful
                  var response2 = xhttp2.responseText;
                  response2 = JSON.parse(response2);

                  //store information to session storage
                  sessionStorage.setItem("firstname", response2.firstname);
                  sessionStorage.setItem("lastname", response2.lastname);
                  sessionStorage.setItem("username", userUname);
                  sessionStorage.setItem("password", userPass);

                  //redirect to customer page
                  location.href = "employee.html";

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

function registerForm(){
    var formSection = document.getElementById('formChange');
    while (formSection.firstChild) {
        formSection.removeChild(formSection.lastChild);
    }
    document.getElementById("showStatus").innerHTML = '';

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
              document.getElementById("showStatus").innerHTML = "</br>Registration failed: Username already taken.";
            }
            else if (response == 1){
              while (formSection.firstChild) {
                formSection.removeChild(formSection.lastChild);
              }
              formSection.innerHTML = "Registration successful!";
              document.getElementById("showStatus").innerHTML = '';
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