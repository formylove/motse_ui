import React, {FunctionComponent, useContext} from 'react';
import {useForm, OnSubmit, Controller} from 'react-hook-form';
import {Button, Select, Input} from 'antd';
import './IODCSupportForm.scss';
import classnames from 'classnames';
import {observer, useStores, navigate} from '../../../../common/util';
import {AddApplicationStore} from '../../../../store/addApplicationStore';

const {Option} = Select;

const IODCSupportForm: FunctionComponent = () => {
  const addApplicationStore = useStores<AddApplicationStore>('addApplicationStore');
  const methods = useForm({
    defaultValues: addApplicationStore.applicationData,
  });
  const {handleSubmit, control, errors} = methods;

  const onSubmit = (data: object) => {
    addApplicationStore.setApplicationData(data);
    addApplicationStore.setCurrentStep(2);
  };

  return (
    <form className={'IODS-support-form'} onSubmit={handleSubmit(onSubmit)}>
      {/*
            <span className="form-item">Setting up X-Ray is quite easy and simple, you just need to follow the instructions. After several steps, the setup will be finished in a few minutes.</span>
            <span className="form-item">Read our documentation, for more information</span>
            <span className="form-item">Our X-Ray supports three different deployments, 
            you can shoose the one which is suitable for you. If you want know the fifference of these three deployments, please see the detail deployment</span> */}
      <span className="form-item">Identity Provider</span>
      <Controller
        as={<Select
          style={{width: '100%'}}
          className="control-item">
          <Option value="OKTA">Okta</Option>
          <Option value="PING" disabled>Ping Identity</Option>
          <Option value="AUTH0" disabled>Auth0</Option>
        </Select>}
        defaultValue="OKTA"
        control={control}
        name="ssoProvider" />
      <span className="form-item">Application Name</span>
      <div className="control-item">
        <Controller
          as={<Input
            className={classnames({
              'has-error': !!errors.name,
            })}
            placeholder="My First App"
          />}
          control={control}
          rules={{required: true}}
          name="name" />
        {errors.name && <span className="error-tip">Name is required</span>}
      </div>
      <div className="control-container form-item">
        <Button onClick={() => addApplicationStore.cancelCreate()}>Cancel</Button>
        <Button type="primary" htmlType="submit">Next</Button>
      </div>
    </form>
  );
};

export default observer(IODCSupportForm);
