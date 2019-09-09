import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Graphs from './';
configure({ adapter: new Adapter() });

describe('Grpah component', () => {
    it('renders line graph without crashing', () => {
        const data = [{ x: 0, y: 1 }];
        const graph = shallow(<Graphs data={data} type="line" />);
        expect(graph).toMatchSnapshot();
    });

    it('renders area graph without crashing', () => {
        const div = document.createElement('div');
        const data = [{ x: 0, y: 1 }];
        const graph = shallow(<Graphs data={data} type="area" />);
        expect(graph).toMatchSnapshot();
    });

    it('renders bar graph without crashing', () => {
        const data = [{ x: 0, y: 1 }];
        const graph = shallow(<Graphs data={data} type="bar" />);
        expect(graph).toMatchSnapshot();
    });
});
