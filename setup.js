const table = document.querySelector`#game`;
console.log(table);


for(let i =0 ; i < 3; i++){

    table.appendChild(`<tr></tr>`);

    for(let j = 0; j < 3; j++){

        table.lastChild.appendChild(`<td></td>`);
    }
}