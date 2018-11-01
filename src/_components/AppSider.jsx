import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Dropdown, Icon, Breadcrumb } from 'antd';
import { ProfileDropdownMenu } from './ProfileDropdownMenu';
import { userActions } from '../_actions';

const { Sider } = Layout;
const { SubMenu } = Menu;

class AppSider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        //load certs dyamically
        // load menu icons dyamically

        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['certs']}
                    style={{ height: '100%' }}
                >
                    <SubMenu key="certs" title={<span><Icon type="user" />Certificate</span>}>
                        <Menu.Item key="1"><Link to="/compliance/search">Search</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="admin" title={<span><Icon type="laptop" />Admin</span>}>
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="circulars" title={<span><Icon type="notification" />Circulars</span>}>
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

function mapStateToProps(state) {
    // what ever details we get here from state can be accessible in 
    // html template.
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedAppSider = connect(mapStateToProps)(AppSider);
export { connectedAppSider as AppSider };