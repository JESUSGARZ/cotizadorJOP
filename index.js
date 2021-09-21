/* const costosProducto = {
    "placa": 4.50,
    "placa fotoluminiscente":3.50,
    "calcomania":2.50,
    "marquillas":3.75
}

const costoMaterial = {
    "poliestireno": 3.45,
    "acrilico": 3.45,
    "lamina": 3.45

}

const costoCostum = {
    "logo": 2,
    "diseno personalizado": 2,
    "entrega inmediata": 2

}


function cotizar(){
    
    var valorTotal = 0;
    var ancho= document.getElementById('ancho').value
    var largo= document.getElementById('largo').value
    var area = ancho * largo;

   let valores = {
        "Producto": `${document.getElementById('producto').value}`,
        "Material":`${document.getElementById('material').value}`,
        "Area/Tamano" : `${area} cm'2`,
        "Cantidad":`${document.getElementById('cantidad').value} `,
        "Requerimientos": `${document.getElementById('costum').value}`,
       
    }

    


        let clavesProducto = Object.keys(costosProducto)
    for (let i=0; i< clavesProducto.length;i++) {
        let clave = clavesProducto[i]

        if (clave === valores.Producto) {
            valorTotal+=  costosProducto[clave];
            console.log(valorTotal);
        }

    }

    let clavesMaterial = Object.keys(costoMaterial)
    for (let i=0; i< clavesMaterial.length;i++) {
        let clave = clavesMaterial[i]

        if (clave === valores.Material) {
            valorTotal+=  costoMaterial[clave];
            console.log(valorTotal);
        }

    }

    let clavesCostum = Object.keys(costoCostum)
    for (let i=0; i< clavesCostum.length;i++) {
        let clave = clavesCostum[i]
        
        if (clave === valores.Requerimientos) {
            valorTotal+=  costoCostum[clave];
            console.log(valorTotal);
        }

    }

    let clavesValores = Object.keys(valores)
    for (let i=0; i< clavesValores.length;i++) {
        let clave = clavesValores[i];
        let valor = valores[clave];

        const contenidoClave = document.createTextNode(`${clave}`)
        const contenidoValor = document.createTextNode(`${valor}`)

        const dataClave = document.createElement("td")
        dataClave.appendChild(contenidoClave)
        const dataValor = document.createElement("td")
        dataValor.appendChild(contenidoValor)
        const row = document.createElement("tr")
        row.appendChild( dataClave)
        row.appendChild( dataValor)
        

        const contenedor = document.getElementById("factura")
        contenedor.appendChild(row)
    }



    
    

    let cantidad = valores.Cantidad;
    
    var total = valorTotal*area*cantidad;
    //let valorUnitario = valorTotal*area;

    return  document.getElementById('total').innerText= `el valor total de tu compra es: ${total}`;
    
  
} */

const formulario = document.getElementById ("cotizaForm");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    let cotizarFormData = new FormData(formulario);
    insertRowInCotizarTable(cotizarFormData) 
})

function insertRowInCotizarTable(cotizarFormData) {
    let cotizarTableRef = document.getElementById("cotizarTable__senalizacion");

    let newCotizarRowRef = cotizarTableRef.insertRow(-1);

    let newTypeCellRef = newCotizarRowRef.insertCell(0);
    newTypeCellRef.textContent = cotizarFormData.get("producto");

    newTypeCellRef = newCotizarRowRef.insertCell(1);
    newTypeCellRef.textContent = cotizarFormData.get("cantidad");

    newTypeCellRef = newCotizarRowRef.insertCell(2);
    newTypeCellRef.textContent = cotizarFormData.get("material");

    newTypeCellRef = newCotizarRowRef.insertCell(3);
    newTypeCellRef.textContent = cotizarFormData.get("calibre");

    newTypeCellRef = newCotizarRowRef.insertCell(4);
    newTypeCellRef.textContent = cotizarFormData.get("ancho");

    newTypeCellRef = newCotizarRowRef.insertCell(5);
    newTypeCellRef.textContent = cotizarFormData.get("largo");

    newTypeCellRef = newCotizarRowRef.insertCell(6);
    newTypeCellRef.textContent = cotizarFormData.get("texto");

    document.getElementById("cotizarTable__senalizacion").style.display='block';
}

const formularioIndustrial = document.getElementById ("cotizarForm__industrial");

formularioIndustrial.addEventListener("submit", function(event) {
    event.preventDefault();
    let cotizarFormIndustrialData = new FormData(formularioIndustrial);
    insertRowInCotizarIndustrialTable(cotizarFormIndustrialData) 
})

function insertRowInCotizarIndustrialTable(cotizarFormIndustrialData) {
    let cotizarIndustrialTableRef = document.getElementById("cotizarTable__industrial");

    let newCotizarIndustrialRowRef = cotizarIndustrialTableRef.insertRow(-1);

    let newTypeIndCellRef = newCotizarIndustrialRowRef.insertCell(0);
    newTypeIndCellRef.textContent = cotizarFormIndustrialData.get("cantidad__industrial");

    newTypeIndCellRef = newCotizarIndustrialRowRef.insertCell(1);
    newTypeIndCellRef.textContent = cotizarFormIndustrialData.get("producto__industrial");

    newTypeIndCellRef = newCotizarIndustrialRowRef.insertCell(2);
    newTypeIndCellRef.textContent = cotizarFormIndustrialData.get("especificaciones__industrial");

    document.getElementById("cotizarTable__industrial").style.display='block';

}

