import axios from 'axios'
import { REACT_APP_SMSKEY } from "../../store/consts/consts";
import { Grid, Paper }  from '@mui/material'

const SMSCredits = () => {

    let creditsSms = 0
    let monedaSms = ""
    const miroSaldo = async () => {
        const headers = {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: REACT_APP_SMSKEY, // Clave de el trebol Base64
        };
    
        const respu = await axios
          .get(
            "https://api.infobip.com/account/1/balance",
            {
              headers: headers,
            }
          )
          .then((response) => {
              creditsSms = response.data.balance
              monedaSms = response.data.currency
            // console.log("Mensaje enviado", response, "KEY", REACT_APP_SMSKEY);
          })
          .catch((error) => {
            console.log("ERROR", error);
          });
      };

      miroSaldo()

    return <>
    <Grid p={2}>    
      <Paper elevation={3} rounded="true" className="paper-prod"> 
      <h6>Créditos SMSs para aviso pedidos: {creditsSms} {monedaSms}. Aproximadamente $:  {((creditsSms) * 0.15).toFixed(2).replace(".",",") }</h6>
      </Paper>
    </Grid>
    </>

}

export default SMSCredits