import axios from 'axios';
import io from 'socket.io-client';
import CCC from '../utilities/ccc-streamer-utilities';
const baseUrl = 'https://min-api.cryptocompare.com/data/';
const mainUrl = 'pricemultifull?fsyms=';
const selectedDetailsUrl = 'pricemultifull?fsyms=';
const mediaUrl = 'https://www.cryptocompare.com';
const cryptos = [
    'BTC',
    'ETH',
    'XRP',
    'BCH',
    'BNB',
    'LTC',
    'NEO',
    'EOS',
    'XEM',
    'XMR',
    'TRX',
    'USDT',
    'ETC',
    'ZEC',
    'XLM',
    'BTG'
];

const socket = io.connect('https://streamer.cryptocompare.com/');

const headers = {
    Authorization: `Apikey  ${process.env.REACT_APP_API_KEY}`
};

const apiRequest = async url => {
    return await axios
        .get(url, { headers })
        .then(response => response)
        .catch(error => error);
};

const parseCoinInfo = (name, coin) => {
    return {
        name,
        change24Hr: coin.CHANGE24HOUR,
        changeHr: coin.CHANGEHOUR,
        CHANGEPCTDAY: coin.CHANGEPCTDAY,
        symbol: coin.FROMSYMBOL,
        high24hr: coin.HIGH24HOUR,
        highHr: coin.HIGHHOUR,
        image: `${mediaUrl}${coin.IMAGEURL}`,
        lastTradeId: coin.LASTTRADEID,
        low24hr: coin.LOW24HOUR,
        lowhr: coin.LOWHOUR,
        marketCap: coin.MKTCAP
    };
};

export const getTopCryptoDetails = () => async dispatch => {
    let results = await apiRequest(
        `${baseUrl}${mainUrl}${cryptos.join()}&tsyms=GBP`
    );
    const cyrptoSubscriptions = cryptos.map(coin => `5~CCCAGG~${coin}~GBP`);

    if (results.data.Data) {
        dispatch({
            type: 'CRYPTO_INIT_ERROR',
            payload: results.data.Data.message
        });
    }

    let coins = [];
    for (let key in results.data.DISPLAY) {
        coins.push(parseCoinInfo(key, results.data.DISPLAY[key].GBP));
    }

    dispatch({
        type: 'CRYPTO_INIT',
        payload: coins
    });

    socket.emit('SubAdd', { subs: cyrptoSubscriptions });
    socket.on('m', message => {
        const messageType = message.substring(0, message.indexOf('~'));

        if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
            let coin = CCC.CURRENT.unpack(message);
            // ignore coins with no price data
            if (coin.PRICE) {
                dispatch({
                    type: 'CRYPTO_UPDATE',
                    payload: coin
                });
            }
        }
    });
};

export const getCoinDetails = coin => async dispatch => {
    const detailsUrl = `${baseUrl}${selectedDetailsUrl}${coin}&tsyms=GBP`;
    let detailsResults = await apiRequest(detailsUrl);
    detailsResults = detailsResults.data.DISPLAY[coin].GBP;

    dispatch({
        type: 'CRYPTO_DETAILS',
        payload: detailsResults
    });

    const dailyUrl = `${baseUrl}histominute?fsym=${coin}&tsym=GBP&limit=60`;
    let hourlyResults = await apiRequest(dailyUrl);
    hourlyResults = hourlyResults.data.Data.map(obj => ({
        time: obj.time,
        open: obj.open,
        close: obj.close
    }));

    dispatch({
        type: 'CRYPTO_DETAILS_HISTORY',
        payload: {
            hour: hourlyResults
        }
    });
};

export const getHistoricDetails = (
    key,
    coin,
    option,
    limit
) => async dispatch => {
    dispatch({
        type: 'CRYPTO_HISTORY_SELECTED',
        payload: key
    });

    const url = `${baseUrl}${option}?fsym=${coin}&tsym=GBP&limit=${limit}`;
    let results = await apiRequest(url);
    results = results.data.Data.map(obj => ({
        time: obj.time,
        open: obj.open,
        close: obj.close
    }));

    dispatch({
        type: 'CRYPTO_DETAILS_HISTORY',
        payload: {
            [key]: results
        }
    });
};

export const clearCoinDetails = () => async dispatch => {
    dispatch({
        type: 'CLEAR_COIN_DETAILS'
    });
};
