const Base_Url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form Button");

const fromcurr=document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

window.addEventListener("load",()=>{
updateExchangeRate();
})

for(let select of dropdown){
for (currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText=currcode;
    newOption.value=currcode;
    if(select.name==="From"&& currcode==="USD"){
        newOption.selected="selected";
    }
    if(select.name==="To"&& currcode==="INR"){
        newOption.selected="selected";
    }
   
    select.append(newOption);
}
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })

}
const updateFlag=(element)=>{
  let currcode=element.value;
  let countrycode=countryList[currcode];
  let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  element.parentElement.querySelector("img").src=newSrc;
};



button.addEventListener("click",(evt)=>{
evt.preventDefault();
updateExchangeRate();
});

const updateExchangeRate= async()=>{
    let amount = document.querySelector(".amount input");

let amtValue=amount.value;
if(amtValue===""|| amtValue < 1){
    amtValue=1;
    amount.value="1";
}
const url=`${Base_Url}${fromcurr.value.toLowerCase()}.json`;
console.log(url);
let response= await fetch(url);
let data= await response.json();
console.log(data);

let rate=data[fromcurr.value.toLowerCase()][toCurr.value.toLowerCase()];
console.log(rate);
console.log(response);

let finalamt = amount.value*rate;
msg.innerText=`${amtValue} ${fromcurr.value} = ${finalamt} ${toCurr.value}`
}

