import reducer from './crypto';
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

describe('characters reducer', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('adds the initial crypto data to the reducer', () => {
        const array = [
            {
                name: 'BTC',
                change24Hr: '£ -129.66',
                changeHr: '£ -0.36',
                CHANGEPCTDAY: '-1.00',
                symbol: 'Ƀ',
                high24hr: '£ 8,622.96',
                highHr: '£ 8,452.75',
                image: 'https://www.cryptocompare.com/media/19633/btc.png',
                lastTradeId: '7020774',
                low24hr: '£ 8,334.73',
                lowhr: '£ 8,424.03',
                marketCap: '£ 151.47 B'
            }
        ];
        expect(
            reducer(INITIAL_STATE, {
                type: 'CRYPTO_INIT',
                payload: array
            })
        ).toEqual({
            ...INITIAL_STATE,
            crypto: array
        });
    });

    it('update a single crypto details', () => {
        const initialArray = {
            crypto: [
                {
                    name: 'BTC',
                    change24Hr: '£ -129.66',
                    changeHr: '£ -0.36',
                    CHANGEPCTDAY: '-1.00',
                    symbol: 'Ƀ',
                    high24hr: '£ 8,622.96',
                    highHr: '£ 8,452.75',
                    image: 'https://www.cryptocompare.com/media/19633/btc.png',
                    lastTradeId: '7020774',
                    low24hr: '£ 8,334.73',
                    lowhr: '£ 8,424.03',
                    marketCap: '£ 151.47 B'
                }
            ]
        };
        const obj = {
            TYPE: '5',
            MARKET: 'CCCAGG',
            FROMSYMBOL: 'BTC',
            TOSYMBOL: 'GBP',
            FLAGS: '2',
            PRICE: 8444.75,
            LASTUPDATE: 1567978798,
            LASTVOLUME: 0.00238028,
            LASTVOLUMETO: 20.1009171356,
            LASTTRADEID: 7020775,
            VOLUMEHOUR: 315.4567130299996,
            VOLUMEHOURTO: 2677211.7499876264,
            VOLUME24HOUR: 324.2975041899999,
            VOLUME24HOURTO: 2752789.4971720013,
            OPENHOUR: 8536.05,
            HIGHHOUR: 8624.65,
            LOWHOUR: 8352.02,
            OPEN24HOUR: 8580.66,
            HIGH24HOUR: 8622.96,
            LOW24HOUR: 8334.73,
            LASTMARKET: 'Coinbase'
        };

        expect(
            reducer(INITIAL_STATE, {
                type: 'CRYPTO_UPDATE',
                payload: obj
            })
        ).toEqual({
            ...INITIAL_STATE,
            crypto: [obj]
        });
    });

    it('update a single crypto details', () => {
        const details = {
            FROMSYMBOL: 'Ƀ',
            TOSYMBOL: '£',
            MARKET: 'CryptoCompare Index',
            PRICE: '£ 8,474.91',
            LASTUPDATE: 'Just now',
            LASTVOLUME: 'Ƀ 0.005870',
            LASTVOLUMETO: '£ 49.75',
            LASTTRADEID: '7020836',
            VOLUMEDAY: 'Ƀ 320.96',
            VOLUMEDAYTO: '£ 2,723,737.4',
            VOLUME24HOUR: 'Ƀ 329.80',
            VOLUME24HOURTO: '£ 2,799,315.2',
            OPENDAY: '£ 8,536.05',
            HIGHDAY: '£ 8,624.65',
            LOWDAY: '£ 8,352.02'
        };
        expect(
            reducer(INITIAL_STATE, {
                type: 'CRYPTO_DETAILS',
                payload: details
            })
        ).toEqual({
            ...INITIAL_STATE,
            coin: {
                ...INITIAL_STATE.coin,
                details
            }
        });
    });

    it('update coin history details', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: 'CRYPTO_DETAILS_HISTORY',
                payload: {
                    hour: [
                        {
                            time: 1567976220,
                            open: 8442.91,
                            close: 8442.01
                        }
                    ]
                }
            })
        ).toEqual({
            ...INITIAL_STATE,
            coin: {
                ...INITIAL_STATE.coin,
                hour: [
                    {
                        time: 1567976220,
                        open: 8442.91,
                        close: 8442.01
                    }
                ]
            }
        });
    });

    it('update the selected graph type', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: 'CRYPTO_HISTORY_SELECTED',
                payload: 'day'
            })
        ).toEqual({
            ...INITIAL_STATE,
            coin: {
                ...INITIAL_STATE.coin,
                selected: 'day'
            }
        });
    });

    it('add an error message', () => {
        expect(
            reducer(INITIAL_STATE, {
                type: 'CRYPTO_API_ERROR',
                payload: 'Failed to do something'
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: 'Failed to do something'
        });
    });
});
