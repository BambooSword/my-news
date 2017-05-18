import React from 'react';
import {Row, Col} from 'antd';
import {
  Menu,
  Icon,
  message,
  Form,
  Input,
  Tabs,
  Button,
  CheckBox,
  Modal,
  Card
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router';
class CommonComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({comments: json});
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    };
    var formdata = this.props.form.getFieldsValue();
    console.log(formdata)
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.componentDidMount();
    })
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    const {comments} = this.state;
    const commentList = comments.length?
    comments.map((comment,index)=>(
      <Card key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime}</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    :  '没有加载到任何内容';
    return (
      <div className="comment">
        <Row>
          <Col span={24}>
            {commentList}
            <Form onSubmit ={this.handleSubmit}>
              <FormItem label="您的评论">
              { getFieldDecorator('remark',{initialValue:''})(
                <Input type="textarea" placeholder="随便写" />
              )}
              </FormItem>
              <Button type="primary" htmlType="submit">提交评论</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
export default CommonComments = Form.create({})(CommonComments);
