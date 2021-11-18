import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../../actions/auth'

import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  Slider,
} from '@mui/material'
import CasinoIcon from '@mui/icons-material/Casino'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import Settings from './Settings'
import { makeStyles } from '@material-ui/core'
import { styled } from '@mui/material/styles'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'

import {
  connectWallet,
  getCurrentWalletConnected,
} from '../../../utils/interact.js'

const Flip = ({ isAuthenticated, login }) => {
  console.log('isAuthenticated:', isAuthenticated)

  //State variables
  const [walletAddress, setWallet] = useState('')
  const [betAmount, setBetAmount] = useState(0.05)
  const [value, setValue] = useState(5)
  const [track, setTrack] = useState("normal")
  const [betChance, setBetChance] = useState(5)
  const [multiplier, setMultiplier] = useState(19.8)

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const { address } = await getCurrentWalletConnected()
      setWallet(address)
      // ...
    }
    fetchData()
  }, [])

  // Connect Wallet
  const connectWalletPressed = async () => {
    //TODO: implement
    const walletResponse = await connectWallet()
    setWallet(walletResponse.address)

    addWalletListener()

    if (walletResponse.success) {
      login(walletResponse.address)
    }
  }
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0])
        } else {
          setWallet('')
        }
      })
    } else {
      // setStatus(
      //   <p>
      //     {" "}
      //     🦊{" "}
      //     <a href={`https://metamask.io/download.html`}>
      //       You must install Metamask, a virtual Ethereum wallet, in your
      //       browser.
      //     </a>
      //   </p>
      // );
    }
  }

  // Set Bet Amount
  const handleChange = (event) => {
    setBetAmount(event.target.value)
  }

  // Set Bet Min Value
  const setMinValue = () => {
    setBetAmount(0.05)
  }
  const MinButton = () => (
    <Button
      onClick={setMinValue}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        ml: 3,
      }}
    >
      Min
    </Button>
  )

  // Set slider change value
  const sliderChange = (event, newValue) => {
    let v_value
    if (newValue < 5) {
      // setValue(5)
      v_value = 5
    } else if (newValue > 98) {
      // setValue(98)
      v_value = 98
    } else {
      v_value = newValue
    }
    
    setValue(v_value)
    setBetChance(track === "normal" ? v_value : 100 - v_value)
    // Roll Under: Rough Function, Roll Upper: ____ function
    setMultiplier((99/v_value).toFixed(4))
  }

  // Input slider value
  const affectToSlider = (e) => {
    let v_value
    if (e.target.value < 5) {
      // setValue(5)
      v_value = 5
    } else if (e.target.value > 98) {
      // setValue(98)
      v_value = 98
    } else {
      v_value = e.target.value
    }

    setValue(v_value)
    setBetChance(track === "normal" ? v_value : 100 - v_value)
  }

  // Set TextField's Color
  const useStyles = makeStyles({
    root: {
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        // border: 'solid 2px white'
        borderRadius: '10px',
      },
      '& .MuiOutlinedInput-input': {
        color: 'white',
        fontWight: 'bold',
        borderRadius: '10px',
        background: 'linear-gradient(90deg, rgb(29, 39, 50), rgb(29, 39, 50))',
        opacity: 0.9,
      },
    },
    slider: {
      '& .MuiSlider-root': {
        color: 'rgb(129, 71, 218)',
        height: '12px',
      },
      '& .MuiSlider-thumb': {
        width: '30px',
        height: '30px',
      },
    },
    button: {
      "&.active": {
        background:'black',
      },
    },
  })
  const classes = useStyles()

  const CustomizedSlider = styled(Slider)`
    color: rgb(129, 71, 218);
    height: 12px;
    :hover {
      color: rgb(86, 71, 218);
    }
  `

  // onClick Bet Button
  const startBet = () => {
    alert('started bet')
  }

  // Bet direction
  const setBetDirection = (e) => {
    // setTrack(status)
    console.log(e.target.id)
    setTrack(e.target.id)
    setBetChance(e.target.id === "normal" ? (value + ' %') : (100 - value) + " %")
  }

  //Start Rendering
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="container">
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              height: 'auto',
              width: '100%',
              p: 3,
            }}
          >
            {/* Rules and Audio settings */}
            <Settings />

            {/* Game Logic */}
            <Grid container spacing={2} mt={1}>
              {/* Showing Win & Multiplier & Win Chance */}
              <Grid item xs={12} md={4}>
                <Stack>
                  <Typography sx={{ color: '#fff', mb: 2 }}>
                    Roll Over to Win
                  </Typography>
                  <TextField
                    id="bet-amount"
                    value={value}
                    type="number"
                    className={classes.root}
                    onChange={affectToSlider}
                    InputProps={{
                      endAdornment: <SyncAltIcon />,
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack>
                  <Typography sx={{ color: '#fff', mb: 2 }}>
                    Multiplier
                  </Typography>
                  <TextField
                    id="bet-amount"
                    value={'x ' + multiplier}
                    className={classes.root}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
                      endAdornment: <UnfoldMoreIcon />,
                    }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack>
                  <Typography sx={{ color: '#fff', mb: 2 }}>
                    Win Chance
                  </Typography>
                  <TextField
                    id="bet-amount"
                    value={betChance + ' %'}
                    className={classes.root}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
                      endAdornment: <UnfoldMoreIcon />,
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>

            {/* Roll Setting Slider */}
            <Box
              sx={{
                my: 3,
                width: '100%',
                background: 'rgb(34, 41, 52)',
                borderRadius: '12px',
                mx: 'auto',
                p: 3,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  {/* Button Roll Under */}
                  <Stack direction="row" justifyContent="center">
                    <Button
                      variant="outlined"
                      startIcon={<SwapVertIcon />}
                      className={classes.button}
                      id="normal"
                      onClick={setBetDirection}
                      sx={{
                        height: '40px',
                        borderRadius: '40px',
                        color: track === "normal" ? 'white' : 'rgb(104, 213, 215)',
                        border: '1px solid rgb(104, 213, 215)',
                        '&:hover': {
                          background: 'linear-gradient(102.73deg, rgb(104, 213, 215) 2.16%, rgb(25, 159, 135) 92.24%)',
                          color: "#fff",
                          border: 'none'
                        },
                        background: track === "normal" ? 
                          'linear-gradient(102.73deg, rgb(104, 213, 215) 2.16%, rgb(25, 159, 135) 92.24%)' : 
                          ""
                      }}
                    >
                      Roll under
                    </Button>
                  </Stack>
                </Grid>

                {/* Showing Selected Value */}
                <Grid item xs={12} md={4}>
                  <Stack direction="row" justifyContent="center">
                    <Button
                      size="large"
                      variant="contained"
                      sx={{
                        mt: 2,
                        background:
                          'linear-gradient(153.84deg, rgba(21, 241, 178, 0.3) 8.53%, rgba(32, 226, 184, 0.3) 19.97%, rgba(62, 186, 199, 0.3) 42.01%, rgba(110, 123, 223, 0.3) 72.14%, rgba(149, 71, 243, 0.3) 94.85%)',
                        borderRadius: '40px',
                        width: '150px',
                        padding: '10px',
                      }}
                    >
                      <Box
                        sx={{
                          background:
                            'linear-gradient(153.84deg, rgb(21, 241, 178) 8.53%, rgb(32, 226, 184) 19.97%, rgb(62, 186, 199) 42.01%, rgb(110, 123, 223) 72.14%, rgb(149, 71, 243) 94.85%)',
                          padding: '5px',
                          width: '150px',
                          borderRadius: '40px',
                          fontWeight: 'bold',
                          fontSize: '20px',
                        }}
                      >
                        {value}
                      </Box>
                    </Button>
                  </Stack>
                </Grid>

                {/* Button Roll Upper */}
                <Grid item xs={12} md={4}>
                  <Stack direction="row" justifyContent="center">
                    <Button
                      variant="outlined"
                      startIcon={<SwapVertIcon />}
                      id="inverted"
                      onClick={setBetDirection}
                      sx={{
                        height: '40px',
                        borderRadius: '40px',
                        color: track === "inverted" ? 'white' : 'rgb(104, 213, 215)',
                        border: '1px solid rgb(104, 213, 215)',
                        '&:hover': {
                          background: 'linear-gradient(102.73deg, rgb(104, 213, 215) 2.16%, rgb(25, 159, 135) 92.24%)',
                          color: "#fff",
                          border: 'none'
                        },
                        background: track === "inverted" ? 
                          'linear-gradient(102.73deg, rgb(104, 213, 215) 2.16%, rgb(25, 159, 135) 92.24%)' : 
                          ""
                      }}
                    >
                      Roll Upper
                    </Button>
                  </Stack>
                </Grid>
              </Grid>

              <CustomizedSlider
                className={classes.slider}
                defaultValue={5}
                aria-label="Small"
                valueLabelDisplay="auto"
                step={0.01}
                // marks
                value={value}
                onChange={sliderChange}
                track={track}
              />
            </Box>

            {/* Set Bet Amount & Payout */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Typography sx={{ color: '#fff', width: '379px', mb: 2 }}>
                    Bet Amount
                  </Typography>
                  <TextField
                    id="bet-amount"
                    type="number"
                    value={betAmount}
                    className={classes.root}
                    onChange={handleChange}
                    InputProps={{ endAdornment: <MinButton /> }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack>
                  <Typography sx={{ color: '#fff', width: '379px', mb: 2 }}>
                    Payout
                  </Typography>
                  <TextField
                    id="bet-amount"
                    type="number"
                    value={(betAmount * multiplier).toFixed(4)}
                    readOnly
                    InputProps={{ readOnly: true, endAdornment: 'BNB' }}
                    sx={{
                      border: 'solid 3px',
                      borderRadius: '10px',
                      fontColor: '#fff',
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>

            {/* Connect Wallet and Start Betting */}
            <Stack direction="row" justifyContent="center">
              {walletAddress.length > 0 || isAuthenticated ? (
                <Button
                  onClick={startBet}
                  variant="contained"
                  size="large"
                  startIcon={<CasinoIcon />}
                  sx={{
                    width: '300px',
                    height: 54,
                    mt: 3,
                    mb: 3,
                    borderRadius: '10px',
                    fontWight: 'bold',
                    background:
                      'linear-gradient(95.32deg, rgb(129, 86, 218) 2.68%, rgb(89, 41, 137) 84.52%)',
                    '&:hover': {
                      background:
                        'linear-gradient(95.32deg,rgb(89, 41, 137)  2.68%, rgb(129, 86, 218) 84.52%)',
                    },
                  }}
                >
                  {' '}
                  ROLL DICE{' '}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  onClick={connectWalletPressed}
                  sx={{
                    width: '300px',
                    height: 54,
                    mt: 3,
                    mb: 3,
                    borderRadius: '10px',
                    fontWight: 'bold',
                    // linear-gradient(90deg , #dc2424 15%, #4a569d 80%)
                    background:
                      'linear-gradient(95.32deg, rgb(129, 86, 218) 2.68%, rgb(89, 41, 137) 84.52%)',
                  }}
                >
                  🦊
                  CONNECT{' '}
                </Button>
              )}
            </Stack>
          </Box>
        </div>
      </div>
    </section>
  )
}

Flip.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
})

export default connect(mapStateToProps, { login })(Flip)
