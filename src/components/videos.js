import React, {Component} from 'react';
import {getVids, createVids, deleteVids} from './actions';
import PropTypes from "prop-types";
import ReactPlayer from 'react-player'

import { message, Button, Modal, Form, Input, Card, Row, Col, Spin , Pagination, notification} from 'antd';

const { Meta } = Card;
const FormItem = Form.Item;

const openNotification = (type) => {
  notification[type]({
    message: 'Success',
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
          <Form layout="vertical">
            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem label="Name">
              {getFieldDecorator('categories')(<Input />)}
            </FormItem>
            <FormItem label="Enter a video URL">
              {getFieldDecorator('content')(<Input style={{height: 70}} type="textarea" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class Videos extends Component {
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
    getVids()
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
      if(values.content.length>0) {
        createVids(values);
        openNotification('success');
        (this.context.router.history.push('/loading'), setTimeout(()=>{ this.context.router.history.push('/videos'); }, 500));
      } else if (values.content.length=0){
        message.error('please enter a url');
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };
  handleDelete=(value)=>{
    deleteVids(value)
      .then(()=>{
        openNotification('success');
        (this.context.router.history.push('/loading'), setTimeout(()=>{ this.context.router.history.push('/videos'); }, 500))
      })
  };




  render() {

    return (
      <div>
        {this.state.loading&&<Spin size='large'/>}
        {!this.state.loading &&
        <div>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={24}>
              <Button style={{width: '98%', height: 43}} onClick={this.showModal}>Post a Video</Button>
            </Col>
            {this.state.posts.map(post => {
              return (
                <Col span={12}>
                  <Card
                    hoverable
                    style={{margin: 5}}
                    cover={
                      <ReactPlayer
                        style={{width: '70%'}}
                        url={post.content} playing={false} />
                    }
                  >
                    <Meta
                      style={{height:'0.5em'}}
                      title={<div>{post.title} {post.categories && <span style={{fontSize:'0.65em'}}>by {post.categories}</span>}
                        <Button
                          onClick={() => {this.handleDelete(post.id)}}
                          style={{height:23, float:'right'}}
                        >delete</Button>
                      </div>}
                    />
                  </Card>

                </Col>
              );
            })
            }
          </Row>

          < CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

          <Pagination defaultCurrent={1} total={30}/>
        </div>
        }
      </div>
    );
  }
}


export default Videos;
