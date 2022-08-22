const serverUrl = "https://gjyexdlwsqwi.usemoralis.com:2053/server";
const appId = "zNakMsSAjNQYtzbJnJ9vaKfZRfKtEz2tvjS9FcCZ";
Moralis.start({ serverUrl, appId })
//document.getElementById('wallet').style.display = "none";
var usr_add = "";
async function check()
{
    let user = Moralis.User.current();
        // console.log("logged in user:", user);
        // console.log(user.get("ethAddress"));
        usr_add = user.get("ethAddress");
        console.log(usr_add);
        document.getElementById('walletid').innerHTML = usr_add.substring(0, 5);
        document.getElementById('connect_wallet').style.display = "none";
document.getElementById('Disconnect_wallet').style.display = "inline";
// const options = {
//     chain: "bsc",
//     address: "0x2AD07d82e3B8AAD6aF24191E055797363d5b2DC4",
//   };
//   const balances = await Moralis.Web3API.account.getTokenBalances(options);
const balances = await Moralis.Web3API.account.getTokenBalances();
console.log(balances);
if(balances==0)
{
    console.log("0 USDT");
    document.getElementById("blnc").innerHTML += `
          <p id="pblue">0 USDT</p>
          `;
}
else
{
    document.getElementById("blnc").innerHTML += `
          <h2>${balances}</h2>
          `;
}

// fetch("https://api.ethplorer.io/getAddressInfo/0x2AD07d82e3B8AAD6aF24191E055797363d5b2DC4?apiKey=api_key&token=SHIB").then((response)=>{
//     console.log(response.json());
//   }).catch( e => console.log(e));

    fetch("http://localhost:8081/displaycode?usr_add="+usr_add)
  
      .then(res => res.json())
      .then(function (data) {
        console.log(data)
        data.forEach(element => {
          console.log(element);
  
          document.getElementById("code").innerHTML += `
          <div><h2>${element.code}</h2></div>
          `;
          document.getElementById("link").innerHTML += `
          <input type="text" id="txt" value='${element.link}' hidden>
          <h2>${element.link}</h2>
          `;
        //   copy();
        })
        // )
      })
    if(!user)
    {
        try {
            user = await Moralis.authenticate({
                signingMessage: "Log in using Moralis",
            })

        }
        catch (err) {
            console.log(err)
        }
      
    }
    else
    {
        document.getElementById('connect_wallet').style.display = "none";
    document.getElementById('Disconnect_wallet').style.display = "inline";
    }

    //fee
    fetch("http://localhost:8081/isrecieved?usr_add="+usr_add)
  
    .then(res => res.json())
    .then(function (data) {
      console.log(data)
      if(data.length > 0)
      {
        document.getElementById('joined').style.display = "inline";
        document.getElementById('join').style.display = "none";
      }
      else
      {
        console.log("new user");
      }
    })

    var dbprice = 0;
    var dbrew = 0;
    var total = 0;
    var flag = false;
    //exchange record
    fetch("http://localhost:8081/excrecord?usr_add="+usr_add)
      .then(res => res.json())
      .then(function (data) {
        // console.log(data);
        data.forEach(element => {
          dbprice = dbprice + parseFloat(element.price);
          dbrew = dbrew + parseFloat(element.reward);
          total = dbprice + dbrew;
          // console.log(total, typeof total);
          let dbDate = parseInt(element.date);
          let nowDate = new Date().getTime();
          let day = Math.round((nowDate - dbDate) / 86400000);
          // console.log(new Date(1660769256245), day);
          let rewfordayMinRec = element.price * 2 / 100;
          if(day > 0){
            if(element.rewardDays < day){
              let reward = element.price * 2 / 100;
              let dbreward = parseFloat(reward) + parseFloat(element.reward);
              let dbrewardDays = element.rewardDays + 1;
              console.log(parseFloat(reward) + parseFloat(element.reward),  dbreward);
              fetch("http://localhost:8081/updateReward", {
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
                method: "POST",
                body: JSON.stringify({ id: element.id, reward: dbreward, rewardDays: dbrewardDays }),
              });
              flag = true;
              dayMinRec(element.usr_add, nowDate, rewfordayMinRec);
            }
          }
          document.getElementById("rcd").innerHTML += `
          <div class="record-content mt-4" >
            <h3 id="pblack" class="col-7" >Date</h3>
            <h3 id="pblack" class="col-5">Amount</h3>
            </div>
          `;
        })
        if(flag == true){
        // console.log(total, usr_add);
        updatetotalEth(total, usr_add);
        }
      })
    //body onload function end
    getMinRec();
    getdayMinRec();
    deducttotalEth();
}

