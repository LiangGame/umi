import React, { useEffect, useState } from 'react';
import styles from './login.less';
import { Form, Input, Button, Checkbox, Dropdown, Menu } from 'antd';
import { Link } from 'umi';
import { CopyrightCircleOutlined, GlobalOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Store, ValidateErrorEntity, FieldData } from 'rc-field-form/lib/interface';
import { useIntl } from 'umi';
import { SelectParam } from 'antd/lib/menu';
import { getLocale, setLocale } from '@@/plugin-locale/localeExports';
import request from '@/utils/request';

export default () => {
  const [language, setLanguage] = useState('zh-CN');
  const intl = useIntl();
  const [form] = Form.useForm();

  useEffect(() => {
    setLanguage(getLocale());
  }, []);

  const onFinish = async (values: Store) => {
    console.log('Success:', values);
    const response = await request('/api/login', {
      method: 'POST',
      data: values,
    });

    if (response.errorCode === 1002) {
      console.log(response, form);
      const fields: FieldData[] = [];
      for (let i = 0; i < response.data.length; i++) {
        const error = response.data[i];
        fields.push({
          name: error.key,
          errors: [error.message],
        });
      }
      console.log(fields);
      form.setFields(fields);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const onLanguageSelect = (param: SelectParam) => {
    console.log(param.key);
    setLanguage(param.key);
    setLocale(param.key, false);
  };

  const languageMenu = (
    <Menu selectable selectedKeys={[language]} onSelect={onLanguageSelect}>
      <Menu.Item key="zh-CN">
        CN 简体中文
      </Menu.Item>
      <Menu.Item key="en-US">
        US English
      </Menu.Item>
    </Menu>
  );
  return (
    <main className={styles.login_content}>
      <header className={styles.header_content}>
        <Dropdown overlay={languageMenu}>
          <GlobalOutlined className={`fr ${styles.language}`}/>
        </Dropdown>
      </header>
      <section className={styles.main_content}>
        <h1 className={styles.header}>
          {
            intl.formatMessage({
              id: 'WELCOME_TO_UMI_WORLD',
              defaultMessage: '欢迎光临umi的世界',
            }, { name: '旅行者' })
          }
        </h1>
        <p className={styles.description}>Hello World，Hello World，Hello World</p>
        <div className={styles.form_content}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'FORM_USER_NAME_MESSAGE',
                    defaultMessage: '请输入手机号!',
                  }),
                },
              ]}
            >
              <Input size="large" prefix={<UserOutlined/>} placeholder={
                intl.formatMessage({
                  id: 'FORM_USER_NAME',
                  defaultMessage: '手机号',
                })
              }/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'FORM_PASSWORD_MESSAGE',
                    defaultMessage: '请输入密码!',
                  }),
                },
              ]}
            >
              <Input.Password size="large" prefix={<LockOutlined/>} placeholder={
                intl.formatMessage({
                  id: 'FORM_PASSWORD',
                  defaultMessage: '密码',
                })
              }/>
            </Form.Item>
            <div>
              <Checkbox>
                {
                  intl.formatMessage({
                    id: 'LOGIN_REMEMBER_ME',
                    defaultMessage: '记住账号',
                  })
                }
              </Checkbox>
              <Link to="/" className='fr'>
                {
                  intl.formatMessage({
                    id: 'LOGIN_FORGET_PASSWORD',
                    defaultMessage: '忘记密码？',
                  })
                }
              </Link>
            </div>

            <Form.Item>
              <Button type="primary" size="large" htmlType="submit" className={styles.login_btn}>
                {
                  intl.formatMessage({
                    id: 'LOGIN_SING_IN',
                    defaultMessage: '登录',
                  })
                }
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
      <footer className={styles.footer_content}>
        Copyright <CopyrightCircleOutlined/> {new Date().getFullYear()} Liang&lt;15517072173@163.com&gt;
      </footer>
    </main>
  );
};
