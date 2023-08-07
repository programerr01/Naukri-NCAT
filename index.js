var file_url ="https://raw.githubusercontent.com/programerr01/flipkart-grid5.0/master/result.json"
var GLOBAL_RES = []
var GLOBAL_DT = []
var page_no = 1;
var last_page = 21;
var bdy = document.querySelector("#tb")
var next = document.querySelector(".next")
var prev = document.querySelector(".prev")
var curr_ = document.querySelector("#current")
var search_box = document.querySelector("#s_box_")


search_box.addEventListener('input',(e)=>{
    if(e.target.value ==""){
        GLOBAL_DT = GLOBAL_RES.slice((page_no-1)*100,page_no*100);
        curr_.innerText = page_no
        fill_table()
    }


})

function handleSearch(){
    var search_item = search_box.value;
    console.log("seached item",search_item);
    if(search_box){
        var loc_dt = []
        for(var each of GLOBAL_RES){
                if(JSON.stringify(each).indexOf(search_item) != -1){
                    loc_dt.push(each);
                } 
        }
        
        fill_table(loc_dt)
    }
}
async function get_data(){
    const res = await fetch(file_url)
    const res_json = await res.json();
    return res_json

}
function addPrev(e){
    if(page_no == 1){
        return;
    }
    page_no-=1;
    if(page_no == 1){
        prev.classList.add("disabled");
    }
    GLOBAL_DT = GLOBAL_RES.slice((page_no-1)*100,page_no*100);
    curr_.innerText = page_no
    fill_table()
    next.classList.remove("disabled");
}

function addNext(e){
    if(page_no == 21){
        return;
    }
    prev.classList.remove("disabled");
    page_no+=1;
    if(page_no == 21){
        next.classList.add("disabled");
    }
    GLOBAL_DT = GLOBAL_RES.slice((page_no-1)*100,page_no*100);
    fill_table()
    curr_.innerText = page_no
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
      return "Invalid time";
    }
  
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    let timeString = "";
  
    if (hours > 0) {
      timeString += hours + "h ";
    }
  
    if (minutes > 0) {
      timeString += minutes + "m ";
    }
  
    if (remainingSeconds > 0) {
      timeString += remainingSeconds + "s";
    }
  
    return timeString.trim();
  }
  
async function fill_table(copy_dt=null){
    var tt_ = ""
    if(!copy_dt){
        copy_dt = GLOBAL_DT
    }
    for(var each of copy_dt){
        console.log(each);
        var t_ =`
        <tr>
            <th scope="row">${each['rank']}</th>
            <td>${each['team']['team_name']}</td>
            <td>${each['team']['players'].map((each)=>each.name).join(",")}</td>
            <td>${formatTime(each['time'])}</td>
        </tr>
        `
        tt_+=t_;
    }
    
    bdy.innerHTML=""
    bdy.innerHTML = tt_;

}
get_data().then((res)=>{
    GLOBAL_RES = res;
    console.log("Got data",res)
    GLOBAL_DT = res.slice((page_no-1)*100,page_no*100);
    console.log(GLOBAL_DT,res[0])
    fill_table();
})