async function conn_wallet() {
    alert("connected");
    let user = Moralis.User.current();
//     const balances = await Moralis.Web3API.account.getTokenBalances();
// console.log(balances);
    document.getElementById('connect_wallet').style.display = "none";
    document.getElementById('Disconnect_wallet').style.display = "inline";
    if (!user) {
        try {
            user = await Moralis.authenticate({
                signingMessage: "Log in using Moralis",
            }).then(function (user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
                
                usr_add = user.get("ethAddress");
                console.log(usr_add);
                document.getElementById('walletid').innerHTML = usr_add.substring(0, 5);
                document.getElementById('connect_wallet').style.display = "none";
    document.getElementById('Disconnect_wallet').style.display = "inline";
    //generate refferel code
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      var urladd = (Math.floor(100000 + Math.random() * 900000));
        var url = ( window.location.href +urladd);
    console.log(url);
      
     var rcode = (Math.floor(100000 + Math.random() * 900000));
     console.log(rcode);
    usr_add ;
    alert(usr_add);
    fetch("http://localhost:8081/generateexist?usr_add="+usr_add)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        if (data != 0) {
            alert("exist");
        //    alert("already");
        } else {
            fetch("http://localhost:8081/generate", {
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                // Adding method type
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify({ "usr_add":usr_add,"rcode":rcode,"url":url }),
            });
        }
    })
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
        catch (err) {
            console.log(err)
        }

    }
}

async function disconn_wallet()
{
    //const currentUser = Moralis.User.current();
  await  Moralis.User.logOut();
    alert("DisConnected to MetaMask");
    document.getElementById('connect_wallet').style.display = "inline";
    document.getElementById('Disconnect_wallet').style.display = "none";
  
}

async function recieve()
{
    console.log("eth share");
    const web3 = await Moralis.enableWeb3();
const options = {
    type: "native",
     amount: Moralis.Units.ETH(0.0001),
  //   amount: Moralis.Units.ETH("0.0001"),
    receiver: "0x50c36ec8B246C3aD70d02ba78ede118891c9E836",
  };
  let result = await Moralis.transfer(options);
  console.log(result);
  alert("recieved");
//   document.getElementById("myModal").style.display="none";
//   Swal.fire(
// 'Transaction in process',
// 'after 2 minutes check your transaction',
// 'success'
// )
fetch("http://localhost:8081/recieve", {
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                // Adding method type
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify({ "usr_add":usr_add}),
            });
if(result != true)
{
    alert("not recieved");
    console.log("not");
    document.getElementById('joined').style.display = "inline";
    document.getElementById('join').style.display = "none";
}
else
{
    alert("yes")
    console.log("yes");
}
}

function generate()
 {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      var urladd = (Math.floor(100000 + Math.random() * 900000));
        var url = ( window.location.href +urladd);
    console.log(url);
      
     var rcode = (Math.floor(100000 + Math.random() * 900000));
     console.log(rcode);
    usr_add ;
    alert(usr_add);
    fetch("http://localhost:8081/generateexist?usr_add="+usr_add)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        if (data != 0) {
            alert("exist");
        //    alert("already");
        } else {
            fetch("http://localhost:8081/generate", {
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                // Adding method type
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify({ "usr_add":usr_add,"rcode":rcode,"url":url }),
            });
        }
    })

}

