import React, { memo, useState } from 'react';
import { Button, ClickAwayListener, FormControl, Grid, InputBase, InputLabel, Menu, MenuItem, Select, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from '../style';
import { AccountListItem, FormInputLoggedinProps, FormInputProps } from '../typedef';
import { DoneIcon, DotsIcon } from '../../../assets/Icons';

export const FormInputLoggedin = memo<FormInputLoggedinProps>(({
  label,
  value,
  error,
  autoFocus,
  withExtraProps,
  rowsMax,
  background,
  verified,
  account,
  selectOpened,
  handleChange,
  handleAddPress,
  handleSelectPress,
  handleChooseAccount
}) => {
  const classes = useStyles();

  const _placeholderFnc = () => (
    label.includes('address')
      ? [
        { label: 'Address1', xbtAddress: 'mw5byYhwaNq9c7Nk6CriHviG4KMg7nS4Gw' },
        { label: 'Address2', xbtAddress: 'mqQh6zbbfaRtNh7b5SuCBMMB7tVcGn1AzN' },
        { label: 'Address3', xbtAddress: 'mr8LPUR8opDfnrgLVTPaQYWguZEV7xnht7' }
      ]
      : [
        { label: 'Account1', xbtAddress: 'EE581249689829811519' },
        { label: 'Account2', xbtAddress: 'EE911254276187433778' },
        { label: 'Account3', xbtAddress: 'EE561297945933294310' }
      ]
  )
  const accountsList = _placeholderFnc()

  const renderListItems = (list: AccountListItem[]) => (
    list.map(({ label, xbtAddress }) => (
      <Grid key={xbtAddress} className={classes.listItem} onClick={() => handleChooseAccount(xbtAddress)}>
        <Grid className={classes.listItemTextWrap}>
          <Typography className={classes.listItemHeading}>{label}</Typography>
          <Typography className={classes.listItemText}>{xbtAddress}</Typography>
        </Grid>
        <Button className={classes.listItemMoreButton}>
          <DotsIcon />
        </Button>
      </Grid>
    ))
  )

  const _handleAddPress = () => handleAddPress(label.includes('address') ? 'address' : 'account')

  return (
    <ClickAwayListener onClickAway={() => handleSelectPress(false)}>
      <Grid style={{ position: 'relative' }}>
        <Grid
          className={clsx(
            classes.formGroup,
            classes.formGroupSpace,
            classes.pointer,
            classes.select,
            selectOpened && classes.selectActive
          )}
          onClick={() => handleSelectPress(!selectOpened)}
        >
          <InputLabel className={classes.commonLabel}>{label}</InputLabel>
          {!selectOpened && (
            <Typography className={classes.selectPlaceholder}>
              Choose {label.includes('address') ? 'address' : 'account'}
            </Typography>
          )}

          <Grid className={classes.selectIconWrap}>
            <svg
              className={clsx(classes.selectIcon, selectOpened && classes.selectIconRotated)}
              focusable="false"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </Grid>
        </Grid>

        {selectOpened && (
          <Grid className={classes.selectPopup}>
            <Grid className={classes.listHeading}>
              <Typography
                className={classes.selectPlaceholder}
              >
                Choose {label.includes('address') ? 'address' : 'account'}
              </Typography>
              {!!accountsList.length && (
                <Button
                  className={classes.addItemButton}
                  variant="contained"
                  color="primary"
                  onClick={_handleAddPress}
                >
                  + ADD
                </Button>
              )}
            </Grid>
            {accountsList.length
              ? renderListItems(accountsList)
              : (
                <Grid className={classes.selectNoItems}>
                  <Typography className={classes.selectNoItemsNotice}>
                    You do not have any {label.includes('address') ? 'addresses' : 'accounts'}
                  </Typography>
                  <Button
                    className={classes.addItemButton}
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddPress(label.includes('address') ? 'address' : 'account')}
                  >
                    + ADD
                  </Button>
                </Grid>
              )
            }
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  );
});