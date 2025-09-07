import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
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
import { ButtonGroup } from 'components/PageStyles/Settings.styled';

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  newPassword: yup.string().required('Password is required').max(20),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must be same'),
});

const Password: NextPage<{}> = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data, null, 4));
  });

  const handleOnReset = () => {
    reset();
  };

  return (
    <>
      <Head>
        <title>Password | INST.</title>
        <meta name="Description" content="Inst password setting page" />
      </Head>

      <Container>
        <Block paddingTop={['0', '0', '0', '40px']}>
          <Grid gridColumns={12} gridGutters={0} gridMargins={0}>
            <Cell span={[12, 12, 3]}>
              <SettingsMenu />
            </Cell>
            <Cell span={[12, 12, 9]}>
              <Block paddingTop={['10px', '10px', '20px', '0']}>
                <form onSubmit={handleOnSubmit}>
                  <Block marginBottom="30px">
                    <FormControl
                      label="Set New Password"
                      caption="Please use 20 characters at maximum"
                      error={errors?.newPassword?.message}
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Input
                        type="password"
                        name="newPassword"
                        {...register('newPassword')}
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
                      label="Confirm Password"
                      caption="Please enter same password"
                      error={errors?.confirmPassword?.message}
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Input
                        type="password"
                        name="confirmPassword"
                        {...register('confirmPassword')}
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
                      Change
                    </Button>
                    <Button
                      type="reset"
                      kind="tertiary"
                      size="large"
                      onClick={handleOnReset}
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

export default Password;
