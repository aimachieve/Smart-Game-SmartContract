import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Grid,
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

const Landing = ({ isAuthenticated }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular',
            }}
          >
            24H Top Winners
          </Typography>
          <TableContainer>
            <Table
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none',
                },
              }}
            >
              <TableBody>
                <TableRow style={{ height: '10px' }}>
                  <TableCell
                    align="center"
                    sx={{ color: '#fff', height: 'auto !important' }}
                  >
                    0xh65244
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>564 BUSD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ color: '#fff' }}>
                    0x5g7a4
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>384.4 BUSD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ color: '#fff' }}>
                    0xh65244
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>564 BUSD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ color: '#fff' }}>
                    0x5g7a4
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>384.4 BUSD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ color: '#fff' }}>
                    0x5g7a4
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>384.4 BUSD</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular',
            }}
          >
            Total Payout
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              mt: 1,
              fontFamily: 'ErasITC-Light,AdobeInvisFont,MyriadPro-Regular',
            }}
          >
            138,000,684 BUSD
          </Typography>
        </Box>
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
