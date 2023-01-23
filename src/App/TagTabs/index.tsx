import React from "react";
import type {TabsProps} from "antd";
import {Button, Collapse, Space, Tabs} from "antd";
import {staticTag, tags3DimArray, tagTextDisplay} from "../../tags";
import store from "../../store";
import {isSwf} from "../../features/sfwMode";

const {Panel} = Collapse;

interface tagButtonProps {
    tag:staticTag,
}

const pushTag = (tag:staticTag) =>{
    return ()=> {
        store.dispatch({type: 'tags/pushTag', payload: tag})
    }
}

const TagButton= function (props:tagButtonProps) {
    const [tagText,setTagText] = React.useState(tagTextDisplay(props.tag,store.getState().language));
    store.subscribe(()=>{
        setTagText(tagTextDisplay(props.tag,store.getState().language))
    })
    return (
        <Button onClick={pushTag(props.tag)}>{tagText}</Button>
    )
}

const TagsComponentsGenerate = function () {
    const tabItems:TabsProps['items'] = []
    const sfw = store.getState().sfwMode;
    for (const tags2DimArray of tags3DimArray) {
        //这次for循环是为了生成tabItems
        if (!isSwf(tags2DimArray[0][0]) && sfw) {
            //如果是sfw模式，且这列tag是nsfw的，就跳过
            continue;
        }
        let tabItemComponents = []
        for (const tags1DimArray of tags2DimArray) {
            //这次for循环是为了生成Collapse.Panel
            if (!isSwf(tags1DimArray[0]) && sfw) {
                //如果是sfw模式，且这列tag是nsfw的，就跳过
                continue;
            }
            const tagButtons = tags1DimArray.map((tag:staticTag,index)=>{
                return <TagButton tag={tag} key={index}/>
            })
            tabItemComponents.push(
                <Panel header={tags1DimArray[0].h2} key={tags1DimArray[0].h2}>
                    <Space direction='horizontal' size={[15,10]} wrap>
                        {tagButtons}
                    </Space>
                </Panel>
            )
        }
        tabItems.push({
            key: tags2DimArray[0][0].h1,
            label: tags2DimArray[0][0].h1,
            children: <Collapse defaultActiveKey={tags2DimArray[0][0].h2}>{tabItemComponents}</Collapse>
        })
    }
    return tabItems
}

const TagTabs = function () {
    const [,setSfwMode] = React.useState(store.getState().sfwMode);
    let tabItems:TabsProps['items'] = TagsComponentsGenerate();
    store.subscribe(()=>{
        tabItems = TagsComponentsGenerate();
        setSfwMode(store.getState().sfwMode)
    })
    return <Tabs defaultActiveKey={tags3DimArray[0][0][0].h1} items={tabItems}/>
}

export default TagTabs;