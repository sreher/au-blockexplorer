import React, { useState, useEffect } from 'react';
import {formatHashTitle, getLastTransactions} from '../lib/utils'
import {Flex, List, Skeleton} from 'antd';
import {Utils} from "alchemy-sdk";
import {Link} from "react-router-dom";

function LastTransactionList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getLastTransactions(10);
                // console.log("LastTransactionList: ", data);
                setData(data);
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

    return (
        <Flex gap="middle" vertical>
            <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="vertical"
                dataSource={data}
                size="middle"
                bordered="false"
                header={<h2>List of recent transactions</h2>}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Link to={`/transaction/${item.hash}`}>More Transaction Details </Link>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={<Link to={`/transaction/${item.hash}`}>{formatHashTitle(item.hash)}</Link>}
                            />
                            <div style={{textAlign:`left`}}>
                                hash:           <Link to={`/transaction/${item.hash}`}>{formatHashTitle(item.hash)}</Link><br/>
                                blockHash:      <Link to={`/block/${item.blockHash}`}>{formatHashTitle(item.blockHash)}</Link> <br/>
                                blockNumber:    <Link to={`/block/${item.blockHash}`}>{item.blockNumber}</Link><br/>
                                nonce:          {item.nonce}<br/>
                                {/*confirmations:  {item.confirmations} <br/>*/}
                                {/*chainId:        {item.chainId} <br/>*/}
                                from:           <Link to={`/address/from/${item.blockHash}/${item.from}`}>{item.from}</Link><br/>
                                to:             <Link to={`/address/to/${item.blockHash}/${item.to}`}>{item.to}</Link><br/>
                                {/*from:           {formatHashTitle(item.from)} <br/>*/}
                                {/*to:             {formatHashTitle(item.to)} <br/>*/}
                                {/*gasLimit:       { item.gasLimit !== undefined ? Utils.formatEther(item.gasLimit.toNumber(), 'wei') : '' } Gwei <br/>*/}
                                {/*gasPrice:       { item.gasPrice !== undefined ? Utils.formatEther(item.gasPrice.toNumber(), 'wei') : '' } Gwei <br/>*/}
                                {/*maxFeePerGas:               { item.maxFeePerGas !== undefined ? Utils.formatEther(item.maxFeePerGas.toNumber(), 'Gwei') : '' } Gwei <br/>*/}
                                {/*maxPriorityFeePerGas:       { item.maxPriorityFeePerGas !== undefined ? Utils.formatEther(item.maxPriorityFeePerGas, 'Gwei') : '' } Gwei <br/>*/}
                                value:                      { item.value !== undefined ? Utils.formatEther(item.value, 'Ether') : '' } Gwei <br/>
                            </div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </Flex>
    );
}

export default LastTransactionList;