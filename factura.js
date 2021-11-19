document.addEventListener("DOMContentLoader", () => {
    const $boton = document.querySelector("#btnCrearPdf");
    $boton.addEventListener("click", () => {
        const elementoAConvertir = document.body;
        html2pdf()
        .set({
            margin:1,
            filename: 'factura.pdf',
            html2canvas: {
                scale: 3,
                letterRendering:true,
            },
            jsPDF: {
                unit:"in",
                format:"a4",
                orientatin:'portrait'
            }
        })
        .from(elementoAConvertir)
        .save()
        .catch(err => console.log(err))
        .finally()
        .then(() => {
            console.log('guardado')
        })
    })
    
})