//mining.html 
async function miningusers()
{
    console.log("hey");
    let sr=0;
    fetch("http://localhost:8081/minusers")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
    // fetch("http://localhost:8081/minusers")
    // .then(res => res.json())
    // .then(function (data) {
      console.log(data)
      
      data.forEach(user => {
       
        sr = sr + 1;
        document.getElementById('user').innerHTML += `
        <tr class="text-center">
        <th><h4>${sr}</h4></th>
        <th><h4>${user.usr_add}</h4></th>
        <th><h4>${user.price} ETH</h4></th>
      </tr>`;
      })
    })
}

function copy() {
    /* Get the text field */
    var copyText = document.getElementById("txt");
    console.log(copyText);
    /* Select the text field */
    // copyText.focus();
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
    
}

var date = new Date().getTime();
async function excbtn()
  {
    try{
    var price = document.getElementById("price").value;
    // const web3 = await Moralis.enableWeb3();
    // const options = {
    //     type: "native",
    //      amount: Moralis.Units.ETH(price),
    //     receiver: "0x50c36ec8B246C3aD70d02ba78ede118891c9E836",
    //   };
    //   let result = await Moralis.transfer(options);
    //   console.log(result);
    //   if(result){
    fetch("http://localhost:8081/exchange", {
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: JSON.stringify({ "price": price, "usr_add":usr_add, "date": date }),
    });
  // }
}
catch{
  alert("Error")
}
}

async function login(){
    let name = document.getElementById('name').value;
    let pass = document.getElementById('pass').value;
fetch("http://localhost:8081/getadmin")
    .then(function (res) {
    return res.json();
    })
    .then((data) => {
    console.log(data[0].name, data[0].pass);
    if (name == data[0].name && pass == data[0].pass) {
        localStorage.setItem("admin", "allow");
        location.href = "mining.html";
    } else {
        Swal.fire("", "Name and Password is Incorrect", "info");
    }
    });
}

async function logout(){
    localStorage.removeItem("admin");
    location.href = "login.html";
}

async function changepass(){
    let newpass = document.getElementById("newpass").value;
    fetch("http://localhost:8081/changepass", {
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: JSON.stringify({ pass: newpass }),
    });
}

async function getusers(){
    let sr = 0;
    fetch("http://localhost:8081/getusers")
    .then(res => res.json())
    .then(function (data) {
      console.log(data)
      data.forEach(user => {
        sr = sr + 1;
        document.getElementById('user').innerHTML += `
        <tr class="text-center">
        <th><h4>${sr}</h4></th>
        <th><h4>${user.usr_add}</h4></th>
        <th><h4>${user.code}</h4></th>
      </tr>`;
      })
    })
}

async function getwdReq(){
    fetch("http://localhost:8081/getwdReq")
    .then(function (res) {
    return res.json();
    })
    .then((data) => {
    console.log(data);
    data.forEach(user => {
        if(user.status == 0){
            document.getElementById('wdUser').innerHTML += `
            <tr class="text-center">
            <th><h4>${user.walet}</h4></th>
            <th><h4>${user.amount}</h4></th>
            <th><h4>${user.date}</h4></th>
            <th style="cursor: pointer"><h4 onclick="wdAllow('${user.walet}', ${user.amount})">Allow Withdraw</h4></th>
          </tr>`;
        }
        else{
            document.getElementById('wdUser').innerHTML += `
            <tr class="text-center">
            <th><h4>${user.walet}</h4></th>
            <th><h4>${user.amount}</h4></th>
            <th><h4>${user.date}</h4></th>
            <th><h4>Withdraw Done</h4></th>
          </tr>`;
        }
    })
  })
}

async function wdAllow(waletadd, amm){
    const web3 = await Moralis.enableWeb3();
    try{
    const options = {
        type: "native",
        amount: Moralis.Units.ETH(amm),
        receiver: waletadd,
    };
    let result = await Moralis.transfer(options);
    console.log(result);
    if(result){
    fetch("http://localhost:8081/wdAllow", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        method: "POST",
        body: JSON.stringify({ walet : waletadd }),
      });
      deducttotalEth(waletadd, amm);
      Swal.fire("", "Withdraw Done", "info");
      location.reload();
    }
}
catch{
    Swal.fire("", "Unknown Error", "error");
}
}

