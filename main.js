#!/usr/bin/env node
const fs = require('fs');
const pdfsign = require('./PDFSIgn/js/main');

function load_files(args){
    pdf_index = args.indexOf("--file") + 1;
    cert_index = args.indexOf("--cert") + 1;

    // Check if cert and pdf file exist
    if(pdf_index && cert_index){
        fs.stat(args[pdf_index], function(err, stat){
            if(!err){
                pdf_raw = fs.readFileSync(args[pdf_index]);
                fs.stat(args[cert_index], function(err, stat){
                    if(!err){
                        cert_raw = fs.readFileSync(args[cert_index]);
                        sign_pdf(pdf_raw, cert_raw);
                    }else{
                        usage();
                    }
                });
            }else{
                usage();
            }
        });
    }else{
        usage();
    }
}

function process_args(){
    if(process.argv.includes("-h"))
        usage();
    else 
        load_files(process.argv.slice(2,));
}

function usage(){
    console.log("Usage: ./main.js [--file pdf_file] [--cert cert_file]")
}

function sign_pdf(pdf, cert){
    signed_pdf = PDFSIGN.signpdf(pdf, cert, "1234");
    signed_pdf_out = 'signed.pdf';
    fs.writeFile(signed_pdf_out, signed_pdf, function (err) {
        if (err) throw err;
        console.log('Saved!');
    }); 
}

process_args();