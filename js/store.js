// ATENÇÃO: isso NÃO é um banco de dados de verdade.
// É uma forma de guardar dados no navegador (localStorage) só pra você
// conseguir testar o site inteiro funcionando, sem precisar de um backend ainda.
//
// Limitação importante: os dados ficam salvos só NESSE navegador/dispositivo.
// Se você abrir o site em outro celular/computador, ele não vai ver as rifas
// nem as compras feitas aqui. Pra funcionar com clientes de verdade, os dados
// precisam morar em um servidor com banco de dados (próxima etapa do projeto).

(function () {
  var RAFFLES_KEY = "sav_raffles";
  var ORDERS_KEY = "sav_orders";
  var LAST_ORDER_KEY = "sav_last_order_id";

  function seedRafflesIfEmpty() {
    var existing = localStorage.getItem(RAFFLES_KEY);
    if (existing) return;

    var seed = [
      {
        id: "seed-1",
        title: "R$ 10.000,00 no PIX (10 mil reais no PIX)",
        description: "Uma oportunidade de alto valor com sorteio direto e reserva simples.",
        image: "./images/banners/money.jpg",
        ticketValue: 0.19,
        totalTickets: 100000,
        featured: true,
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(RAFFLES_KEY, JSON.stringify(seed));
  }

  function getRaffles() {
    seedRafflesIfEmpty();
    return JSON.parse(localStorage.getItem(RAFFLES_KEY) || "[]");
  }

  function getRaffleById(id) {
    return getRaffles().find(function (r) { return r.id === id; }) || null;
  }

  function getFeaturedRaffle() {
    var raffles = getRaffles();
    return raffles.find(function (r) { return r.featured; }) || raffles[0] || null;
  }

  function saveRaffle(raffle) {
    var raffles = getRaffles();
    raffle.id = "r" + Date.now();
    raffle.createdAt = new Date().toISOString();
    raffles.push(raffle);
    localStorage.setItem(RAFFLES_KEY, JSON.stringify(raffles));
    return raffle;
  }

  function getOrders() {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  }

  function generateTicketNumbers(qty) {
    var numbers = [];
    for (var i = 0; i < qty; i++) {
      numbers.push(String(Math.floor(100000 + Math.random() * 900000)));
    }
    return numbers;
  }

  function saveOrder(order) {
    var orders = getOrders();
    order.id = "o" + Date.now();
    order.createdAt = new Date().toISOString();
    order.status = order.status || "pending";
    if (!order.ticketNumbers) {
      order.ticketNumbers = generateTicketNumbers(order.quantity);
    }
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    localStorage.setItem(LAST_ORDER_KEY, order.id);
    return order;
  }

  function getOrderById(id) {
    return getOrders().find(function (o) { return o.id === id; }) || null;
  }

  function getLastOrder() {
    var id = localStorage.getItem(LAST_ORDER_KEY);
    if (!id) return null;
    return getOrderById(id);
  }

  function formatBRL(value) {
    var n = Number(value);
    if (isNaN(n)) n = 0;
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function formatDate(isoString) {
    try {
      return new Date(isoString).toLocaleDateString("pt-BR");
    } catch (e) {
      return "";
    }
  }

  window.Store = {
    getRaffles: getRaffles,
    getRaffleById: getRaffleById,
    getFeaturedRaffle: getFeaturedRaffle,
    saveRaffle: saveRaffle,
    getOrders: getOrders,
    saveOrder: saveOrder,
    getOrderById: getOrderById,
    getLastOrder: getLastOrder,
    generateTicketNumbers: generateTicketNumbers,
    formatBRL: formatBRL,
    formatDate: formatDate
  };
})();
