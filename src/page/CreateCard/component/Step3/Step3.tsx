import React, { FunctionComponent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import './Step3.scss';
import classnames from 'classnames';
import { Input } from 'antd';
import { useStores, observer, navigate } from '../../../../common/util';
import { Button, Row, Col, Icon } from 'antd';
import { CreateCardStore } from '../../../../store/createCardStore';
import FormItem from '../../../../component/Form/FormItem';
import UrlInput from '../../../../component/Form/UrlInput';

const Step3: FunctionComponent = () => {
  const createCardStore = useStores<CreateCardStore>('createCardStore');
  const { handleSubmit, control, errors } = useForm({
    mode: 'onChange',
  });


  const onSubmit = (data: any) => {
    createCardStore.setCardData(data);
    createCardStore.createCard();
  };

  return (
    <form className="step3_form" onSubmit={handleSubmit(onSubmit)} >
      <Row className='steps'>
step 3 
      </Row>

    </form>
  );
};

export default observer(Step3);

