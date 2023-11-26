import React, {useContext, useEffect, useState} from 'react'
import Context from '../../context'
import Thread from '../thread'
import Api from '../../api'


const ThreadList_Latest = () => {
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
                    if (index < 8) {
                        return (
                            <Thread key={index} desc_ES={t.Posts[0].Desc_ES} desc_PT={t.Posts[0].Desc_PT} title_ES={t.title_es} title_PT={t.title_pt} username={t.user} posts_nb={t.posts_number} id={t.ID} />
                        )
                    }
                })
            }
        </div>
    )
}

export default ThreadList_Latest