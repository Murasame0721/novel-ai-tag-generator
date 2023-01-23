import React from 'react';
import {
    Divider,
    Space,
    Typography,
    Radio,
    Button,
    Input,
    Switch,
    Tooltip, Popconfirm
} from 'antd';
import type {RadioChangeEvent} from 'antd';
import './App.css';
import tags from '../tags';
import TagTabs from "./TagTabs";
import CurrentTags from "./CurrentTags";
import store from "../store";
import {getResult} from "../features/resultGenerator";

const {Title, Text} = Typography;

const rootTagClass: string[] = []
for (const tagsKey in tags) {
    rootTagClass.push(tagsKey)
}

const emptyTag = function (){
    store.dispatch({type: 'tags/empty'})
}

const CustomTag = function (){
    const [tagText, setTagText] = React.useState('');
    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagText(e.target.value)
    }
    const pushCustomTag = () => {
        store.dispatch({type:'tags/pushTag',payload:{en:tagText,zh:'',h1:'自定义Tag',h2:'自定义Tag'}})
        setTagText('')
    }
    return (
        <Space direction='horizontal'>
            <Input placeholder='自定义标签' allowClear maxLength={40} onChange={inputOnChange} value={tagText} onPressEnter={pushCustomTag}/>
            <Button type='primary' onClick={pushCustomTag}>提交</Button>
        </Space>
    )
}

const Result = function (){
    const [result, renewResult] = React.useState(getResult)
    store.subscribe(() => {
        renewResult(getResult())
    })
    return (
        <Input.TextArea autoSize={{minRows: 2, maxRows: 5}} readOnly={true} value={result}/>
    )
}

const switchUpWeightSymbol = (checked:boolean) => {
    if (checked) {
        store.dispatch({
            type: 'resultGenerator/symbolSwitch',
            payload : '('
        })
    } else {
        store.dispatch({
            type: 'resultGenerator/symbolSwitch',
            payload : '{'
        })
    }
}

class App extends React.Component {
    languages = [
        {label: '中文+英语', value: 'both'},
        {label: '中文', value: 'zh'},
        {label: '英语', value: 'en'},
    ]

    editToolsLabel = [
        {label: '删除', value: 'remove'},
        {label: '加权', value: 'weightUp'},
        {label: '降权', value: 'weightDown'},
    ]

    changeTool = ({target: {value}}: RadioChangeEvent) => {
        store.dispatch({type: 'currentEditTool/'+value})
        this.setState({});
    }

    changeLanguage = ({target: {value}}: RadioChangeEvent) => {
        store.dispatch({type: 'tagsLanguage/'+value})
        this.setState({});
    }

    changeSfw = (checked: boolean) => {
        if (!checked) {
            store.dispatch({type: 'swfMode/enable'})
        } else {
            store.dispatch({type: 'swfMode/disable'})
        }
        this.setState({});
    }

    render() {
        return (
            <>
                <Space direction="horizontal" size="middle">
                    <Title level={2}>Novel AI Tag生成器</Title>
                </Space>
                <Divider/>
                <Space direction="horizontal" size='large' wrap>
                    <Space>
                        <Text>点击已选标签时：</Text>
                        <Radio.Group options={this.editToolsLabel} buttonStyle='solid' optionType='button'
                                     onChange={this.changeTool} value={store.getState().currentEditTool}/>
                    </Space>
                    <Space>
                        <Text>加权符号：</Text>
                        <Switch checkedChildren='(  )' unCheckedChildren='{  }' onChange={switchUpWeightSymbol}/>
                    </Space>
                    <Popconfirm title='确定要清空已选标签吗' okText='是' cancelText='否' placement='bottom' onConfirm={emptyTag}>
                        <Button danger type='dashed'>清空已选标签</Button>
                    </Popconfirm>
                </Space>
                <Divider orientation='left'>已选中标签</Divider>
                <CurrentTags/>
                <Divider orientation='left'>生成结果</Divider>
                <Result/>
                <Space direction='vertical' style={{width: '100%'}}>
                    <Divider orientation='left'>标签库</Divider>
                    <Space direction='horizontal' wrap size={[50,15]}>
                        <CustomTag/>
                        <Space size='small'>
                            <Text>语言：</Text>
                            <Radio.Group options={this.languages} buttonStyle='solid' optionType='button'
                                         onChange={this.changeLanguage} value={store.getState().language}/>
                        </Space>
                        <Space>
                            <Tooltip
                                title='NSFW，即Not safe for work或Not Suitable For Work，指内容不适合上班时间浏览、儿童不宜。'>
                                <Text type='danger'>显示NSFW标签：</Text>
                            </Tooltip>
                            <Switch onChange={this.changeSfw}/>
                        </Space>
                    </Space>
                    <TagTabs/>
                </Space>

            </>
        );
    }
}

export default App;
