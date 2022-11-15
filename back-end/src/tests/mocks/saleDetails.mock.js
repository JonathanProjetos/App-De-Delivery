
const saleDetailMockId = [
  {
    "id": 3,
    "name": "Cliente Zé Birita",
    "email": "zebirita@email.com",
    "password": "1c37466c159755ce1fa181bd247cb925",
    "role": "customer",
    "sale": [
      {
        "id": 2,
        "userId": 3,
        "sellerId": 2,
        "totalPrice": "58.20",
        "deliveryAddress": "acre",
        "deliveryNumber": "666",
        "saleDate": "2022-11-08T18:53:11.000Z",
        "status": "Pendente",
        "user_id": 3,
        "seller_id": 2,
        "products": [
          {
            "id": 1,
            "name": "Skol Lata 250ml",
            "price": "2.20",
            "url_image": "http://localhost:3001/images/skol_lata_350ml.jpg",
            "saleProduct": {
              "saleId": 2,
              "productId": 1,
              "quantity": 6,
              "sale_id": 2,
              "product_id": 1
            }
          },
          {
            "id": 2,
            "name": "Heineken 600ml",
            "price": "7.50",
            "url_image": "http://localhost:3001/images/heineken_600ml.jpg",
            "saleProduct": {
              "saleId": 2,
              "productId": 2,
              "quantity": 6,
              "sale_id": 2,
              "product_id": 2
            }
          }
        ]
      }
    ]
  }
]

const saleDetailMock = [
  {
    "id": 1,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "98.80",
    "deliveryAddress": "sadfasfasf",
    "deliveryNumber": "666",
    "saleDate": "2022-11-04T23:03:45.000Z",
    "status": "Pendente",
    "user_id": 3,
    "seller_id": 2
  },
  {
    "id": 2,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "58.20",
    "deliveryAddress": "acre",
    "deliveryNumber": "666",
    "saleDate": "2022-11-08T18:53:11.000Z",
    "status": "Pendente",
    "user_id": 3,
    "seller_id": 2
  }
]

module . exports = { saleDetailMock, saleDetailMockId };