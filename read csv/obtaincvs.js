var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

const csvjson = require('csvjson');

app.get ('/', function(req, res){
    var data1 = fs.readFileSync(path.join(__dirname, 'plantilla.csv'), { encoding : 'utf8'});
    var data2 = fs.readFileSync(path.join(__dirname, 'prueba3.csv'), { encoding : 'utf8'});
    
    var options = {
        delimiter: ',',
        quote: '"'
    }

    var resultado1 = csvjson.toArray(data1,options);
    var resultado2 = csvjson.toArray(data2, options)
    var limite1 = Object.keys(resultado1).length;
    var limite2 = Object.keys(resultado2).length;
    var i,j;


    for (i=0; i<limite1; i++){
        if (JSON.stringify(resultado1[i][0]) !== JSON.stringify(resultado2[i][0])){
            for (j=0; j<limite2; j++){
                if(JSON.stringify(resultado1[i][0]) === JSON.stringify(resultado2[j][0])){ //Si la busqueda del parametro de la primera lista consiste con el parametro de la segunda lista entonces
                    if (JSON.stringify(resultado1[i][1]) !== JSON.stringify(resultado2[j][1])){ //Compara el resultado de los parametros, y si son diferentes, entonces imprimelos en pantalla
                        console.log(resultado1[i] + " / " + resultado2[j]);
                    } //si los resultados de los parametros de la primera lista comparado con los buscados de la segunda lista son iguales entonces que continue
                }
            }
        } else {
            if (JSON.stringify(resultado1[i][1]) !== JSON.stringify(resultado2[i][1])){
                console.log(resultado1[i] + " / " + resultado2[j]);
            }
        }
    }
    
    
    res.status(200).send(Object.keys(resultado1));
});

 app.listen(3000);
