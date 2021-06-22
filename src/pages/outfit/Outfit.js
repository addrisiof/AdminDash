import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle";
import { Auth } from "aws-amplify";
import Axios from 'axios'
import config from './../../config.json'

export default function Outfit() {
  const [outfitList, setList] = useState([])

  useEffect(() => {
    Auth.currentSession()

      .then( res => {
        let jwt = res.getIdToken().getJwtToken()
        Axios.get(
          config.adminController.listOutfit,
          {
            headers: {Authorization: jwt}
          }
        )
          .then( (res) => {
            console.log(res.data)
              setList(res.data)
            }
          )
          .catch( (err) => {
              console.log("ERRORE")
            }
          )
      })
      .catch( err => {
        console.log(err)
      })
  })

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: outfitList ?
          <CircularProgress size={26}  /> :
          'Errore nel caricamento',
      },
    },
  };
  const columns = [
    {
      name: "name",
      label: "Nome"
    },{
      name: "clothes",
      label: "Lista item"
    }
  ];

  return (
    <>
      <PageTitle title="Lista outfit creati" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Lista items"
           // data={outfitList}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
