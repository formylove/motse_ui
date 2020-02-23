import React, {  FunctionComponent } from 'react';
import { Icon, Menu } from 'antd';
import {  observer } from '../../../common/util';
import { Link } from "react-router-dom";
import './SideMenu.scss';

const  {SubMenu} = Menu

const SideMenu: FunctionComponent = () => {
  return (
    <Menu style={{ width: 256 }} mode="vertical">
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="mail" />
            <span>知识卡牌</span>
          </span>
        }
      >
        <Menu.Item key="1"><Link to='/cards/botany/create'>生物卡片</Link></Menu.Item>
          <Menu.Item key="2">食物卡片</Menu.Item>
          <Menu.Item key="3">车</Menu.Item>
          <Menu.Item key="4">数读</Menu.Item>
          <Menu.Item key="4">人物</Menu.Item>
          <Menu.Item key="4">句子</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="appstore" />
            <span>任务管理</span>
          </span>
        }
      >
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu
        key="sub4"
        title={
          <span>
            <Icon type="setting" />
            <span>数据</span>
          </span>
        }
      >
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
);
};


  observer(SideMenu)

export default SideMenu;
