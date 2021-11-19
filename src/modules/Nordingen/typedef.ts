import React, { ChangeEvent, FormEvent, ReactNode, ReactNodeArray } from 'react';
import { Autocomplete } from '../../components/Autocomplete';
import { Bank } from '../../graphql/Nordigen/typedef';

export type Props = {
  modalStatus: boolean;
  children: ReactNode;
  handleModalCloseClick: () => void;
};

export type ModalHeaderProps = {
  iban?: string;
  step: number;
  error: boolean;
  completed: boolean;
};

export type ModalInfoProps = {
  error: boolean;
  headline: string;
  message: string;
  optionsLoading: boolean;
  options: Bank[];
  bankSelected: boolean;
  final: boolean;
  completed: boolean;
  bank: null | Bank;
  handleChange: (event: ChangeEvent<Record<string, unknown>>, value: null | Bank) => void;
};

export type ModalFooterProps = {
  loading: boolean;
  disabled: boolean;
  bankSelected: boolean;
  final: boolean;
  error: boolean;
  completed: boolean;
  address: string;
  step: number;
};

export type ModalFormProps = ModalHeaderProps & ModalFooterProps & {
  children: ReactNode | ReactNodeArray;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type CreatedAccount = {
  iban: string;
  name: string;
};