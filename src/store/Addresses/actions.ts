import { AddressesActions, AddressesConstants } from './typedef';


export const addressesActions: AddressesActions = {
  validateAddress: payload => ({ type: AddressesConstants.VALIDATE_ADDRESS_REQUEST, payload }),
  validateAddressSuccess: payload => ({ type: AddressesConstants.VALIDATE_ADDRESS_SUCCESS, payload }),
  validateAddressFailure: error => ({ type: AddressesConstants.VALIDATE_ADDRESS_FAILURE, error }),

  whitelistAddress: payload => ({ type: AddressesConstants.WHITELIST_ADDRESS_REQUEST, payload }),
  whitelistAddressSuccess: payload => ({ type: AddressesConstants.WHITELIST_ADDRESS_SUCCESS, payload }),
  whitelistAddressFailure: error => ({ type: AddressesConstants.WHITELIST_ADDRESS_FAILURE, error }),

  getAddresses: () => ({ type: AddressesConstants.GET_ADDRESSES_REQUEST }),
  getAddressesSuccess: payload => ({ type: AddressesConstants.GET_ADDRESSES_SUCCESS, payload }),
  getAddressesFailure: error => ({ type: AddressesConstants.GET_ADDRESSES_FAILURE, error })
};
