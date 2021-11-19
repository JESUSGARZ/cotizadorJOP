
    const  productos = [
         "Extintor",
         "Recarga Extintor",
         "Mantenimiento Extintor",
         "Base Pared Extintor",
         "Botiquin",
         "Camilla",
         "Caneca Des/Organicos"
     ]
    const tipo = {
         "extintor": ["Multiproposito","Extintor Agente Limpio","CO2","Agua"],
         "base":["Plastico PVC", "Metal"],
         "botiquin":["Termico de 18 productos", "caja en PVC"],
         "camilla":["Con Inmovilizador","Sin Inmovilizador"],
         "canecaDesechosOrganicos":["Ordinarios", "Plasticos","Papel y carton"]
 
     }
    const tamano = {
         "multiproposito":["5 lbs","10 lbs","20 lbs"],
         "agente":["2500 gr","3700 gr", "7000 gr"],
         "CO2":["5 lbs"," 10 lbs","//"],
         "camilla":["185 x 45"],
         "caneca":["10 lts"]
 
     }
     
 

var checkSenalizacion = document.getElementById("input__senalizacion");
var checkSegIndustrial = document.getElementById("input__industrial");


//display of the cotization in real time 
function display(check,form, container) {
    if (check.checked === true) {
        document.getElementById(form).style.display='block';
        document.getElementById(container).style.border='solid 1px  #FF5E0D'; 
        
    } else {
        document.getElementById(form).style.display='none';
        document.getElementById(container).style.border='none'; 
        
    }

}


//here we create a new formData and use de functions ti create a new row and to save the data in the local storage

const formulario = document.getElementById ("cotizaForm");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    let cotizarFormData = new FormData(formulario);
    let cotizarObject = convertFormDataToAnObject(cotizarFormData);
    saveCotizarObj(cotizarObject);
    insertRowInCotizarTable(cotizarObject) 
    formulario.reset();
})

function getNewCotizarId(){
    let lastCotizarId = localStorage.getItem("lastCotizarId") || "-1";
    let newCotizarId = JSON.parse(lastCotizarId) + 1;
    localStorage.setItem("lastCotizarId", JSON.stringify(newCotizarId))
    return newCotizarId;


}

// here we manage our senalizacion table and put the data in the local storage 

function convertFormDataToAnObject (cotizarFormData){
   let producto = cotizarFormData.get("producto");
   let cantidad = cotizarFormData.get("cantidad");
   let material = cotizarFormData.get("material");
   let calibre = cotizarFormData.get("calibre");
   let ancho = cotizarFormData.get("ancho");
   let largo = cotizarFormData.get("largo");
   let texto = cotizarFormData.get("texto");
   let cotizarId = getNewCotizarId();
   return {
    "producto":producto,
    "cantidad": cantidad,
    "material": material,
    "calibre": calibre,
    "ancho": ancho,
    "largo": largo,
    "texto": texto,
    "cotizarId": cotizarId
   }


}

function insertRowInCotizarTable(cotizarObject) {
    let cotizarTableRef = document.getElementById("cotizarTable__senalizacion");

    let newCotizarRowRef = cotizarTableRef.insertRow(-1);
    newCotizarRowRef.setAttribute("data-cotizar-Id", cotizarObject["cotizarId"]);

    let newTypeCellRef = newCotizarRowRef.insertCell(0);
    newTypeCellRef.textContent = cotizarObject["producto"];

    newTypeCellRef = newCotizarRowRef.insertCell(1);
    newTypeCellRef.textContent = cotizarObject["cantidad"];

    newTypeCellRef = newCotizarRowRef.insertCell(2);
    newTypeCellRef.textContent = cotizarObject["material"];

    newTypeCellRef = newCotizarRowRef.insertCell(3);
    newTypeCellRef.textContent = cotizarObject["calibre"];

    newTypeCellRef = newCotizarRowRef.insertCell(4);
    newTypeCellRef.textContent = cotizarObject["ancho"];

    newTypeCellRef = newCotizarRowRef.insertCell(5);
    newTypeCellRef.textContent = cotizarObject["largo"];

    newTypeCellRef = newCotizarRowRef.insertCell(6);
    newTypeCellRef.textContent = cotizarObject["texto"];

    let newDeleteCell = newCotizarRowRef.insertCell(7);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    newDeleteCell.appendChild(deleteButton);
    
    deleteButton.addEventListener("click",(event)=> {
        let cotizarRow = event.target.parentNode.parentNode;
        let cotizarId = cotizarRow.getAttribute("data-cotizar-Id")
        cotizarRow.remove();
        deleteCotizarObj(cotizarId);
    })
    

    document.getElementById("cotizarTable__senalizacion").style.display='block';
}
function deleteCotizarObj(cotizarId){
    let cotizarObjArr = JSON.parse(localStorage.getItem("cotizarData"))
    let cotizarIndexInArray = cotizarObjArr.findIndex(element => element.cotizarId === cotizarId);
    cotizarObjArr.splice(cotizarIndexInArray, 1);
    let cotizarArrayJSON = JSON.stringify(cotizarObjArr); 
    localStorage.setItem("cotizarData", cotizarArrayJSON);

}
function saveCotizarObj(Object){
    let myCotizarArray = JSON.parse(localStorage.getItem("cotizarData")) || [];
    myCotizarArray.push({Object});
    let cotizarArrayJSON = JSON.stringify(myCotizarArray); 
    localStorage.setItem("cotizarData", cotizarArrayJSON);
    

    
   
}

