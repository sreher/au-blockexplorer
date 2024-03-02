import React, { useState, useEffect } from 'react';
import {formatHashTitle, getBlock} from '../lib/utils'
import { Card } from 'antd';
import {Utils} from "alchemy-sdk";
import {Link, useParams} from "react-router-dom";

function BlockItem() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getBlock(id);
                console.log("Id : ", id);
                console.log("Block: ", data);
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
    const cardTitle = "Block: " + id.slice(0, 6) + "..." +  id.slice(id.length - 4);
    return (
        <div>
            <Card title={cardTitle}  loading={loading} extra={<a
                href={`https://etherscan.io/block/${data?.number}`}>Etherscan</a>}
                  style={{textAlign: 'left', marginTop: '45px', marginBottom: '45px'}}>
                hash: {data.hash} <br/>
                parentHash: {data.parentHash} <br/>
                number:     {data.number} <br/>
                timestamp:  {data.timestamp} <br/>
                nonce:      {data.nonce}<br/>
                miner:      {formatHashTitle(data.miner)}<br/>
                gasLimit:           { data.gasLimit !== undefined ? Utils.formatEther(data.gasLimit.toNumber(), 'wei') : '' } Gwei <br/>
                gasUsed:            { data.gasUsed !== undefined ? Utils.formatEther(data.gasUsed.toNumber(), 'wei') : '' } Gwei <br/>
                baseFeePerGas:      { data.baseFeePerGas !== undefined ? Utils.formatEther(data.baseFeePerGas.toNumber(), 'Gwei') : '' } Gwei <br/>
                transactions ({data.transactions.length}):
                <ol>
                    {data.transactions.map(item => {
                        return <li><Link to={`/transaction/${item}`}>{item}</Link></li>;
                    })}
                </ol>
            </Card>
        </div>
    );
}

export default BlockItem;