async function deducttotalEth(waletadd, amm){
  console.log(deductEth, "deduct");
  fetch("http://localhost:8081/wdAllow", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({ walet : waletadd, amm : amm, totalEth: deductEth }),
  });
}

async function wdReq(){
    let wd = parseFloat(document.getElementById('wd').value);
    let totalwd = parseFloat(document.getElementById('totalEth').innerHTML);
    if(wd > totalwd){
      console.log("No");
      // Swal.fire("", "Sorry insufficient amount", "info");
    }
    else{
      // console.log(totalwd, typeof totalwd, wd, typeof wd);
      fetch("http://localhost:8081/wdReq", {
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          },
          method: "POST",
          body: JSON.stringify({ "walet": usr_add, "amount": wd }),
      });
      Swal.fire("", "Withdraw", "info");
    }
}

async function getwdRec(){
    fetch(`http://localhost:8081/getwdRec?user='${usr_add}'`)
    .then(function (res) {
    return res.json();
    })
    .then((data) => {
    console.log(data);
    data.forEach(user => {
        if(user.status == 1){
            document.getElementById('wdRec').innerHTML += `
            <div id="record-content">
            <p id="pblack">${user.date}</p>
            <p id="pblack">${user.amount}</p>
            <p id="pblack">Withdraw</p>
          </div>`;
        }
        else{
            document.getElementById('wdRec').innerHTML += `
            <div id="record-content">
            <p id="pblack">${user.date}</p>
            <p id="pblack">${user.amount}</p>
            <p id="pblack">Pending</p>
          </div>`;
        }
    })
})
}

var totalEth = 0;
var totalreward = 0;
var totalmin = 0;
var deductEth = 0;
async function getMinRec(){
  fetch("http://localhost:8081/excrecord?usr_add="+usr_add)
  .then(res => res.json())
  .then(function (data) {
    // console.log("Run getMinRec");
    data.forEach(element => {
      totalEth = totalEth + parseFloat(element.price) + parseFloat(element.reward);
      totalreward = totalreward + parseFloat(element.reward);
      totalmin = totalmin + parseFloat(element.price);
      deductEth = element.totalEth;
      // console.log(deductEth);
    })
    // console.log(totalmin);
    document.getElementById('totalEth').innerHTML = totalEth + "ETH";
    document.getElementById('totalreward').innerHTML = totalreward + "ETH";
    document.getElementById('totalmin').innerHTML = totalmin + "ETH";
  })
}

async function dayMinRec(add, date, rew){
  // console.log(add, date, rew);
  fetch("http://localhost:8081/addMinRec", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({ walet : add, date: date, rew: rew }),
  });
}

async function getdayMinRec(){
  fetch("http://localhost:8081/getdayMinRec?usr_add="+usr_add)
  .then(res => res.json())
  .then(function (data) {
    // console.log("Run getdayMinRec");
    data.forEach(element => {
      // console.log(element);
      let date = parseInt(element.date);
      date = new Date(date);
      date = date.toString();
      date = date.slice(0, 24);
      document.getElementById('dayMinRec').innerHTML += `
      <div id="pricing">
        <p id="pgrey">${date}</p>
        <p id="pgrey">${element.reward} ETH</p>
      </div>
      `;
    })
  })
}

async function updatetotalEth(total, add){
  fetch("http://localhost:8081/updatetotalEth", {
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
  method: "POST",
  body: JSON.stringify({ usr_add: add, totalEth: total }),
});
}

// async function blnce()
// {
//     const balances = await Moralis.Web3API.account.getTokenBalances();
//     if(balances==0)
//     {
//         console.log("0 USDT");
//     }
//     else
//     {
//         console.log(balances);
//     }
    
    // get mainnet native balance for the current user;

// get BSC native balance for a given address
// const options = {
//   chain: "bsc",
//   address: "0x2AD07d82e3B8AAD6aF24191E055797363d5b2DC4",
// };
// const balance = await Moralis.Web3API.account.getNativeBalance(options);  
// console.log(balance);
// }