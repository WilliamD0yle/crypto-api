import React, { useState } from 'react';
import moment from 'moment';
import {
    XYPlot,
    XAxis,
    YAxis,
    Hint,
    AreaSeries,
    VerticalBarSeries,
    LineMarkSeries,
    VerticalGridLines,
    HorizontalGridLines
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

const axisStyle = {
    ticks: {
        fontSize: '14px',
        color: '#333'
    },
    title: {
        fontSize: '16px',
        color: '#333'
    }
};

const Graphs = props => {
    const [hoover, updateHoover] = useState(null);

    return (
        <div className="App">
            <XYPlot height={300} width={1000}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis
                    title={props.xTitle}
                    tickFormat={time => `${moment.unix(time).fromNow()}`}
                    tickTotal={8}
                    style={axisStyle}
                    opacity={0.8}
                />
                <YAxis title={props.yTitle} tickFormat={value => `£${value}`} />
                {hoover ? (
                    <Hint value={hoover}>
                        <div>£{hoover.y}</div>
                    </Hint>
                ) : null}
                {props.type === 'line' ? (
                    <LineMarkSeries
                        animation={'wobbly'}
                        onValueMouseOver={value => updateHoover(value)}
                        onValueMouseOut={() => updateHoover(null)}
                        markStyle={{ stroke: 'white' }}
                        data={props.data}
                    />
                ) : props.type === 'area' ? (
                    <AreaSeries
                        animation={'wobbly'}
                        className="area-series"
                        curve="curveNatural"
                        data={props.data}
                    />
                ) : props.type === 'bar' ? (
                    <VerticalBarSeries
                        animation={'wobbly'}
                        className="bar-series"
                        data={props.data}
                    />
                ) : null}
            </XYPlot>
        </div>
    );
};

export default Graphs;
