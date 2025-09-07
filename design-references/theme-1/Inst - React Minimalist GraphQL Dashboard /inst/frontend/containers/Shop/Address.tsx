import React, { useState } from 'react';
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Header,
  Title,
  ButtonGroup,
} from '../../components/PageStyles/Checkout.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .max(32, 'Name length should not be more than 32 characters'),
});

const Address = () => {
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

  return (
    <>
      <Header style={{ borderBottom: 0 }}>
        <Title>Add Address</Title>
      </Header>
      <form onSubmit={handleOnSubmit}>
        <Row>
          <Col lg={6}>
            <FormControl label="Your Name" error={errors?.name?.message}>
              <Input
                name="name"
                {...register('name')}
                overrides={{
                  InputContainer: {
                    style: () => {
                      return { backgroundColor: 'transparent' };
                    },
                  },
                }}
              />
            </FormControl>
          </Col>
          <Col lg={6}>
            <FormControl label="Phone Number" error={errors?.phone?.message}>
              <Input
                name="phone"
                {...register('phone')}
                overrides={{
                  InputContainer: {
                    style: () => {
                      return { backgroundColor: 'transparent' };
                    },
                  },
                }}
              />
            </FormControl>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <FormControl label="Address">
              <Input
                name="address"
                {...register('address')}
                overrides={{
                  InputContainer: {
                    style: () => {
                      return { backgroundColor: 'transparent' };
                    },
                  },
                }}
              />
            </FormControl>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <FormControl label="City">
              <Input
                name="city"
                {...register('city')}
                overrides={{
                  InputContainer: {
                    style: () => {
                      return { backgroundColor: 'transparent' };
                    },
                  },
                }}
              />
            </FormControl>
          </Col>
          <Col lg={6}>
            <FormControl label="Zip code">
              <Input
                name="zipCode"
                {...register('zipCode')}
                overrides={{
                  InputContainer: {
                    style: () => {
                      return { backgroundColor: 'transparent' };
                    },
                  },
                }}
              />
            </FormControl>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <FormControl label="Area">
              <Input
                name="area"
                {...register('area')}
                overrides={{
                  InputContainer: {
                    style: () => {
                      return { backgroundColor: 'transparent' };
                    },
                  },
                }}
              />
            </FormControl>
          </Col>
        </Row>

        <ButtonGroup>
          <Button
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
            kind="tertiary"
            size="large"
            type="reset"
            onClick={() => reset()}
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
    </>
  );
};

export default Address;
