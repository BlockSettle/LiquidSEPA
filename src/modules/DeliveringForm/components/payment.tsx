import React, { memo } from 'react';
import { Grid } from '@material-ui/core';

import { PaymentProps } from '../typedef';
import { useStyles } from '../style';
import { Row } from './row';
import { PaymentHeader } from './payment-header';
import { PaymentTxid } from './payment-txid';
import { PaymentDetails } from './payment-details';
import { ProductType } from '../../../constants';
import { ConverterService, IbanService } from '../../../services';

export const Payment = memo<PaymentProps>(({
  sellSide,
  confs,
  confirmed,
  paymentDetails,
  handleTxCopyClick
}) => {
  const classes = useStyles();

  const sellHeader = (
    <>
      <Row label="Txid" spaceLarge>
        <PaymentTxid
          txId={ paymentDetails.txId }
          link={ paymentDetails.link }
          handleTxCopyClick={ handleTxCopyClick }
        />
      </Row>
      <Row
        label="Received"
        value={ ConverterService.separate(paymentDetails.received.amount.toFixed(8), ',') }
        product={ ProductType.EURX }
        spaceMedium
      />
      <Row
        label="Confirmations"
        value={ `${ confs }/2` }
        spaceSmall
      />
    </>
  );

  const sellDetails = (
    <PaymentDetails label={ confirmed ? 'Payment sent' : 'Payment pending' }>
      <Row
        label="Account name"
        value={ paymentDetails.sending.nameOnAccount }
      />
      <Row
        label="IBAN"
        value={ IbanService.format(paymentDetails.sending.iban) }
        spaceSmall
      />
      <Row
        label="Sending amount"
        value={ ConverterService.separate(paymentDetails.sending.amount.toFixed(2), ',') }
        product={ ProductType.EUR }
        spaceSmall
      />
    </PaymentDetails>
  );

  const buyHeader = (
    <>
      <Row
        label="Received amount"
        value={ ConverterService.separate(paymentDetails.received.amount.toFixed(2), ',') }
        product={ ProductType.EUR }
        spaceMedium
      />
      <Row
        label="Account Name"
        value={ paymentDetails.received.nameOnAccount }
        spaceSmall
      />
      <Row
        label="IBAN"
        value={ IbanService.format(paymentDetails.received.iban) }
        spaceSmall
      />
    </>
  );

  const buyDetails = (
    <PaymentDetails label="EURx broadcast">
      <Row label="Txid">
        <PaymentTxid
          txId={ paymentDetails.txId }
          link={ paymentDetails.link }
          handleTxCopyClick={ handleTxCopyClick }
        />
      </Row>
      <Row
        label="Sending amount"
        value={ ConverterService.separate(paymentDetails.sending.amount.toFixed(8), ',') }
        product={ ProductType.EURX }
        spaceLarge
      />
      <Row
        label="Confirmations"
        value={ `${ confs }/2` }
        spaceSmall
      />
    </PaymentDetails>
  );

  return (
    <Grid className={ classes.payment }>
      <PaymentHeader confirmed={ confirmed }>
        { sellSide ? sellHeader : buyHeader }
      </PaymentHeader>
      { sellSide ? sellDetails : buyDetails }
    </Grid>
  );
});