import React from 'react';
import { configure, shallow } from 'enzyme';
import { StaticRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
import Coin from './';
configure({ adapter: new Adapter() });

describe('Coin component', () => {
    it('renders coin screen without crashing', () => {
        const match = { params: { coin: 'LTC' } };
        const details = {
            IMAGEURL: 'https://www.cryptocompare.com/media/19633/btc.png',
            PRICE: '£ 8,487.97',
            LASTTRADEID: '7020975',
            VOLUME24HOUR: 'Ƀ 336.17',
            VOLUME24HOURTO: '£ 2,852,913.4',
            HIGHHOUR: '£ 8,511.49',
            LOWHOUR: '£ 8,464.04',
            HIGH24HOUR: '£ 8,624.47',
            LOW24HOUR: '£ 8,335.43'
        };
        const coin = shallow(
            <StaticRouter>
                <Coin match={match} details={details} />
            </StaticRouter>
        );
        expect(coin).toMatchSnapshot();
    });
});
