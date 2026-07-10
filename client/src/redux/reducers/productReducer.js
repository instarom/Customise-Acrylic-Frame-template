const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: Infinity
  }
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case 'FETCH_PRODUCTS_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SELECT_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    default:
      return state;
  }
};

export default productReducer;
