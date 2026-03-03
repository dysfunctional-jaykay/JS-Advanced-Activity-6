const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const sortNumbers = document.getElementById("sortBy"); 
// For the select tag
const sortBlock = document.getElementById("sortingBlock"); 
// For the div tag with the sortingBlock id


const tbl = document.getElementById("tblNumbers");


let total = 0;


let numbersArr = new Array();

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;

    let num;
    let regex = /^[0-9]+$/; // regular expression for checking valid positive number values.


    if(txtNumber.match(regex)){
        num = parseInt(txtNumber);
        numbersArr.push(num);
        console.log(numbersArr);
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a positive number");
        document.getElementById("txtNum").value = "";
        return;
    }

    iterateNumbers();
}

btn1.addEventListener("click", () => {
    insertNumber();
});

document.getElementById("txtNum").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;

    // reset all trs
    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    document.getElementById("btn4").style.display = "none";

});

btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdTotalLabel = document.createElement("td");
    const tdTotalValue = document.createElement("td");

    trTotal.style.height = "30px";

    tdTotalLabel.style.fontWeight = "bold";
    tdTotalLabel.innerHTML = "TOTAL";

    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;
        
    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);
});

// Get highest and lowest button
btn5.addEventListener("click", () => {
    identifyMax();
    identifyMin();
});

sortNumbers.addEventListener("change", () => {
    const sortValue = sortNumbers.value;

    sortingAlgorithm(sortValue);
});

function identifyMax(){
    const trMax = document.createElement("tr");
    const tdMaxLabel = document.createElement("td");
    const tdMaxValue = document.createElement("td");

    trMax.style.height = "30px";

    tdMaxLabel.style.fontWeight = "bold";
    tdMaxLabel.innerHTML = "HIGHEST";

    tdMaxValue.style.textDecoration = "underline";
    tdMaxValue.style.color = "red";
    tdMaxValue.innerHTML = Math.max(...numbersArr);
        
    trMax.appendChild(tdMaxLabel);
    trMax.appendChild(tdMaxValue);
    tbl.appendChild(trMax);
}

function identifyMin(){
    const trMin = document.createElement("tr");
    const tdMinLabel = document.createElement("td");
    const tdMinValue = document.createElement("td");

    trMin.style.height = "30px";

    tdMinLabel.style.fontWeight = "bold";
    tdMinLabel.innerHTML = "LOWEST";

    tdMinValue.style.textDecoration = "underline";
    tdMinValue.style.color = "navy";
    tdMinValue.innerHTML = Math.min(...numbersArr);
        
    trMin.appendChild(tdMinLabel);
    trMin.appendChild(tdMinValue);
    tbl.appendChild(trMin);
}

function deleteNumber(i) {
    numbersArr.splice(i,1);
    iterateNumbers();
    console.log(numbersArr)
}

function editNumber(i) {

    const editTxt = prompt("Enter new number: ", numbersArr[i]);
    const regex = /^[0-9]+$/; // regular expression for checking valid positive number values.
    
    if(editTxt == null || editTxt == "") {
        alert("You did not input a new value!");
    } else {
        if(editTxt.match(regex)) {
            numbersArr[i] = parseInt(editTxt);
            iterateNumbers();
            console.log(numbersArr);
        } else {
            alert("You did not input a valid number!");
        }
    } 
}

function sortingAlgorithm(sort){
    let n = numbersArr.length;


    // Uses insertion sort algorithm

    if(sort == "ascending"){
        console.log("Ascending");

        for (let i = 1; i < n; i++) {
            let key = numbersArr[i];
            let j = i - 1;
            while (j >= 0 && numbersArr[j] > key) { // The sign indicates which direction it sorts
                numbersArr[j + 1] = numbersArr[j];
                j--;
            }
            numbersArr[j + 1] = key;
        }

        iterateNumbers();
    }
    else {
        console.log("Descending");
        for (let i = 1; i < n; i++) {
            let key = numbersArr[i];
            let j = i - 1;
            while (j >= 0 && numbersArr[j] < key) {
                numbersArr[j + 1] = numbersArr[j];
                j--;
            }
            numbersArr[j + 1] = key;
        }

        iterateNumbers();
    }
}

function iterateNumbers() {
    // reset all trs
    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if(!(numbersArr.length == 0)) {

        total = 0;

        console.log(`Array Length: ${numbersArr.length}`);

        // Loop for iterating numbers from the array in a table
        for(let i=0 ; i < numbersArr.length ; i++) {

            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td"); // for the delete button
            const td4 = document.createElement("td"); // for the delete button
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = numbersArr[i];

            td2.style.width = "70px";

            if(numbersArr[i] %2 == 0) {
                td2.style.color = "green";
                td2.innerHTML = "EVEN";
            } else {
                td2.style.color = "blue";
                td2.innerHTML = "ODD";
            }

            btnDelete.setAttribute("onclick", `deleteNumber(${i})`) ;
            btnDelete.innerHTML = "Remove"; 

            btnEdit.setAttribute("onclick", `editNumber(${i})`) ;
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbl.appendChild(tr);

            if(!(numbersArr.length == 0)) {
                btn3.style.display = "inline";
                btn4.style.display = "inline";
                btn5.style.display = "inline";
                sortBlock.style.display = "inline";
            }
            
            total += numbersArr[i];
            console.log(numbersArr[i]);

            console.log(`Total: ${total}`)
        }
    } else {
        total = 0;
        btn3.style.display = "none"
        btn4.style.display = "none";
        btn5.style.display = "none";
        sortBlock.style.display = "none";
    }

}

