import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Graphs from '../Graphs';
import { getCoinDetails, getHistoricDetails } from '../../actions/';
import './Coin.css';
const mediaUrl = 'https://www.cryptocompare.com';

export const Coin = props => {
    let [data, updateData] = useState([]);
    let [selectedGraph, updateGraph] = useState('line');
    let coin = props.match.params.coin;

    useEffect(() => {
        if (!props.details) {
            props.getCoinDetails(coin);
        }

        let graphData = props[props.selected];
        if (graphData.length > 0) {
            let data = graphData.map((obj, i) => ({
                x: obj.time,
                y: obj.close
            }));
            updateData(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    const renderRow = items => {
        return (
            <div className="row-header">
                {items.map((item, i) => {
                    return (
                        <p key={i} className={item.name} onClick={item.onClick}>
                            {item.name}
                        </p>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="coin-container">
            <div className="coin-header">
                <h1>{props.match.params.coin} Breakdown</h1>
            </div>
            {renderRow([
                { name: 'Line', onClick: () => updateGraph('line') },
                { name: 'Bar', onClick: () => updateGraph('bar') },
                { name: 'Area', onClick: () => updateGraph('area') }
            ])}
            <Graphs
                type={selectedGraph}
                xTitle={'Hour'}
                yTitle={'Price'}
                data={data}
            />
            {renderRow([
                {
                    name: '1 hour',
                    onClick: () =>
                        props.getHistoricDetails(
                            'hour',
                            coin,
                            'histominute',
                            60
                        )
                },
                {
                    name: '24 hrs',
                    onClick: () =>
                        props.getHistoricDetails('day', coin, 'histohour', 24)
                },
                {
                    name: '1 week',
                    onClick: () =>
                        props.getHistoricDetails('week', coin, 'histohour', 168)
                },
                {
                    name: '1 month',
                    onClick: () =>
                        props.getHistoricDetails('month', coin, 'histoday', 30)
                },
                {
                    name: '6 months',
                    onClick: () =>
                        props.getHistoricDetails(
                            'sixMonths',
                            coin,
                            'histoday',
                            180
                        )
                },
                {
                    name: '1 year',
                    onClick: () =>
                        props.getHistoricDetails('year', coin, 'histoday', 365)
                }
            ])}

            {props.details ? (
                <div className="coin-details">
                    <div className="coin-column">
                        <img
                            src={`${mediaUrl}${props.details.IMAGEURL}`}
                            alt={coin}
                        />
                    </div>
                    <div className="coin-column">
                        <p>
                            1 {coin} = {props.details.PRICE}
                        </p>
                        <p>Last trade id: {props.details.LASTTRADEID}</p>
                        <p>
                            Vol Traded 24hrs: {props.details.VOLUME24HOUR} (
                            {props.details.VOLUME24HOURTO})
                        </p>
                        <p>High hr: {props.details.HIGHHOUR}</p>
                        <p>Low hr: {props.details.LOWHOUR}</p>
                        <p>High 24hr: {props.details.HIGH24HOUR}</p>
                        <p>Low 24hr: {props.details.LOW24HOUR}</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = state => ({
    details: state.crypto.coin.details,
    selected: state.crypto.coin.selected,
    hour: state.crypto.coin.hour,
    day: state.crypto.coin.day,
    week: state.crypto.coin.week,
    month: state.crypto.coin.month,
    sixMonths: state.crypto.coin.sixMonths,
    year: state.crypto.coin.year
});

const mapDispatchToProps = dispatch => ({
    getCoinDetails: coin => dispatch(getCoinDetails(coin)),
    getHistoricDetails: (key, coin, option, limit) =>
        dispatch(getHistoricDetails(key, coin, option, limit))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Coin);
