import React, { FunctionComponent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import './Step1.scss';
import classnames from 'classnames';
import { Select,Input } from 'antd';
import { useStores, observer, navigate } from '../../../../common/util';
import { Modal,Button,Tag, Row, Col, Icon } from 'antd';
import { CreateCardStore } from '../../../../store/createCardStore';
import FormItem from '../../../../component/Form/FormItem';
import UrlInput from '../../../../component/Form/UrlInput';
import TaxonomyCascade from '../TaxonomyCascade';

const { Option } = Select
const Step1: FunctionComponent = () => {
  const createCardStore = useStores<CreateCardStore>('createCardStore');
  const { handleSubmit, control, errors } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    createCardStore.setCardData(data);
    createCardStore.createCard();
  };

  return (
    <form className="step1_form" onSubmit={handleSubmit(onSubmit)} >
      <Row className='steps'>
        <Col span={4}>
          <Input placeholder="中文名" onKeyUp={(e) => createCardStore.addCnameLabel(e)} value={createCardStore.cname} onChange={createCardStore.setCnameInput} />
        </Col>
        <Col span={20}>
          {
            createCardStore.cnames.map((item) => {
              return <Tag className={'nameTag'} key={item} closable onClose={(e: any) => createCardStore.removeCnameLabel(e)}>{item}</Tag>
            })
          }
        </Col>
      </Row>
      <Row className='taxonomy'>
        <Col span={24}>
          <TaxonomyCascade />
        </Col>
      </Row>
      <Row className='taxonomy'>
        <Select defaultValue={'add'} style={{ width: 120 }} onChange={(e: any) => {createCardStore.createAttrSettingBox(e)}}>
          <Option value="life">寿命</Option>
          <Option value="height">高度</Option>
          <Option value="add">添加属性</Option>
        </Select>
      </Row>
      <Modal
        title="创建属性"
        visible={createCardStore.isVisibleOfModal}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </form>
  );
};



export default observer(Step1);

