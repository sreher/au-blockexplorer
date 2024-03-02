import React, { useState, useEffect } from 'react';
import {getLastBlock, getTransaction} from '../lib/utils'
import {Card, Flex, Space} from 'antd';
import {Utils} from "alchemy-sdk";
import {Link, useParams} from "react-router-dom";

function TransactionItem() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getTransaction(id);
                console.log("Id : ", id);
                console.log("Transaction: ", data);
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
    const cardTitle = "Transaction: " + id.slice(0, 6) + "..." +  id.slice(id.length - 4);
    return (
        <Space direction="vertical" size="middle" style={{ paddingBottom: "45px" }}>
        <Flex gap="middle" wrap="wrap" justify={'space-around'}>
            <Card title={cardTitle} loading={loading} extra={<a
                href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>}
                  style={{textAlign: 'left'}}>
                hash: {data.hash} <br/>
                blockHash:      <Link to={`/block/${data.blockHash}`}>{data.blockHash}</Link><br/>
                blockNumber:    <Link to={`/block/${data.blockHash}`}>{data.blockNumber}</Link><br/>
                nonce:          {data.nonce}<br/>
                from:           <Link to={`/address/from/${data.blockHash}/${data.from}`}>{data.from}</Link><br/>
                to:             <Link to={`/address/to/${data.blockHash}/${data.to}`}>{data.to}</Link><br/>
                value:          { data.value !== undefined ? Utils.formatEther(data.value, 'Ether') : '' } Gwei <br/>
                confirmations:  {data.confirmations} <br/>
                chainId:        {data.chainId} <br/>
                gasLimit:       { data.gasLimit !== undefined ? Utils.formatEther(data.gasLimit.toNumber(), 'wei') : '' } Gwei <br/>
                gasPrice:       { data.gasPrice !== undefined ? Utils.formatEther(data.gasPrice.toNumber(), 'wei') : '' } Gwei <br/>
                maxFeePerGas:               { data.maxFeePerGas !== undefined ? Utils.formatEther(data.maxFeePerGas.toNumber(), 'Gwei') : '' } Gwei <br/>
                maxPriorityFeePerGas:       { data.maxPriorityFeePerGas !== undefined ? Utils.formatEther(data.maxPriorityFeePerGas, 'Gwei') : '' } Gwei <br/>
            </Card>
        </Flex>
        </Space>
    );
}

export default TransactionItem;