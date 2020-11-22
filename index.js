#!/usr/bin/env node 

/*module.exports = () => {
  // ...
};
*/

// metodos con require

const fs = require('fs');
const path = require('path');
const process = require('process');
//const fetch = require("fetch");
//const fetch = require('node-fetch');
//const fetchUrl = fech.fetchUrl;



let fileName = process.argv[2]
fileName = path.resolve(fileName)
console.log(fileName)

let options = process.argv[3]

//console.log(fileName.length)



const pattern = /\[([^\[]+)\](\(.*\))/gm;
const singleLine = /\[([^\[]+)\]\((.*)\)/;

const getHttpStatus = (url) => {
  return new Promise((resolve, reject) => {
    fetchUrl(url, (error, meta, body) => {
      if(error) {
        reject(error)
      }else {
        resolve(meta.status)
      }
    });
  })
};

//Leer archivo con promesa e imprime en un arreglo el href, text y path del archivo
const readAFile = (fileName, encoding) => {
  return new Promise((resolve, reject) => {

    fs.readFile(fileName, encoding, (err, data) => {
      let myarray = data.match(pattern);
      const infoLinks = [];
      
      myarray.forEach((line) => {
        let linkLine = line.match(singleLine);
        let http = linkLine[2].includes('http');

        if(http){
          infoLinks.push({href:linkLine[2], text:linkLine[1], path:fileName})
        }

      });

      let total = infoLinks.length;
      console.log(total);

      infoLinks.map((line) => {
        let url = line.href;
        let text = line.text;
        let file = line.path;

        if(options === '--validate'){
          getHttpStatus(url)
            .then(res => {
                console.log("EL estado de", url, "es", res)
            })
            .catch(err => {
              console.log(err.path)
            });
          } else if (options === '--stats'){
            
            console.log("esto es el total",total)
        } else {
          console.log((`file: ${file} \n Link: ${url} \n Text: ${text}`));
        };
      });

      /*
      if (err) {
        reject(err);
      } else {
        resolve(infoLinks);

      }
      */
    
    });
  });

};


readAFile(fileName, 'utf-8')
  .then(resolve => {
    console.log(resolve);
  })
  .catch(err => {
    console.log(err.path)
  })




/*
//Ejecuta las promesas en el orden del arreglo
Promise.all([readAFile(fileName, 'utf-8')])
  .then(responses => {
    console.log(responses);
  });
*/


//Lee si un archivo o carpeta existe
fs.stat(fileName, function (err) {
  if (err == null) {
    console.log("El archivo existe");
  } else if (err.code == 'ENOENT') {
    console.log("el archivo no existe");
  } else {
    console.log(err); // ocurrió algún error
  }
})


//Funcion para validar si es un archivo .md
const extFile = path.extname(fileName);
if (extFile === '.md') {
  console.log("la extension del archivo es:", extFile);
} else {
  console.log("no es una extension .md");
}




