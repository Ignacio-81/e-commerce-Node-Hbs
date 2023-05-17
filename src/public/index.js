const socket = io();
let Kart;
let Order;
let userLogged;
//Get de log status for User to mantain session and main page
const logStatus = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/loginstatus")
        .then((response) => response.json())
        .then(function (response) {
          console.log("fetch");
          resolve(response);
        })
        .catch(function (error) {
          reject('WE have a problem with "Fetch" command:' + error.message);
        });
    }, 1000);
  });
};
//Get Carts from server
const getCartfetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/api/carts")
        .then((response) => response.json())
        .then(function (response) {
          console.log("fetch usercart");
          resolve(response);
        })
        .catch(function (error) {
          reject('WE have a problem with "Fetch" command:' + error.message);
        });
    }, 1000);
  });
};
//Get Orders From Server
const getOrdersfetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/order")
        .then((response) => response.json())
        .then(function (response) {
          console.log("fetch orders");
          resolve(response);
        })
        .catch(function (error) {
          reject('WE have a problem with "Fetch" command:' + error.message);
        });
    }, 1000);
  });
};
//Get All Products from Server
const getAllProductsfetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/api/products")
        .then((response) => response.json())
        .then(function (response) {
          console.log("fetch allproducts");
          resolve(response);
        })
        .catch(function (error) {
          reject('WE have a problem with "Fetch" command:' + error.message);
        });
    }, 1000);
  });
};
//Manage log and re direct if not logged in
const getLog = async () => {
  await logStatus().then((response) => {
    console.log(response);
    if (response.login == "true") {
      document.getElementById("usertext").innerHTML = response.user.username;
      userLogged = response.user.username;
      return JSON.stringify(response.user.username);
    } else {
      Swal.fire({
        title: "See you " + document.getElementById("usertext").textContent,
        text: "Logout Success",
        icon: "success",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      }).then(() => {
        console.log("Swal");
        window.location.href = "/logout";
      });
    }
  });
};

const getProducts = async () => {
  await getAllProductsfetch().then((response) => {
    console.log(response);
    renderProducts(response);
  });
};

const getCart = async () => {
  await getCartfetch().then((response) => {
    console.log(response);
    if (response) {
      casrtcountbtn.innerText = "1";
      Kart = response;
    } else {
      casrtcountbtn.innerText = "0";
    }
  });
};
const getOrder = async () => {
  await getOrdersfetch().then((response) => {
    console.log(response);
    if (response) {
      const count = Object.keys(response).length;
      ordercountbtn.innerText = count.toString();
      Order = response;
    } else {
      ordercountbtn.innerText = "0";
    }
  });
};
const logoutEvent = (event) => {
  event.preventDefault();
  Swal.fire({
    title: "See you " + document.getElementById("usertext").textContent,
    text: "Logout Success",
    icon: "success",
    timer: 2000,
    showCancelButton: false,
    showConfirmButton: false,
  }).then(() => {
    console.log("Swal");
    window.location.href = "/logout";
  });
};

const userform = document.getElementById("headerform");

userform.addEventListener("submit", logoutEvent);

//New Product constants
const productsPool = document.getElementById("tableBody");
const productForm = document.getElementById("addProductForm");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const produdctthumbnail = document.getElementById("thumbnail");

//send client data through socket
const sendData = (type, data) => {
  socket.emit(type, data);
};

const renderProducts = (productsByUser) => {
  console.log("Data de producto : ", productsByUser);
  productsPool.innerHTML = "";
  productsByUser.forEach((product) => {
    const { name, price, thumbnail } = product;
    productsPool.innerHTML += `
            <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <img
                      src="${thumbnail}"
                      alt=""
                      style="width: 100px; height: 100px"
                    />
                  </div>
                </td>
                <td>
                  <p class="fw-normal mb-1">${name}</p>
                </td>
                <td>
                  <p class="rounded-pill d-inline">
                    ${price}
                  </p>
                </td>
                <td>
                    <button id="addcartButton"  onclick="addToCart()">Add to Cart</button>
              </td>
            </tr>`;
  });
};

//************************************************************************ */
//*********************Chats management and render ************************ */

const chatForm = document.getElementById("chatForm");
const message = document.getElementById("message");
const messageTypeSelect = document.getElementById("messageType");
const messagesPool = document.getElementById("messagesPool");

const getChatHistory = async () => {
  const messageInfo = {
    username: userLogged,
    msgtype: "loadpage",
    message: "",
  };
  sendData("client:message", messageInfo);
};

