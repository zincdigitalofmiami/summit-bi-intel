import React, { useState, useEffect } from 'react';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Select } from 'baseui/select';
import { Textarea } from 'baseui/textarea';
import { Checkbox } from 'baseui/checkbox';
import { RadioGroup, Radio } from 'baseui/radio';
import { Datepicker } from 'baseui/datepicker';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { useForm, Controller } from 'react-hook-form';

type Props = any;

const HookForm: React.FC<Props> = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data, null, 4));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Block marginBottom="30px">
        <FormControl
          label="Your Name"
          caption="Please use 32 characters at maximum"
          error={errors?.name?.message}
        >
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
      </Block>

      <Block marginBottom="30px">
        <FormControl
          label="Your Email"
          caption="johndoe@demo.io"
          error={errors?.email?.message}
        >
          <Input
            name="email"
            {...register('email')}
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
        <FormControl label="Date of Birth" error={errors?.dateOfBirth?.message}>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => {
              return <Datepicker {...field} />;
            }}
          />
        </FormControl>
      </Block>

      <Block marginBottom="30px">
        <FormControl
          label="Your Favorite Color"
          caption="Select your favorite color"
          error={errors?.fabColor?.message}
        >
          <Controller
            control={control}
            name="fabColor"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  id="select-id"
                  options={[
                    { id: 'AliceBlue', color: '#F0F8FF' },
                    { id: 'AntiqueWhite', color: '#FAEBD7' },
                    { id: 'Aqua', color: '#00FFFF' },
                    { id: 'Aquamarine', color: '#7FFFD4' },
                    { id: 'Azure', color: '#F0FFFF' },
                    { id: 'Beige', color: '#F5F5DC' },
                  ]}
                  labelKey="id"
                  valueKey="color"
                  placeholder=""
                  overrides={{
                    ControlContainer: {
                      style: () => {
                        return { backgroundColor: 'transparent' };
                      },
                    },
                  }}
                />
              );
            }}
          />
        </FormControl>
      </Block>

      <Block marginBottom="30px">
        <FormControl
          label="About Yourself"
          caption="Please use 150 characters at maximum"
          error={errors?.aboutYourself?.message}
        >
          <Textarea
            name="aboutYourself"
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
        <FormControl label="Your Gender" error={errors?.gender?.message}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => {
              return (
                <RadioGroup {...field}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </RadioGroup>
              );
            }}
          />
        </FormControl>
      </Block>

      <Block marginBottom="30px">
        <FormControl
          label="Profile Status"
          error={errors?.profileStatus?.message}
        >
          <Controller
            control={control}
            name="profileStatus"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Checkbox
                onBlur={onBlur}
                onChange={onChange}
                checked={value}
                inputRef={ref}
              >
                Active
              </Checkbox>
            )}
          />
        </FormControl>
      </Block>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default HookForm;
