import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import { makeStyles, withStyles } from "@material-ui/core/styles";


function Product() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/products').then((response) => {
      setProductList(response.data);
    })
  }, [])

  function parseNumber(strg) {
    var strg = strg || "";
    var decimal = '.';
    strg = strg.replace(/[^0-9$.,]/g, '');
    if(strg.indexOf(',') > strg.indexOf('.')) decimal = ',';
    if((strg.match(new RegExp("\\" + decimal,"g")) || []).length > 1) decimal="";
    if (decimal != "" && (strg.length - strg.indexOf(decimal) - 1 == 3) && strg.indexOf("0" + decimal)!==0) decimal = "";
    strg = strg.replace(new RegExp("[^0-9$" + decimal + "]","g"), "");
    strg = strg.replace(',', '.');
    return parseFloat(strg);
  } 

  const updateProduct = (id) => {
    const newPrice = parseNumber(prompt('Novo preço: '));

    Axios.put('http://localhost:3001/edit', {
      newPrice: newPrice,
      id: id,
    });
  }

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  const Refresh = () => {
    window.location.reload();
  }

  const CenteredTextButton = withStyles({
    startIcon: {
      marginLeft: 5
    },
  })(Button);

  return (
    <div>
        <h1>CRUD Frexco</h1>
        <img src={'logo-frexco-slogan.png'} />

        <div className="show">
        <Button
        className="btn btn-add"
        href="/create"
        variant="contained"
        startIcon={<AddIcon />}
        style={{backgroundColor: "#76ff03", 
        color: "#000"}}
        >Novo Produto
        </Button>
          {productList.map((val, key) => {
            return (
              <div className="products">
                <section>
                  <CenteredTextButton
                  className="btn-edit"
                  onClick={() => {updateProduct(val._id); Refresh();}}
                  variant="contained"
                  startIcon={<BuildIcon />}
                  style={{backgroundColor: "#00b0ff", 
                  color: "#000"}}
                  >
                  </CenteredTextButton>
                  <CenteredTextButton
                  className="btn-delete"
                  onClick={() => {deleteProduct(val._id); Refresh();}}
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  style={{backgroundColor: "#ff1744", 
                  color: "#000"}}
                  >
                  </CenteredTextButton>
                </section>
                <p>{val.name} - Preço: {val.price} - Categoria: {val.category}    
                </p>
              </div>
              )
          })}
        </div>
    </div>
  );
}

export default Product;