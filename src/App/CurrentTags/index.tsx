import React from "react";
import {Badge, Button, Space} from "antd";
import store from "../../store";
import {tag} from "../../features/tagsManage";
import {tagTextDisplay} from "../../tags";

interface currentTagProps {
    tag: tag,
    index: number,
    weight: -3 | -2 | -1 | 0 | 1 | 2 | 3,
}

function CurrentTag(props: currentTagProps) {
    const {tag,index,weight} = props
    const [tagText, setTagText] = React.useState(tagTextDisplay(tag, store.getState().language));
    const edit = () => {
        return () => {
            switch (store.getState().currentEditTool) {
                case 'remove':
                    store.dispatch({type: 'tags/deleteTag', payload: index})
                    break;
                case 'weightUp':
                    store.dispatch({type: 'tags/upWeight', payload: index})
                    break;
                case 'weightDown':
                    store.dispatch({type: 'tags/downWeight', payload: index})
                    break;
            }
        }
    }
    store.subscribe(() => {
        setTagText(tagTextDisplay(tag, store.getState().language))
    })
    if (weight === 0) {
        return <Button onClick={edit()}>{tagText}</Button>
    } else {
        return (
            <Badge count={weight}>
                <Button onClick={edit()}>{tagText}</Button>
            </Badge>
        )
    }
}

export default function CurrentTags () {
    const [, setTags] = React.useState(store.getState().currentTags);

    store.subscribe(() => {
        setTags(store.getState().currentTags)
    })
    return (
        <Space size={[20, 10]} wrap>
            {store.getState().currentTags.map((tag: tag,index) => {
                return (
                    <CurrentTag tag={tag} index={index} key={tag.en+Math.random()} weight={tag.weight}/>
                )
            })}
        </Space>
    )
}