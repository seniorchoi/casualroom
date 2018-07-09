import React, {Component} from 'react';
import {getPosts, createPost } from './actions';
import PropTypes from "prop-types";

import { message, Button, Modal, Form, Input, Card, Row, Col, Spin , Icon, notification, Table} from 'antd';

const FormItem = Form.Item;

const { TextArea } = Input;

const openNotification = (type) => {
  notification[type]({
    message: 'Posted Successfully',
  });
};

const CollectionCreateForm = Form.create()(
  class extends React.Component {

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new post"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="horizontal">
            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem label="name">
              {getFieldDecorator('categories')(<Input />)}
            </FormItem>
            <FormItem label="content">
              {getFieldDecorator('content')(<TextArea rows={4} />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class Posts extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      posts:[],
      visible: false,
      newPost:{},
      key:0,
      loading:true,
    };

  }

  componentWillMount() {
    getPosts()
      .then(res=>{
        this.setState({posts:res.data, loading: false});
        console.log(res.data);
      });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if(values.content.length<5000) {
        createPost(values);
        openNotification('success');
        (this.context.router.history.push('/'), setTimeout(()=>{ this.context.router.history.push('/posts'); }, 500));
      } else if (values.content.length>5000){
        message.error('The post was more than 5000 characters');
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };



  render() {
    return (
      <div>
        {this.state.loading&&<Spin size='large'/>}
        {!this.state.loading &&
          <div>
            <Row>
              <Col span={24}>
                <Button style={{height: 40, width:'90%', margin:10}} onClick={this.showModal}>Create new Post</Button>
              </Col>
              <Col span={24}>
                {this.state.posts.map(post => {
                  return (
                    <Card title={<div><Icon key={this.state.key}  style={{marginRight:5, color:'#9AD94C'}} type="twitter" />

                      {post.title}</div>} key={post.title} extra={<div>{post.categories}</div>}
                          style={{width: '95%', marginBottom: '1%'}}>
                      <div className='postContent'>{post.content}</div>
                    </Card>
                  );
                })
                }
              </Col>
            </Row>

            < CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
          </div>
        }
      </div>
    );
  }
}


export default Posts;
