import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Grid, Typography } from '@mui/material'

const Landing = ({ isAuthenticated }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular',
            fontSize: '34px',
            fontWeight: 'bold',
          }}
        >
          Transparent
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'ErasITC-Light, AdobeInvisFont, MyriadPro-Regular',
          }}
        >
          All transactions are recorded on the blockchain
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular',
            fontSize: '34px',
            fontWeight: 'bold',
          }}
        >
          Anonymous
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'ErasITC-Light, AdobeInvisFont, MyriadPro-Regular',
          }}
        >
          No user data is stored, each player is recognised only by thei
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular',
            fontSize: '34px',
            fontWeight: 'bold',
          }}
        >
          Provably Fair
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'ErasITC-Light, AdobeInvisFont, MyriadPro-Regular',
          }}
        >
          Gameplay is governed by Smart Contract which is uploaded onto
        </Typography>
      </Grid>
    </Grid>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
