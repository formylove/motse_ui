import React, {Component, useEffect} from 'react';
import {useForm, OnSubmit, Controller} from 'react-hook-form';
import classnames from 'classnames';
import {Input, Button, message} from 'antd';
import './Login.scss';
import Services from '../../services/services';
import md5 from 'md5';
import sha1 from 'sha1';
import {useStores, navigateInLayout, getUserSession} from '../../common/util';
import {AppStore} from '../../store/appStore';
import {UserStore} from '../../store/userStore';
import {MERLIN} from '../../common/constants';

export default class Login extends Component {
  render(): React.ReactNode {
    return (
      <div id="ps-login-container">
        <div className="ps-login-bg" />
        <div className="ps-login-content">
          <img style={{
            width: '154px',
            height: '28px',
            marginBottom: '30px',
          }} src={require('../../assets/images/logo-deep.png')} />
          <LoginForm />
        </div>
      </div>
    );
  }
}

type LoginFormType = {
    email: string; 
    password: string;
}

export function LoginForm() {
  const {handleSubmit, control, errors} = useForm<LoginFormType>();
  const appStore = useStores<AppStore>('appStore');
  const userStore = useStores<UserStore>('userStore');

  useEffect(() => {
    if (getUserSession()) {
      navigateInLayout('/home');
    }
  });

  const onSubmit = (data: LoginFormType) => {
    appStore.showGlobalLoading();
    Services.login({
      email: data.email,
      password: sha1(md5(data.password)),
    }).then((res) => {
      appStore.hideGlobalLoading();
      localStorage.setItem(MERLIN, JSON.stringify(res.data));
      userStore.initUser();
      navigateInLayout('/home');
    }).catch((e) => {
      appStore.hideGlobalLoading();
      message.error(e.message);
    });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={<Input
          className={classnames({
            'form-item': true,
          })}
          placeholder="email"
        />}
        control={control}
        rules={{required: true}}
        name="email" />
      <Controller
        as={<Input.Password
          className={classnames({
            'form-item': true,
          })}
          placeholder="password"
        />}
        control={control}
        rules={{required: true}}
        name="password" />
      <Button 
        className="form-item"
        htmlType="submit"
        type="primary"
      >Login</Button>
    </form>
  );
}

