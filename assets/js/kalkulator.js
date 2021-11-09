//Kalkulator Code
function getHistory(){
    return document.getElementById("history-value").innerText;
}
function printHistory(num){
    document.getElementById("history-value").innerText=num;
}
function getOutput(){
    return document.getElementById("output-values").innerText;
}
function printOutput(num){
    if(num==""){
    document.getElementById("output-values").innerText=num;
    }
    else{
        document.getElementById("output-values").innerText=getFormattedNumber(num);
    }
}
function getFormattedNumber(num){
    if(num=="-"){
        return "";
    }
    var n=Number(num);
    var value= n.toLocaleString("en");
    return value;
}
function reverseNumberFormat(num){
    return Number(num.replace(/,/g, ''));
}
var operator = document.getElementsByClassName("operator");
for( var i=0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
            if(this.id=="clear"){
                printHistory("");
                printOutput("");
            }
            else if(this.id=="backspace"){
                var
                output=reverseNumberFormat(getOutput()).toString();
                if(output){//if output has a value
                    output= output.substr(0,output.length-1);
                printOutput(output);
                }
            }
            else{
                var output = getOutput();
                var history = getHistory();
                if(output==""&&history!=""){
                    if(isNaN(history[history.length-1])){
                        history=history.substr(0,history.length-1);
                    }
                }
                if(output!="" || history!=""){
                    output= output==""?
                    output:reverseNumberFormat(output);
                    history=history+output;
                    if(this.id=="="){
                        var result= eval(history);
                        printOutput(result);
                        printHistory("");
                    }
                    else{
                        history=history+this.id;
                        printHistory(history);
                        printOutput("");
                    }
                }
            }
    });
}
var number = document.getElementsByClassName("number");
for(var i=0;i<number.length;i++){
    number[i].addEventListener('click',function(){
        var output=reverseNumberFormat(getOutput());
        if(output!=NaN){
            output=output+this.id;
            printOutput(output);
        }
    });
}

//To Do List Code
/* 
   this code will save the todo items even you refresh the page
*/
const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');
if(window.localStorage.getItem("todos") == undefined){
     var todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}
var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);
class item{
    constructor(name){
        this.createItem(name);
    }
    createItem(name){
        var itemBox = document.createElement('div');
        itemBox.classList.add('item');
        var input = document.createElement('input');
        input.type = "text";
        input.disabled = true;
        input.value = name;
        input.classList.add('item_input');
        var edit = document.createElement('button');
        edit.classList.add('edit');
        edit.innerHTML = "EDIT";
        edit.addEventListener('click', () => this.edit(input, name));
        var remove = document.createElement('button');
        remove.classList.add('remove');
        remove.innerHTML = "REMOVE";
        remove.addEventListener('click', () => this.remove(itemBox, name));
        container.appendChild(itemBox);
        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);
    }
    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
        else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}
add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
    if(e.which == 13){
        check();
    }
})
function check(){
    if(inputValue.value != ""){
        new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        inputValue.value = "";
    }
}
for (var v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}