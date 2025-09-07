import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Grid, Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Container from 'components/UiElements/Container/Container';
import SettingsMenu from 'components/SideMenu/SettingsMenu';
import {
  AvatarWrapper,
  ButtonGroup,
} from '../../components/PageStyles/Settings.styled';

const AvatarWithNoSSR = dynamic(() => import('react-avatar-edit'), {
  ssr: false,
});

type FormData = {
  avatar: string;
  name: string;
  username: string;
  email: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(32, 'Name length should not be more than 32 characters'),
  username: yup
    .string()
    .required('Username is required')
    .max(16, 'Username length should not be more than 16 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
});

const Settings: NextPage<{}> = () => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  // 	register({ name: 'avatar' });
  // }, [register]);

  const handleOnCrop = (img: string) => {
    setValue('avatar', img);
  };

  const handleBeforeFileLoad = (e: any) => {
    if (e.target.files[0].size > 71680) {
      alert('File is too big!');
      e.target.value = '';
    }
  };

  const handleOnSubmit = handleSubmit((data) => {
    console.log('Form data: ', data);
    alert(JSON.stringify(data, null, 4));
  });

  return (
    <>
      <Head>
        <title>Settings | INST.</title>
        <meta name="Description" content="Inst setting page" />
      </Head>

      <Container>
        <Block paddingTop={['0', '0', '0', '40px']}>
          <Grid gridColumns={12} gridGutters={0} gridMargins={0}>
            <Cell span={[12, 12, 3]}>
              <SettingsMenu />
            </Cell>
            <Cell span={[12, 12, 9]}>
              <Block paddingTop={['10px', '20px', '30px', '0']}>
                <form onSubmit={handleOnSubmit}>
                  <Block marginBottom="30px">
                    <AvatarWrapper>
                      <AvatarWithNoSSR
                        label="Choose avatar"
                        labelStyle={{
                          fontSize: '16px',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                        width={150}
                        height={150}
                        onCrop={handleOnCrop}
                        onBeforeFileLoad={handleBeforeFileLoad}
                        src={require('../../assets/images/avatar.jpg')}
                      />
                    </AvatarWrapper>
                  </Block>
                  <Block marginBottom="30px">
                    <FormControl
                      label="Your Name"
                      caption="Please use 32 characters at maximum"
                      error={errors?.name?.message}
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Input
                        name="name"
                        autoComplete="off"
                        {...register('name')}
                        placeholder="Please enter your full name or a display name you comfortable with"
                        overrides={{
                          InputContainer: {
                            style: () => {
                              return { backgroundColor: 'transparent' };
                            },
                          },
                        }}
                      />
                    </FormControl>
                  </Block>

                  <Block marginBottom="30px">
                    <FormControl
                      label="Your User Name"
                      caption="Please use 16 characters at maximum"
                      error={errors?.username?.message}
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Input
                        name="username"
                        autoComplete="off"
                        placeholder="Please enter your user name or a display name you comfortable with"
                        {...register('username')}
                        overrides={{
                          InputContainer: {
                            style: () => {
                              return { backgroundColor: 'transparent' };
                            },
                          },
                        }}
                      />
                    </FormControl>
                  </Block>

                  <Block marginBottom="30px">
                    <FormControl
                      label="Your Email"
                      caption="jennydoe@example.io"
                      error={errors?.email?.message}
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Input
                        type="email"
                        name="email"
                        autoComplete="off"
                        {...register('email')}
                        placeholder="Please enter your email address"
                        overrides={{
                          InputContainer: {
                            style: () => {
                              return { backgroundColor: 'transparent' };
                            },
                          },
                        }}
                      />
                    </FormControl>
                  </Block>

                  <ButtonGroup>
                    <Button
                      type="submit"
                      size="large"
                      overrides={{
                        BaseButton: {
                          style: ({ $theme }) => {
                            return {
                              width: '131px',
                              ...$theme.typography.font250,
                            };
                          },
                        },
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      type="reset"
                      onClick={() => reset()}
                      kind="tertiary"
                      size="large"
                      overrides={{
                        BaseButton: {
                          style: ({ $theme }) => {
                            return {
                              width: '131px',
                              ...$theme.typography.font250,
                            };
                          },
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </form>
              </Block>
            </Cell>
          </Grid>
        </Block>
      </Container>
    </>
  );
};

export default Settings;
