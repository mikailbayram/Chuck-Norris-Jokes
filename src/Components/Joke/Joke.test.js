import React from 'react';
import ReactDOM from 'react-dom';
import Joke from './Joke';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {Map,List} from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

configure({ adapter: new Adapter() });

describe('<Joke />', () => {
   
    let joke;
    let wrapper;
    beforeAll(()=>{
        joke = Map({
            category:List(["Dev"])
        })
        wrapper = shallow(<Joke joke={joke} />);
    })
    it('renders without crashing',()=>{
        expect(wrapper.state().open).toEqual(false);
    })
    it('runs the close method',()=>{
        wrapper.instance().close();
        expect(wrapper.state().open).toEqual(false);
    })
    it('changes state on click', () => {
        const card = wrapper.find("Card").at(0);
        card.simulate("click");
        expect(wrapper.state().open).toEqual(true);
    });
    it('renders branches', ()=>{
        wrapper = shallow(<Joke joke={joke} isHome={true} text={"some text"}/>);
        expect(wrapper.state().open).toEqual(false);
    })
    it('renders correctly', () => {
        const tree = renderer
          .create(
          <MuiThemeProvider>
              <Joke joke={joke} />
          </MuiThemeProvider>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
});
