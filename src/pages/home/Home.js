import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle";
import { Auth } from "aws-amplify";
import Axios from 'axios'
import config from './../../config.json'




export default function Home() {
  const [state, setState] = useState([])
  const [outfitList, changeCurrentOutfit] = useState([])

  const textInput = useRef(null)

  useEffect(() => {
    Auth.currentSession()
      .then( res => {
        let jwt = res.getIdToken().getJwtToken()
        Axios.get(
          config.adminController.list,
          {
            headers: {Authorization: jwt}
          }
        )
          .then( (res) => {
            console.log(res.data)
              setState(res.data)
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
        noMatch: state ?
          <CircularProgress size={26}  /> :
          'Errore nel caricamento',
      },
    },
  };

  const optionsOutfit = {
    filterType: 'checkbox',
    selectableRows: 'none',
    filter : false,
    search: false,
    print: false,
    sort: false,
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
      name: "category",
      label: "Tipo"
    },{
      name: "name",
      label: "Nome"
    },
    {
      name: "mainColor",
      label: "Colore principale"
    },
    {
      name: "url",
      label: "Preview",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <img
              src={value}
              alt="new"
            />
          );
        }
      }
    },
    {
      name: "",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button onClick={() => {
              let item = state[tableMeta.rowIndex]
              console.log(outfitList)
              outfitList.push(item)
              changeCurrentOutfit(outfitList)

            }}>
              Aggiungi a outfit corrente
            </button>
          );
        }
      }
    }
  ];

  const columnsOutfit = [
    {
      name: "category",
      label: "Tipo"
    },{
      name: "name",
      label: "Nome"
    },
    {
      name: "mainColor",
      label: "Colore principale"
    }
  ];

  const uploadOutfit = useCallback(() => {
    let itemIds = []
    outfitList.forEach(item =>
      itemIds.push(item.name)
    );
    Auth.currentSession()
      .then( res => {
        let jwt = res.getIdToken().getJwtToken()
        console.log(jwt)

        Axios.post(
          config.adminController.uploadOutfit,
          {name: textInput.current.value, clothes: itemIds },
          { headers: {Authorization: jwt}}
        )
          .then( (res) => {
              console.log(res)
              console.log(res.data)
            }
          )
          .catch( (err) => {
              console.log(err)
            }
          )

      })
      .catch( err => {
        console.log(err)
      })
    textInput.current.value = ""
    deleteOutfit()
    alert("Outfit caricato correttamente")

  }, []);

  const deleteOutfit = useCallback(() => {
    while (outfitList.length) { outfitList.pop() }
    changeCurrentOutfit(outfitList)
  }, []);


  return (
    <>
      <PageTitle title="Creazione outfit" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Lista items"
            data={state}
            columns={columns}
            options={options}
          />
          <MUIDataTable
            title=""
            columns={columnsOutfit}
            data={outfitList}
            options={optionsOutfit}
          />
        </Grid>
      </Grid>
      <form><label>Nome:
      </label>
        <input ref={textInput}/></form>
      <Button type="button" disabled={outfitList.length === 0 } onClick={uploadOutfit}>Carica outfit</Button>
      <Button disabled={outfitList.length === 0} onClick={deleteOutfit}>Elimina outfit</Button>
    </>
  );
}
