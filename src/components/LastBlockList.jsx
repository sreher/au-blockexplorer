import React, { useState, useEffect } from 'react';
import {formatHashTitle, getLastBlock} from '../lib/utils'
import {Flex, List, Skeleton} from 'antd';
import {Utils} from "alchemy-sdk";
import {Link} from "react-router-dom";
import {SettingOutlined} from "@ant-design/icons";

function LastBlockList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getLastBlock(10);
                console.log("LastBlockList: ", data);
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
            bordered="true"
            header={<h2>List of the last blocks</h2>}
            renderItem={(item) => (
                <List.Item
                    actions={[<Link to={`/block/${item.hash}`}>More Block Details</Link>]}
                >
                    <Skeleton avatar title={false} loading={loading} active>
                        <List.Item.Meta
                            title={<Link to={`/block/${item.hash}`}>{formatHashTitle(item.hash)}</Link>}
                        />
                        <div style={{textAlign: `left`}}>
                            hash: <Link to={`/block/${item.hash}`}>{formatHashTitle(item.hash)}</Link><br/>
                            parentHash: {formatHashTitle(item.parentHash)} <br/>
                            nonce: {item.nonce}<br/>
                            number: {item.number} <br/>
                            timestamp: {item.timestamp} <br/>
                            miner: { formatHashTitle(item.miner)}<br/>
                            {/*gasLimit: {item.gasLimit !== undefined ? Utils.formatEther(item.gasLimit.toNumber(), 'wei') : ''} Gwei <br/>*/}
                            {/*gasUsed: {item.gasUsed !== undefined ? Utils.formatEther(item.gasUsed.toNumber(), 'wei') : ''} Gwei <br/>*/}
                            {/*baseFeePerGas: {item.baseFeePerGas !== undefined ? Utils.formatEther(item.baseFeePerGas.toNumber(), 'Gwei') : ''} Gwei <br/>*/}
                        </div>
                    </Skeleton>
                </List.Item>
            )}
        />
        </Flex>
    );
}

export default LastBlockList;