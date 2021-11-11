// initially hide the parameter box

let parameterBox=document.getElementById('parameterBox');
parameterBox.style.display='none';

let param_count=0;
//show parameter box
let param_Radio=document.getElementById('paramsradio');
param_Radio.addEventListener('click',()=>{
    document.getElementById("requestJsonBox").style.display='none'
    document.getElementById("parameterBox").style.display='block'
}) 

// hide parameter box
let json_radio=document.getElementById('jsonradio');
json_radio.addEventListener('click',()=>{
    document.getElementById('parameterBox').style.display='none';
    document.getElementById('requestJsonBox').style.display='block'
    document.getElementById("params").style.display='none'
})


// string to html function

function getElementFromString(string){
    const div=document.createElement('div')
    div.innerHTML=string;
    return div.firstElementChild;
}

let add_param=document.getElementById('addParam');
add_param.addEventListener('click',()=>{    
    let params=document.getElementById('params')  //blank div id
    let string =`
    <div id="parameterBox" style="display:block;">
    <div class="form-row mt-2">
     <label for="url" class="col-sm-2 col-form-label">Parameter ${param_count+2}</label>
     <div class="col-md-4">
        <input type="text" class="form-control" id="parameterkey${param_count+2}" placeholder="Enter Parameter ${param_count+2} Key">
     </div>
     <div class="col-md-4">
        <input type="text" class="form-control" id="parametervalue${param_count+2}" placeholder="Enter Parameter ${param_count+2} Value">
     </div>
     <button type="button" id="addParam" class="btn btn-primary delete_parameter">-</button>
     </div>
   </div>
    `
    param_count++;
    let childElement=getElementFromString(string);
    params.appendChild(childElement);

    let delete_parameter=document.getElementsByClassName('delete_parameter');
    for(item of delete_parameter){
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
         //  param_count--;
        })
    }
})

// submit button


document.getElementById("submit").addEventListener("click",()=>{
    const url=document.getElementById("urlField").value
    const requestType=document.querySelector("input[name='requestType']:checked").value;
    const contentType=document.querySelector("input[name='contentType']:checked").value;
    console.log(requestType,contentType);
    let data={}  //object
    if(contentType=='params'){
        for(let i=1;i<=param_count+1;i++){
            console.log(i)
            let key = document.getElementById(`parameterkey${i}`).value;
            let value=document.getElementById(`parametervalue${i}`).value;
            data[key]=value   //insert data into object
        }
        console.log(data)
    }else{
        data=document.getElementById("requestJsonText").value;
        console.log(data)
    }

    if(requestType=="GET"){
        fetch(url,{
            method:"GET"
        }).then(res=>res.text())
            .then(data=>{
                console.log(data)
                document.getElementById("responseJsonText").value=data
            })
    }
    else if(requestType=="POST"){
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=UTF-8"
            },
            body:JSON.stringify(data)
        }).then(res=>res.text())
            .then(data=>{
                console.log(data)
                document.getElementById("responseJsonText").value=data
            })
    }
    else if(requestType=="PUT"){
        fetch(url,{
            method:"PUT",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json;charset=UTF-8"
            },
        }).then(res=>res.text())
            .then(data=>{
                document.getElementById("responseJsonText").value=data
            })

    }
    else if(requestType=="DELETE"){
        fetch(url,{
            method:"DELETE"
        }).then(res=>res.text())
          .then(data=>{
              console.log(data)
              document.getElementById("responseJsonText").value=data
          })
    }
    
})