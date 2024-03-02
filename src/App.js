import './App.css';
import React, {useEffect, useState} from "react";
import LastTransactionList from "./components/LastTransactionList"
import {Layout, Col, Row} from 'antd';
import LastBlockList from "./components/LastBlockList";
import TransactionItem from "./components/TransactionItem";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import BlockItem from "./components/BlockItem";
import AccountItem from "./components/AccountItem";

const {Header, Footer, Sider, Content} = Layout;

const headerStyle = {
    textAlign: 'center',
    color: '#333',
    height: 200,
    backgroundColor: '#E2E8F0',
};
const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#F6F8FA',
};
const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#E2E8F0',
};
const footerStyle = {
    textAlign: 'center',
    color: '#888',
    backgroundColor: '#E2E8F0',
};
const layoutStyle = {
    overflow: 'hidden',
};

const items: MenuProps['items'] = [
    {
        label: (
            <Link to={"/"}>Startseite</Link>
        ),
        key: 'home',
        icon: <MailOutlined/>,
    },
    {
        label: (
            <Link to={"/block"}>Block</Link>
        ),
        key: 'block',
        icon: <AppstoreOutlined/>,
    },
    {
        label: (
            <Link to={"/transaction"}>Transactions</Link>
        ),
        key: 'transaction',

        icon: <SettingOutlined/>,
    },
];

const App: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Router>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}><h1>Block Explorer</h1>
                    <Menu onClick={onClick} selectedKeys={[current]}
                          mode="horizontal" items={items}/>;</Header>
                <Content style={contentStyle}>
                    <Switch>
                        <Route exact path="/">
                            <Row>
                                <Col span={12}><LastBlockList/></Col>
                                <Col span={12}><LastTransactionList/></Col>
                            </Row>
                        </Route>
                        <Route exact path="/block">
                            <Row>
                                <Col span={12} offset={6}><LastBlockList/></Col>
                            </Row>
                        </Route>
                        <Route exact path="/transaction">
                            <Row>
                                <Col span={12} offset={6}><LastTransactionList/></Col>
                            </Row>
                        </Route>
                        <Route path="/transaction/:id">
                            <Row>
                                <Col span={12} offset={6}><TransactionItem/></Col>
                            </Row>
                        </Route>
                        <Route path="/block/:id">
                            <Row>
                                <Col span={12} offset={6}><BlockItem/></Col>
                            </Row>
                        </Route>
                        <Route path="/address/:direction/:block/:address">
                            <Row>
                                <Col span={24}><AccountItem/></Col>
                            </Row>
                        </Route>
                    </Switch>
                </Content>
                <Footer style={footerStyle}>Ethereum Block Explorer 2024</Footer>
            </Layout>
        </Router>
    );
};
export default App;