//here we manage our industrial table and create the data to storage in the local storage 

const formularioIndustrial = document.getElementById ("cotizarForm__industrial");

formularioIndustrial.addEventListener("submit", function(event) {
    event.preventDefault();
    let cotizarFormIndustrialData = new FormData(formularioIndustrial);
    let cotizarIndObject = convertFormDataToAnObjectInd(cotizarFormIndustrialData);
    insertRowInCotizarIndustrialTable(cotizarFormIndustrialData) 
})

function convertFormDataToAnObjectInd (cotizarFormIndustrialData){
    let producto = cotizarFormIndustrialData.get("producto__industrial");
    let cantidad = cotizarFormIndustrialData.get("cantidad__industrial");
    let tipo = cotizarFormIndustrialData.get("tipo__industrial");
    let medidas = cotizarFormIndustrialData.get("medida__industrial");
    let especificacion = cotizarFormIndustrialData.get("especificaciones__industrial");
    let cotizarId = getNewCotizarId();
 
    return {
     "producto":producto,
     "cantidad":cantidad,
     "tipo": tipo,
     "medidas": medidas,
     "especificacion": especificacion,
     "cotizarId": cotizarId
  
    }
 
 
 }
function insertRowInCotizarIndustrialTable(cotizarFormIndustrialData) {
    let cotizarIndustrialTableRef = document.getElementById("cotizarTable__industrial");

    let newCotizarIndustrialRowRef = cotizarIndustrialTableRef.insertRow(-1);

    let newTypeIndCellRef = newCotizarIndustrialRowRef.insertCell(0);
    newTypeIndCellRef.textContent = cotizarFormIndustrialData.get("producto__industrial");

    newTypeIndCellRef = newCotizarIndustrialRowRef.insertCell(1);
    newTypeIndCellRef.textContent = cotizarFormIndustrialData.get("cantidad__industrial");

    newTypeIndCellRef = newCotizarIndustrialRowRef.insertCell(2);
    newTypeIndCellRef.textContent = cotizarFormIndustrialData.get("tipo__industrial");

    newTypeIndCellRef = newCotizarIndustrialRowRef.insertCell(3);
    newTypeIndCellRef.textContent = cotizarFormIndustrialData.get("medida__industrial");

    newTypeIndCellRef = newCotizarIndustrialRowRef.insertCell(4);
    newTypeIndCellRef.textContent = cotizarFormIndustrialData.get("especificaciones__industrial");

    let newDeleteCell = newCotizarIndustrialRowRef.insertCell(5);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    newDeleteCell.appendChild(deleteButton);
    
    deleteButton.addEventListener("click",(event)=> {
        let cotizarRow = event.target.parentNode.parentNode;
        let cotizarId = cotizarRow.getAttribute("data-cotizar-Id")
        cotizarRow.remove();
        deleteCotizarObj(cotizarId);
    })

    document.getElementById("cotizarTable__industrial").style.display='block';

}

//select dinamico

function createSelect (array, content) {
    
    array.map(function(e){
        const node  = `<option value= ${e}> ${e} </option>`
        content.insertAdjacentHTML("afterbegin", node);
        
    })
}
function handleSelect () {
    const contenedor = document.querySelector('#tipo__industrial');
    const div = document.querySelector('.tipo__industrial');
    let selectedValue =  document.querySelector('#producto__industrial').value;
    const contentMed =  document.querySelector('#medida__industrial')
    const divMed = document.querySelector('.medida__industrial');

    while (contenedor.options.length > 0) {
        contenedor.options.remove(0)  
    }
    while (contentMed.options.length > 0) {
        contentMed.options.remove(0);
        divMed.style.display='none'; 
    }

    switch (selectedValue) {
        case 'Extintor':
            createSelect(tipo.extintor,contenedor);
            div.style.display='block';
            break;
        case 'Recarga Extintor':
            createSelect(tipo.extintor,contenedor);
            div.style.display='block';
            break;
        case 'Mantenimiento Extintor':
            createSelect(tipo.extintor,contenedor);
            div.style.display='block';
            break;
        case 'Base de Pared Extintor':
            createSelect(tipo.base,contenedor);
            div.style.display='block';
            break;
        case 'Botiquin': 
            createSelect(tipo.botiquin,contenedor);
            div.style.display='block';
            break;
        case 'Camilla':
            createSelect(tipo.camilla,contenedor);
            div.style.display='block'; 
            break;
        case 'Caneca Desechos Organicos':
            createSelect( tipo.canecaDesechosOrganicos,contenedor);
            div.style.display='block'; 
            break;
        default: 
            div.style.display='none';
            break;
    }
}

function handleSelectMed () {
    const divMed = document.querySelector('.medida__industrial');
    let selectedValueMed =  document.querySelector('#tipo__industrial').value;
    const contentMed =  document.querySelector('#medida__industrial')

    while (contentMed.options.length > 0) {
        contentMed.options.remove(0)  
    }

    switch (selectedValueMed) {
        case 'Extintor':
            createSelect(tamano.agente,contentMed);
            divMed.style.display='block';
            break;
        case 'Multiproposito':
            createSelect(tamano.multiproposito,contentMed);
            divMed.style.display='block';
            break;
        case 'CO2':
            createSelect(tamano.CO2,contentMed);
            divMed.style.display='block';
            break;
        case ('Sin || Con'):
            createSelect(tamano.camilla,contentMed);
            divMed.style.display='block';
            break;
        default: 
            divMed.style.display='none';
            break;
    }
}
