const INITIAL_STATE = {
    crypto: [],
    error: null,
    coin: {
        details: null,
        selected: 'hour',
        hour: [],
        day: [],
        week: [],
        month: [],
        sixMonths: [],
        year: []
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CRYPTO_INIT':
            return {
                ...state,
                crypto: action.payload
            };
        case 'CRYPTO_UPDATE':
            return {
                ...state,
                crypto: state.crypto.some(
                    coin => coin.name === action.payload.FROMSYMBOL
                )
                    ? state.crypto.map(coin =>
                          coin.name === action.payload.FROMSYMBOL
                              ? { ...coin, ...action.payload }
                              : coin
                      )
                    : [...state.crypto, action.payload]
            };
        case 'CRYPTO_DETAILS':
            return {
                ...state,
                coin: {
                    ...state.coin,
                    details: action.payload
                }
            };
        case 'CRYPTO_DETAILS_HISTORY':
            return {
                ...state,
                coin: {
                    ...state.coin,
                    ...action.payload
                }
            };
        case 'CRYPTO_HISTORY_SELECTED':
            return {
                ...state,
                coin: {
                    ...state.coin,
                    selected: action.payload
                }
            };
        case 'CLEAR_COIN_DETAILS':
            return {
                ...state,
                coin: INITIAL_STATE.coin
            };
        case 'CRYPTO_API_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
