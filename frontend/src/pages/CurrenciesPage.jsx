import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import CurrencyDetailsCard from "../components/CurrencyDetailsCard";

const useStyles = makeStyles(theme => ({
  page: {
    padding: "1rem"
  }
}));

const CurrenciesPage = () => {
  const classes = useStyles();
  const [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/currencies");
      const respJson = await response.json();
      setCurrencies(respJson);
    })();
  }, []);

  return (
    <Grid
      container
      className={classes.page}
      spacing={2}
      cols={2}
      alignItems="stretch"
    >
      {currencies
        ? currencies.map(currency => (
            <Grid item xs={12} sm={6} key={currency.shortCode}>
              <CurrencyDetailsCard currency={currency} />
            </Grid>
          ))
        : [...Array(4).keys()].map(index => (
            <Grid item xs={12} sm={6} key={index}>
              <CurrencyDetailsCard currency={null} />
            </Grid>
          ))}
    </Grid>
  );
};

export default CurrenciesPage;
