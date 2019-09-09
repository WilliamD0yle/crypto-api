import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './';

const crypto = [
    {
        name: 'BTC',
        change24Hr: '£ -119.95',
        changeHr: `£ 14.45`,
        CHANGEPCTDAY: '-1.13',
        symbol: 'Ƀ',
        high24hr: '£ 8,627.22',
        highHr: '£ 8,457.59',
        image: 'https://www.cryptocompare.com/media/19633/btc.png',
        lastTradeId: '7020582',
        low24hr: '£ 8,335.32',
        lowhr: '£ 8,424.01',
        marketCap: '£ 151.26 B',
        TYPE: '5',
        MARKET: 'CCCAGG',
        FROMSYMBOL: 'BTC',
        TOSYMBOL: 'GBP',
        FLAGS: '1',
        PRICE: 8445.27,
        LASTUPDATE: 1567976021,
        LASTVOLUME: 0.0237,
        LASTVOLUMETO: 200.061654,
        LASTTRADEID: 7020589,
        VOLUMEHOUR: 299.40298819999913,
        VOLUMEHOURTO: 2541716.3073104345,
        VOLUME24HOUR: 319.76936001,
        VOLUME24HOURTO: 2715759.0780022917,
        OPENHOUR: 8536.05,
        HIGHHOUR: 8624.65,
        LOWHOUR: 8352.02,
        OPEN24HOUR: 8559.22,
        HIGH24HOUR: 8627.22,
        LOW24HOUR: 8335.32,
        LASTMARKET: 'Coinbase'
    }
];

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <App crypto={crypto} getTopCryptoDetails={() => null} />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
