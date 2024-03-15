var BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}

function pf(canva,url) {
    var pdfAsDataUri = url;
    var pdfAsArray = convertDataURIToBinary(pdfAsDataUri);
    //var url = "CV.pdf"

    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var pdfjsLib = window['pdfjs-dist/build/pdf'];

    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/pdf.worker.js';
    var PRINT_RESOLUTION = 300;
    var PRINT_UNITS = PRINT_RESOLUTION / 72.0;
    // Asynchronous download of PDF
    var loadingTask = pdfjsLib.getDocument(pdfAsArray);
    loadingTask.promise.then(function (pdf) {

        // Fetch the first page
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page) {

            var scale =3.8;
            var viewport = page.getViewport({ scale: scale });

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById(canva);
            var context = canvas.getContext('2d');

            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.width = "100%";
            canvas.style.height = "100%";

            //canvas.style.height = viewport.height; //showing size will be smaller size
            //canvas.style.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport,
                //transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
            });
        });
    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });
}