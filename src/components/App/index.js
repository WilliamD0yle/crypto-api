import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTopCryptoDetails, clearCoinDetails } from '../../actions/';
import './App.css';

const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export const App = props => {
    const { crypto } = props;
    const prevCryptoRef = usePrevious({ crypto });

    useEffect(() => {
        if (crypto.length === 0) {
            props.getTopCryptoDetails();
        }

        if (props.details) {
            props.clearCoinDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    const numberFormatter = num => {
        return parseFloat(num).toFixed(2);
    };

    const renderTableHeader = () => {
        const headers = [
            'Name',
            'Price',
            'last Update',
            'last Trade Volumne',
            'Trade id',
            'Change 24',
            '24hr High',
            'Market Traded'
        ];

        return headers.map((key, i) => (
            <th className="crypto-table-header" key={i}>
                <h1>{key}</h1>
            </th>
        ));
    };

    const renderTableBody = (coin, key) => {
        let style, oldCoin;
        // check that the previous exists can be undefined
        if (prevCryptoRef) {
            oldCoin = prevCryptoRef.crypto.find(
                oldCoin => oldCoin.FROMSYMBOL === coin.FROMSYMBOL
            );
        }

        if (oldCoin && oldCoin.FROMSYMBOL === coin.FROMSYMBOL) {
            if (oldCoin.PRICE > coin.PRICE) style = 'increase';
            if (oldCoin.PRICE < coin.PRICE) style = 'decrease';
        }

        return (
            <tr
                className="crypto-table-row"
                key={key}
                onClick={() => props.history.push(`/crypto/${coin.name}`)}
            >
                <td className="coin-name">
                    <img src={coin.image} alt={coin.fullName} />
                    {coin.FROMSYMBOL}
                </td>
                <td className={style}>
                    {coin.PRICE ? `£${numberFormatter(coin.PRICE)}` : 'unknown'}
                </td>
                <td>
                    {coin.LASTUPDATE
                        ? moment.unix(coin.LASTUPDATE).fromNow()
                        : 'unknown'}
                </td>
                <td>{coin.LASTVOLUME ? `${coin.LASTVOLUME}` : 'unknown'}</td>
                <td>{coin.LASTTRADEID || 'unknown'}</td>
                <td>{coin.change24Hr ? coin.change24Hr : 'unknown'}</td>
                <td>{`£${coin.HIGH24HOUR}` || 'unknown'}</td>
                <td>{coin.LASTMARKET || 'unknwon'}</td>
            </tr>
        );
    };

    return (
        <div className="App">
            <h1>Live Crypto Exchange</h1>
            <p>
                A simple crypto price tracking web app built on react, redux
                using the cyrpto compare api.
            </p>
            <table className="crypto-table">
                <tbody className="crypto-table-body">
                    <tr className="crypto-table-row">
                        {crypto ? renderTableHeader() : null}
                    </tr>
                    {crypto
                        ? crypto.map((coin, i) => renderTableBody(coin, i))
                        : null}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = state => ({
    crypto: state.crypto.crypto,
    details: state.crypto.coin.details
});

const mapDispatchToProps = dispatch => ({
    getTopCryptoDetails: () => dispatch(getTopCryptoDetails()),
    clearCoinDetails: () => dispatch(clearCoinDetails())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
