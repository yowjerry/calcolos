function calcolus(operation){
    var operateur=/(?:\*)|(?:\+)|(?:\/)|(?:\-)/;
    var strings=/(?:[A-Za-z])/;
    var numbers=/(?:[0-9])/;
    var parentheses=/\(([^)]+)\)/;
    var result=0;
    var prodResult=1;
    var divResult;
    if(operation.match(operateur)){
        if(!operation.match(strings)){
            if(operation.match(numbers)){
                operation=operation.split(" ").join("");
                operation=operation.replace(/(?<=[0-9])\-\-(?=[0-9])/,"+");
                operation=operation.replace("-(","(-");
                operation=operation.split(/(?<=[0-9])\-(?=[0-9])/).join("+-");
                
                if(operation.match(parentheses)){
                    
                    parenthesisParts=operation.split(/(?<=\))[\*\+\-\/]/);
                        for(var spli=0;spli<parenthesisParts.length;spli++){
                            
                            if(parenthesisParts[spli].match(parentheses)){
                                parenthesisPart=/\(.*\)/g.exec(parenthesisParts[spli])[0];
                                operation=operation.replace(parenthesisPart,calcolus(parenthesisPart.replace(/\)$/,"").replace("(","")));
                                console.log(parenthesisPart);
                            }
                        }
                }
                operation=operation.replace("(","");
                var addArray=operation.split("+");
                //console.log(operation);
                for(var i=0;i<addArray.length;i++){ 
                    var divArray=addArray[i].split("/");
                    for(var j=0;j<divArray.length;j++){
                        prodArray=divArray[j].split("*");
                        for(var k=0;k<prodArray.length;k++){
                            prodResult*=parseFloat(prodArray[k]);
                        }
                        divArray[j]=prodResult;
                        prodResult=1;
                    }
                        for(var d=0;d<divArray.length;d++){
                            if(d==0){
                                divResult=parseFloat(divArray[0]);
                            }else{
                                divResult/=parseFloat(divArray[d])
                            }
                        }
                        addArray[i]=divResult;
                }
                    for(var t=0;t<addArray.length;t++){
                        if(!isNaN(addArray[t])){
                            result=result+parseFloat(addArray[t]);
                        }
                    }
                    return result;
            }
        }
    }
}