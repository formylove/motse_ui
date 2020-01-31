import React, {Component, FunctionComponent, useState} from 'react';
import './General.scss';
import {useForm, Controller, ErrorMessage} from 'react-hook-form';
import {Input, Select, Button, Icon} from 'antd';
import classnames from 'classnames';
import {useStores, observer} from '../../../../common/util';
import {ApplicationsStore} from '../../../../store/applicationsStore';
import * as ApplicationMgmtRes from '../../../../services/model/ApplicationMgmtRes';
import {useParams} from 'react-router-dom';
import FormItem from '../../../../component/Form/FormItem';
import UrlInput from '../../../../component/Form/UrlInput';

type ApplicationDetailParams = {
  applicationId: string;
}

const {Option} = Select;

const General = observer(() => {
  const applicationsStore = useStores<ApplicationsStore>('applicationsStore');
  const {handleSubmit, control, errors, reset} = useForm<ApplicationMgmtRes.Application>({
    defaultValues: applicationsStore.currentApplication,
  });
  const {applicationId} = useParams<ApplicationDetailParams>();

  const onSubmit = (data: ApplicationMgmtRes.Application) => {
    applicationsStore.updateApplication(data, applicationId);
  };

  return (
    <form className="application-general" onSubmit={handleSubmit(onSubmit)}>
      <FormItem
        errors={errors}

        control={control}
        name="name"
        title="Name" >
        <Input />
      </FormItem>
      <FormItem
        control={control}
        name="ssoProvider"
        title="Identity Provider" >
        <Select>
          <Option value="OKTA">Okta</Option>
          <Option value="PING" disabled>Ping Identity</Option>
          <Option value="AUTH0" disabled>Auth0</Option>
        </Select>
      </FormItem>
      <FormItem
        control={control}
        name="issuer"
        title="Issuer" >
        <Input />
      </FormItem>
      <FormItem
        control={control}
        name="clientId"
        title="Client Id" >
        <Input />
      </FormItem>
      <FormItem
        control={control}
        name="clientSecret"
        title="Client Secret" >
        <Input.Password />
      </FormItem>
      {/* <FormItem
        control={control}
        name="description"
        title="Description" >
        <Input.TextArea />
      </FormItem> */}
      <FormItem
        control={control}
        name="platform"
        title="Application Type" >
        <Select>
          <Option value="SERVICE" disabled>Service</Option>
          <Option value="WEB" disabled>WEB/</Option>
          <Option value="SPA" >Single Page Application</Option>
          <Option value="NATIVE" disabled>Native</Option>
        </Select>
      </FormItem>
      <FormItem
        control={control}
        name="loginRedirectUrl"
        title="Login redirect URls" >
        <UrlInput canAdd={false} />
      </FormItem>
      <FormItem
        control={control}
        name="logoutRedirectUrl"
        title="Logout redirect URls" >
        <UrlInput canAdd={false} />
      </FormItem>
      <FormItem
        control={control}
        name="apitoken"
        title="API token" >
        <Input />
      </FormItem>
      <div className="control-container">
        <Button htmlType="submit" type="primary">Save Changes</Button>
      </div>
    </form>
  );
});

export default General;
