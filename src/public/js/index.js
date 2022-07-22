let prodForm = document.getElementById('form1');

const handleSubmit = (evt, form, route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key) => obj[key]=value);

    fetch(route, {
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
}

prodForm.addEventListener('submit', (e)=>handleSubmit(e, e.target, '/api/products/'));