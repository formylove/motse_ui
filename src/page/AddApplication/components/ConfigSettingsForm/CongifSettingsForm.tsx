import React, {FunctionComponent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {useForm, Controller, ErrorMessage} from 'react-hook-form';
import './CongifSettingsForm.scss';
import classnames from 'classnames';
import {Input} from 'antd';
import {useStores, observer, navigate} from '../../../../common/util';
import {Button} from 'antd';
import {AddApplicationStore} from '../../../../store/addApplicationStore';
import FormItem from '../../../../component/Form/FormItem';
import UrlInput from '../../../../component/Form/UrlInput';

const CongifSettingsForm: FunctionComponent = () => {
  const addApplicationStore = useStores<AddApplicationStore>('addApplicationStore');
  const {handleSubmit, control, errors, register} = useForm({
    mode: 'onChange',
  });


  const onSubmit = (data: any) => {
    addApplicationStore.setApplicationData(data);
    addApplicationStore.createApplication();
  };

  return (
    <form className="config-settings-form" onSubmit={handleSubmit(onSubmit)} >
      <span className="tip">Edit them to fit your needs. All these settings can be changed at any time.</span>
      <FormItem
        rules={{required: 'Issuer is required!'}}
        control={control}
        errors={errors}
        title={'Issuer'}
        name="issuer" >
        <Input
          className={classnames({
            'has-error': !!errors.issuer,
          })}
          placeholder="https://www.okta.com"
        />
      </FormItem>
      <FormItem
        rules={{required: 'Client Id is required!'}}
        control={control}
        errors={errors}
        title={'Client ID'}
        name="clientId" >
        <Input
          className={classnames({
            'has-error': !!errors.clientId,
          })}
          placeholder="Your Okta client ID"
        />
      </FormItem>
      <FormItem
        rules={{required: 'Client secret is required!'}}
        control={control}
        errors={errors}
        title={'Client Secret'}
        name="clientSecret" >
        <Input
          className={classnames({
            'has-error': !!errors.clientSecret,
          })}
          placeholder="Your Okta client Secret"
        />
      </FormItem>
      <FormItem
        rules={{required: true}}
        control={control}
        errors={errors}
        defaultValue={['']}
        title={'Login redirect URI'}
        name="loginRedirectUrl" >
        <UrlInput canAdd={false} />
      </FormItem>
      <FormItem
        rules={{
          required: true,
        }}
        defaultValue={['']}
        control={control}
        errors={errors}
        title={'Logout redirect URI'}
        name="logoutRedirectUrl" >
        <UrlInput canAdd={false} />
      </FormItem>
      <FormItem
        rules={{required: 'API token is required!'}}
        control={control}
        errors={errors}
        title={'API token'}
        name="apitoken" >
        <Input
          className={classnames({
            'has-error': !!errors.apitoken,
          })}
          placeholder="df87mnbv6x78vcbx5sdig"
        />
      </FormItem>
      <div className="control-container">
        <Button onClick={() => addApplicationStore.setCurrentStep(2)}>Previous</Button>
        <Button onClick={() => addApplicationStore.cancelCreate()}>Cancel</Button>
        <Button type="primary" htmlType="submit">Create</Button>
      </div>
    </form>
  );
};

export default observer(CongifSettingsForm);

