import React, {useContext, useEffect, useState} from 'react'
import Context from '../../context'
import Thread from '../thread'
import Api from '../../api'


const ThreadList = () => {
    const [threadList, setThreadList] = useState([]);

    useEffect(() => {
        const getLatestThreads = async () => {
            const threads = await Api.Thread.getLatest();
            setThreadList(threads.data.result);
        }

        getLatestThreads();
    }, []);

    return (
        <div style={{marginTop: '-5px'}}>
            {
                threadList.map((t, index) => {
                    return (
                        <Thread key={index} title_ES={t.title_es} title_PT={t.title_pt} username={t.user} posts_nb={t.posts_number} id={t.ID} />
                    )
                })
            }
        </div>
    )
}

export default ThreadList