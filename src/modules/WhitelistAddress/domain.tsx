import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StatusModalType } from '../../typedef';
import { WrappedProps } from './typedef';
import { addressesActions, addressesAddressValidSelector, addressesWhitelistAddressErrorSelector, addressesWhitelistAddressLoadingSelector } from '../../store/Addresses';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';
import { useDebounce } from '../../hooks/Debounce';
import { usePrevious } from '../../hooks/Previous';
import { StatusModal } from '../../components/StatusModal';


export const withWhitelistAddressDomain = (Component: FC<WrappedProps>) => () => {
  const dispatch = useDispatch();

  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const debouncedAddress = useDebounce(address);
  const { modalStatus, controls } = useWhitelistAddressContext();

  const debouncedAddressPrev = usePrevious(debouncedAddress);

  const valid = useSelector(addressesAddressValidSelector);
  const loading = useSelector(addressesWhitelistAddressLoadingSelector);
  const error = useSelector(addressesWhitelistAddressErrorSelector);

  useEffect(() => {
    if (modalStatus) return;

    setLabel('');
    setAddress('');
  }, [modalStatus]);

  useEffect(() => {
    if (!address || error) return;

    if (loading) {
      controls.close();
    } else {
      dispatch(addressesActions.getAddresses());
    }
  }, [loading]);

  useEffect(() => {
    if (!debouncedAddress && !debouncedAddressPrev) return;

    dispatch(addressesActions.validateAddress({ address: debouncedAddress }));
  }, [debouncedAddress]);

  const handleLabelChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setLabel(currentTarget.value);
  }, []);

  const handleAddressChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setAddress(currentTarget.value);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid) return;

    dispatch(addressesActions.whitelistAddress({ label, address }));
  }, [label, address, valid]);

  return (
    <>
      <Component
        status={ modalStatus }
        handleClose={ controls.close }
        label={ label }
        disabled={ !label || !address || !valid }
        addressValid={ valid }
        address={ address }
        loading={ loading }
        handleLabelChange={ handleLabelChange }
        handleAddressChange={ handleAddressChange }
        handleSubmit={ handleSubmit }
      />
      <StatusModal
        type={ StatusModalType.PROCESSING }
        processingText="Waiting for Auth eID sign"
        status={ loading }
      />
    </>

  );
};