const renderMessage = async (messagesData) => {
  console.log("mensaje a mstrar : " + JSON.stringify(messagesData));
  let html = "";
  for (let i = 0; i < messagesData.length; i++) {
    const messages = messagesData[i].messages;
    html += messages
      .slice(1)
      .map((messageInfo) => {
        return `<div>
        <strong style="color: blue;">${messageInfo.username}</strong>
        <em style="color: blue; font-style: italic;">${messageInfo.msgtype}</em>
        <em style="color: green; font-style: italic;">${messageInfo.message}</em>
        <em style="color: brown;">[${messageInfo.timestamp}]</em>
      </div>`;
      })
      .join(" ");
  }
  messagesPool.innerHTML = html;
  //}
};

const submitMessageHandler = async (event) => {
  //Ejecutamos la funcion preventDefault() para evitar que se recargue la pagina
  event.preventDefault();
  await getLog();
  // Definimos la informacion del mensaje, es un obejto con una propiedad "username" y "message"
  const messageInfo = {
    username: userLogged,
    msgtype: messageTypeSelect.value,
    message: message.value,
  };
  // Ejecutamos la funcion sendMessage() que la encargada de enviar el mensaje al back pasandole como parametro la informacion del mensaje
  sendData("client:message", messageInfo);

  // Vaciamos el message input asi queda libre para escribir un nuevo mensaje
  message.value = "";
};

chatForm.addEventListener("submit", submitMessageHandler);
socket.on("server:message", renderMessage);

//************************************************************************ */
//*********************Cart management and render ************************ */

const callCartform = async (event) => {
  console.log("funcion callCartform", event);
  console.log("funcion callCartform", Kart[0]);
  event.preventDefault();
  cartmodal.innerHTML = "";
  Kart[0].products.forEach((product) => {
    const {
      name,
      description,
      category,
      price,
      thumbnail,
      stock,
      qty,
      timestamp,
    } = product;
    cartmodal.innerHTML += `
        <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
        <div class="mr-1"><img class="rounded" src="${thumbnail}" width="70"></div>
        <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">${name}</span>

            <div class="d-flex flex-row product-desc">
                <div class="size mr-1"><span class="text-grey">Qty for this Product:</span><span class="font-weight-bold">&nbsp;${qty}</span></div>
            </div>
           </div>
        <div class="d-flex flex-row align-items-center qty"><i class="fa fa-minus text-danger"></i>
            <h5 class="text-grey mt-1 mr-1 ml-1">${category}</h5><i class="fa fa-plus text-success"></i></div>
        <div>
            <h5 class="text-grey">$${price}</h5>
        </div>
        <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger"></i></div>
        </div>`;
  });
};
const cartCheckOutfetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/api/carts/cart-checkout")
        .then((response) => response.json())
        .then(function (response) {
          console.log("fetch cart checkout success");
          casrtcountbtn.innerText = "0";

          resolve(response);
        })
        .catch(function (error) {
          reject('WE have a problem with "Fetch" command:' + error.message);
        });
    }, 2000);
  });
};
const cartCheckoutbtn = (event) => {
  Swal.fire({
    title:
      "Your purchased is done " +
      document.getElementById("usertext").textContent,
    text: "Logout Success",
    icon: "success",
    timer: 2000,
    showCancelButton: false,
    showConfirmButton: false,
  }).then(async () => {
    console.log("Swal");
    await cartCheckOutfetch();
  });
};

const cartbutton = document.getElementById("cartButton");
const casrtcountbtn = document.getElementById("cartCount");
const cartmodal = document.getElementById("cart-modal");
const cartchkoutbtn = document.getElementById("cart-checkout");
const ordercountbtn = document.getElementById("orderCount");

cartbutton.addEventListener("click", callCartform);
cartchkoutbtn.addEventListener("click", cartCheckoutbtn);

const callOrderform = async (event) => {
  console.log("funcion callCartform", event);
  console.log("funcion callCartform", Order);
  event.preventDefault();
  orderthead.innerHTML = "";
  for (const eachOrder of Order) {
    orderthead.innerHTML += `
    <tr>
    <th>Order : </th>
    <td>${eachOrder.orderNumber}</td>
  </tr>
    `;
    for (const [index, product] of eachOrder.products.entries()) {
      const { name, description } = product;
      orderthead.innerHTML += `
  <tr>
    <th scope="row">${index + 1}</th>
    <td>${name}</td>
    <td>${description}</td>
    <td><a><i class="fas fa-times"></i></a></td>
  </tr>
`;
    }
  }
};
const orderbutton = document.getElementById("orderButton");
const ordermodal = document.getElementById("order-modal");
const orderthead = document.getElementById("order-modal-thead");
const ordertbody = document.getElementById("order-modal-body");
orderbutton.addEventListener("click", callOrderform);

/* const addcartbtn = document.getElementById("addcartButton");
addcartbtn.addEventListener("click", calladdcart); */
const loadPage = async () => {
  //await getLog();
  await getProducts();
  await getCart();
  await getOrder();
};

window.addEventListener("load", loadPage);
