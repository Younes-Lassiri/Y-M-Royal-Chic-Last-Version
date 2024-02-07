import { FETCH_DATA, ADD_TO, ADD_WISH_PRODUCT, REMOVE_WISH_PRODUCT, ADD_TO_CART, REMOVE_CART, ADD_QUANTITE, MINUCE_QUANTITE, REMOVE_TRASH, VIEW_PRODUCT, HIDE_VIEW, ADD_SINGLE_QUANTITE, MINUCE_SINGLE_QUANTITE, ADD_REVIEW } from "../actions/actions";

const ShopReducer = (state = { products: [
  {
    "id": "1",
    "name": "Sunglasses",
    "thumbnail": "https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/shop-img-8-600x795.jpg",
    "price": 94,
    "promo": false,
    "new": false,
    "sold": false,
    "wish": false,
    "quantite": 0,
    "reviews": []
  },
  {
    "id": "2",
    "name": "Boots",
    "thumbnail": "https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/shop-img-7-600x795.jpg",
    "price": 214,
    "promo": false,
    "new": true,
    "sold": false,
    "wish": false,
    "quantite": 0,
    "reviews": []
  },
  {
    "id": "3",
    "name": "Green Pants",
    "thumbnail": "https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/shop-img-6-600x795.jpg",
    "price": 110,
    "promo": false,
    "new": false,
    "sold": false,
    "wish": false,
    "quantite": 0,
    "reviews": []
  },
  {
    "id": "4",
    "name": "Purse",
    "thumbnail": "https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/shop-img-5-600x795.jpg",
    "price": 79,
    "promo": false,
    "new": false,
    "sold": false,
    "wish": false,
    "quantite": 0,
    "reviews": []
  },
  {
    "id": "5",
    "name": "Sandals",
    "thumbnail": "https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/shop-img-4-600x795.jpg",
    "price": 173,
    "promo": false,
    "new": false,
    "sold": false,
    "wish": false,
    "quantite": 0,
    "reviews": []
  },
  {
    "id": "6",
    "name": "Dress",
    "thumbnail": "https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/shop-img-3-600x795.jpg",
    "price": 790,
    "promo": false,
    "new": false,
    "sold": false,
    "quantite": 0,
    "reviews": []
  },
  {
    "id": "7",
    "name": "Blouse",
    "thumbnail": "https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/shop-img-1-600x795.jpg",
    "price": 176,
    "promo": true,
    "oldPrice": 198,
    "new": false,
    "sold": false,
    "promoValue": 11,
    "wish": false,
    "quantite": 0,
    "reviews": []
  },
  {
    "id": "8",
    "name": "Watch",
    "thumbnail": "https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/shop-img-2-600x795.jpg",
    "price": 320,
    "promo": false,
    "new": false,
    "sold": true,
    "wish": false,
    "quantite": 0,
    "reviews": []
  },
  {
    "id": "1252",
    "name": "Srdina",
    "thumbnail": "https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/shop-img-2-600x795.jpg",
    "price": 90,
    "new": false,
    "sold": true,
    "promo": false,
    "oldPrice": 0,
    "promoValue": 0,
    "wish": false,
    "quantite": 0
  },
  {
    "id": "1838",
    "name": "Houta",
    "thumbnail": "https://www.rustica.fr/images/bien-s-occuper-ses-poissons-ce-qu-il-faut-savoir-absolument-18373.jpg",
    "price": 50,
    "new": false,
    "sold": false,
    "promo": true,
    "oldPrice": 75,
    "promoValue": 15,
    "wish": false,
    "quantite": 0
  },
  {
    "id": 5764,
    "name": "ay haja",
    "thumbnail": "https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/shop-img-3-600x795.jpg",
    "price": 231,
    "new": false,
    "sold": false,
    "promo": true,
    "oldPrice": 350,
    "promoValue": 19,
    "wish": false,
    "quantite": 0
  }
], wishProductQuantite: 0, cart: [], cartProductQuantite:0,trash:[],viewed:false,viewedProduct:[]}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, products: action.payload };
    case ADD_TO:
      return { ...state, products: [...state.products], wishProductQuantite: state.wishProductQuantite + 1 };
    case ADD_WISH_PRODUCT:
      return { 
        ...state,
        products: state.products.map((pro) =>
          pro.id === action.payload ? { ...pro, wish: true } : pro
        ),
        wishProductQuantite: state.wishProductQuantite + 1,
      };
    case REMOVE_WISH_PRODUCT:
      return {
        ...state,
        products: state.products.map((pro) =>
          pro.id === action.payload ? { ...pro, wish: false } : pro
        ),wishProductQuantite: state.wishProductQuantite - 1,
      };
      case ADD_TO_CART:
  const selectedProduct = state.products.find((pro) => pro.id === action.payload);
  const checkProduct = state.cart.find((pro) => pro.id === selectedProduct.id);

  if (checkProduct) {
    
    return {
      ...state,
      products: [...state.products],
      wishProductQuantite: state.wishProductQuantite,
      cart: state.cart.map((item) =>
        item.id === selectedProduct.id
          ? { ...item, quantite: item.quantite + selectedProduct.quantite }
          : item
      ),
      cartProductQuantite: state.cartProductQuantite + selectedProduct.quantite,
    };
  } else {

    return {
      ...state,
      products: [...state.products],
      wishProductQuantite: state.wishProductQuantite,
      cart: [...state.cart, selectedProduct],
      cartProductQuantite: state.cartProductQuantite + 1,
    };
  }

        case REMOVE_CART:
  const removedProduct = state.cart.find((product) => product.id === action.payload);
  if (!removedProduct) {
    return state;
  }

  return {
    ...state,
    products: [...state.products],
    wishProductQuantite: state.wishProductQuantite,
    cart: state.cart.filter((product) => product.id !== action.payload),
    cartProductQuantite: state.cartProductQuantite - 1,
    trash: [...state.trash, removedProduct]
  };
          case ADD_QUANTITE:
  const updatedCart = state.cart.map((product) => {
    if (product.id === action.payload) {
      const updatedQuantite = (product.quantite || 0) + 1;

      return {
        ...product,
        quantite: updatedQuantite
      };
    }
    return product;
  });


  return {
    ...state,
    cart: updatedCart,
  };



  case MINUCE_QUANTITE:
  const updatedCartM = state.cart.map((product) => {
    if (product.id === action.payload) {
      const updatedQuantite = Math.max((product.quantite || 0) - 1, 0); 

      return {
        ...product,
        quantite: updatedQuantite
      };
    }
    return product;
  });


  return {
    ...state,
    cart: updatedCartM,
  };



  case REMOVE_TRASH:
    const selectedProduct_trash = state.trash.find((pro) => pro.id === action.payload);
    return {
        ...state,
        trash: state.trash.filter(function(product) {
            return product.id !== action.payload;
        }),
        cart: [...state.cart, selectedProduct_trash],
        cartProductQuantite: state.cartProductQuantite + 1
    };

    case VIEW_PRODUCT:
  return {
    ...state,
    viewed: true,
    viewedProduct: [action.payload],
  };
  case HIDE_VIEW:
  return {
    ...state,
    viewed: false,
    viewedProduct: [],
  };
  case ADD_SINGLE_QUANTITE:
  return {
    ...state,
    products: state.products.map(function (pro) {
      if (pro.id === action.payload) {
        return {
          ...pro,
          quantite: pro.quantite + 1,
        };
      }
      return pro;
    }),
    viewedProduct: state.viewedProduct.map(function (pro) {
      return {
        ...pro,
        quantite: pro.quantite + 1
      };
    }),
  };


  case MINUCE_SINGLE_QUANTITE:
  return {
    ...state,
    products: state.products.map(function (pro) {
      if (pro.id === action.payload) {
        return {
          ...pro,
          quantite: pro.quantite - 1,
        };
      }
      return pro;
    }),
    viewedProduct: state.viewedProduct.map(function (pro) {
      return {
        ...pro,
        quantite: pro.quantite - 1
      };
    }),
  };


    default:
      return state;
  }
};

export default ShopReducer;
