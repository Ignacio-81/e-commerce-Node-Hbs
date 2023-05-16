const socket = io();
let Kart;
let userLogged;

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
const getLog = async () => {
  await logStatus().then((response) => {
    console.log(response);
    if (response.login == "true") {
      document.getElementById("usertext").innerHTML = response.user.username;
      return response.user.username;
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
    Kart = response;
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
            </tr>`;
  });
};

// Definimos la funcion submit handler, se ejecuta cuando se dispara el evento submit del form
/* const submitProductHandler = async (event) => {
  //Ejecutamos la funcion preventDefault() para evitar que se recargue la pagina
  event.preventDefault();
  await getLog();
  // Definimos la informacion del mensaje, es un obejto con una propiedad "username" y "message"
  const productInfo = {
    name: productName.value,
    price: productPrice.value,
    thumbnail: produdctthumbnail.value,
  };

  sendData("client:productData", productInfo);
  productName.value = "";
  productPrice.value = "";
  produdctthumbnail.value = "";
}; */

//productForm.addEventListener("submit", submitProductHandler);

//************************************************************************ */
//*********************Chats management and render ************************ */

const chatForm = document.getElementById("chatForm");
const userName = document.getElementById("userName");
const message = document.getElementById("message");
const messagesPool = document.getElementById("messagesPool");

const renderMessage = (messagesData) => {
  console.log("mensaje a mstrar : " + JSON.stringify(messagesData[0].messages));
  const html = messagesData[0].messages.slice(1).map((messageInfo) => {
    return `<div > <strong style="color:blue;">${messageInfo.username}</strong>
    <em style="color:blue; font-style: italic;" >${messageInfo.msgtype}</em> 
    <em style="color:green; font-style: italic;" >${messageInfo.message}</em> 
    <em style="color:brown;"> [${messageInfo.timestamp}] </em>
    </div>`;
  });

  messagesPool.innerHTML = html.join(" ");
};

// Definimos la funcion submit handler, se ejecuta cuando se dispara el evento submit del form

const submitMessageHandler = async (event) => {
  //Ejecutamos la funcion preventDefault() para evitar que se recargue la pagina
  event.preventDefault();
  const username = await getLog();
  //let today = new Date();
  //let date = today.toLocaleString();
  // Definimos la informacion del mensaje, es un obejto con una propiedad "username" y "message"
  const messageInfo = {
    user: username,
    msgtype: "user",
    message: message.value,
  };
  // Ejecutamos la funcion sendMessage() que la encargada de enviar el mensaje al back pasandole como parametro la informacion del mensaje
  sendData("client:message", messageInfo);

  // Vaciamos el message input asi queda libre para escribir un nuevo mensaje
  message.value = "";
  userName.readOnly = true;
};

chatForm.addEventListener("submit", submitMessageHandler);

socket.on("server:message", renderMessage);
//socket.on("server:products", renderProducts);

//************************************************************************ */
//*********************Cart management and render ************************ */

const callCartform = async (event) => {
  console.log("funcion callCartform", event);
  event.preventDefault();
  cartmodal.innerHTML = "";
  Kart.products.forEach((product) => {
    const { name, description, category, price, thumbnail, stock, timestamp } =
      product; // Destruct for product array
    //const indexProd = shopCart.idProd.indexOf(id); // get the index of this product
    //const totalPriceProd = price * shopCart.quantity[indexProd]; //get the total price for this product
    cartmodal.innerHTML += `
        <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
        <div class="mr-1"><img class="rounded" src="${thumbnail}" width="70"></div>
        <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">${name}</span>

            <div class="d-flex flex-row product-desc">
                <div class="size mr-1"><span class="text-grey">Qty Available:</span><span class="font-weight-bold">&nbsp;${stock}</span></div>
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
      fetch("/api/cart/cart-checkout")
        .then((response) => response.json())
        .then(function (response) {
          console.log("fetch cart checkout success");
          resolve(response);
        })
        .catch(function (error) {
          reject('WE have a problem with "Fetch" command:' + error.message);
        });
    }, 1000);
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

cartbutton.addEventListener("click", callCartform);
cartchkoutbtn.addEventListener("click", cartCheckoutbtn);

const loadPage = async () => {
  userLogged = await getLog();
  await getProducts();
  await getCart();
};

window.addEventListener("load", loadPage);
//casrtcountbtn.addEventListener("submit", callCartform);
