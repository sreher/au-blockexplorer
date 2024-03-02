import React, { useState, useEffect } from 'react';
import {
    formatHashTitle,
    formatTransferValue,
    getBalance,
    getBlock,
    getTransactionFromAdreess,
    getTransactionToAdreess
} from '../lib/utils'
import {Card, Col, Descriptions, Flex, Row, Space} from 'antd';
import {Link, useParams} from "react-router-dom";
import {Utils} from "alchemy-sdk";
import {DescriptionsProps} from "antd";

function AccountItem() {
    const [data, setData] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { direction, block, address } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                let _data = null;
                let _balance = null;
                if (direction === "from") {
                    _data = await getTransactionFromAdreess(block, address);
                } else if (direction === "to"){
                    _data = await getTransactionToAdreess(block, address);
                }
                _balance = await getBalance(address);
                console.log("Block : ", block);
                console.log("Balance : ", _balance);
                console.log("Address : ", address);
                setData(_data);
                setBalance(_balance);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div style={{ color: "black"}}>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Adresse',
            children: <p>{address}</p>,
        },
        {
            key: '2',
            label: 'Balance',
            children: <p>{balance !== undefined ? Utils.formatEther(balance, 'Gwei') : ''} Gwei</p>,
        },
        {
            key: '3',
            label: 'Overview Page',
            children: <p><Link to={"/"}>Link to Overview Page </Link></p>,
            span: 2,
        }
    ];

    return (
        <div>
            <Row justify={'space-around'} style={{ paddingTop: '45px', paddingBottom: '0'}}>
                <Col>
                    <Descriptions title="Account Infos" bordered={true} column="2" items={items} />;
                </Col>
            </Row>
            <Row justify={'space-around'}>
                <Col>
                    <h2 style={{ color: "black"}}>Transactions </h2>
                </Col>
            </Row>
            <Row  style={{ paddingBottom: '45px'}}>
                <Flex gap="middle" wrap="wrap" justify={'space-around'}>
                    {data.transfers.map(item => {
                        // console.log("value ", item);
                        return <Card title={"Transfers: " + item.hash.slice(0, 6) + "..." +  item.hash.slice(item.hash.length - 4)} style={{textAlign: 'left', width: 400}}>
                                hash:       <Link to={`/transaction/${item.hash}`}>{formatHashTitle(item.hash)}</Link><br/>
                                blockNum:   <Link to={`/block/${item.blockNum}`}>{item.blockNum}</Link> <br/>
                                from:       <Link to={`/address/from/${data.blockHash}/${data.from}`}>{formatHashTitle(item.from)}</Link><br/>
                                to:         <Link to={`/address/to/${data.blockHash}/${data.to}`}>{formatHashTitle(item.to)}</Link><br/>
                                {/*from:    {formatHashTitle(item.from)}<br/>*/}
                                {/*to:      {formatHashTitle(item.to)}<br/>*/}
                                category:   {item.category} <br/>
                                value:      {formatTransferValue(item.value, item.asset)} {item.asset}<br/>
                                tokenId:    {formatHashTitle(item.tokenId)} <br/>
                                uniqueId:   {formatHashTitle(item.uniqueId)}<br/>
                                erc721TokenId: {formatHashTitle(item.erc721TokenId)} <br/>
                                erc1155Metaitem: {item.erc1155Metaitem}<br/>
                            </Card>
                        })
                    }
                </Flex>
            </Row>
        </div>
    );
}

export default AccountItem;