let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-Btn")
let newGameBtn=document.querySelector(".newGameBtn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let msge=document.querySelector("#msge");

let check=0;
let turn0=true;
let timer=3;
let win=false;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

function remScale(){
    boxes.forEach((box)=>{
        box.classList.remove("active");
    });
}
remScale();

const resetGameAuto=()=>{
    timer=3;
    resetGame();
};
const resetGame=()=>{
    turn0=true;
    check=0;
    win=false;
    enabledBoxes();
    msgContainer.classList.add("hide");
    remScale();
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText="O";
            turn0=false;
            box.style.color="#FF0000";
        }
        else{
            box.innerText="X";
            turn0=true;
            box.style.color="#ff00db";
        }
        box.disabled=true; 
        checkwinner();
        if(check===9 && win==false)
        forDraw();
    });
});
const disabledBoxes=()=>{
    for(let box of boxes) box.disabled=true;
}

const enabledBoxes=()=>{
    for(let box of boxes){
         box.disabled=false;
         box.innerText="";
    }
}
function newGame(){
    let id1= setInterval(()=>{
        if(timer===-1 ){   
            clearInterval(id1);
            resetGameAuto();
        }
        else{
        msge.innerText=`New Game starts in ${timer}s`;
        --timer;
        }
        
    },1000);
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    newGame(); 
}
const forDraw=()=>{
    msg.innerText=`Game Is Draw`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    newGame();
}

let pattern;
const checkwinner=()=>{
    for(pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        
        if(pos1Val !="" && pos2Val!=""&& pos3Val!=""){
           if(pos1Val===pos2Val && pos2Val===pos3Val)
           {   
            win=true; 
            highlight();
            showWinner(pos1Val);
           }  
        }
    }
    check++;
} ;
function highlight(){
    let f=pattern[0];
    let s=pattern[1];
    let t=pattern[2];
    boxes[f].classList.add("active");
    boxes[s].classList.add("active");
    boxes[t].classList.add("active");
}

// newGameBtn.addEventListener("click",resetGame);

resetBtn.addEventListener("click",resetGame);


