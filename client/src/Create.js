import React, { useState } from 'react';
import './Create.css';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Create() {
    const [name, productName] = useState('');
    const [price, productPrice] = useState(0);
    const [category, productCategory] = useState('');

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

    const addToList = () => {
        Axios.post('http://localhost:3001/new', {
          name: name, 
          price: parseNumber(price), 
          category: category
      });
    }

    const Refresh = () => {
        window.location.reload();
    }

    const [menuCategory, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const twoCalls = (e) => {
        // (event) => {productCategory(event.target.value);}
        productCategory(e.target.value);
        handleChange(e);
    }

    return (
    <div className="addForm">
        <h1>Adicionar Produtos</h1>

        <TextField 
        className="input-create"
        id="filled-basic" 
        label="Nome do Produto" 
        variant="filled"
        onChange={(event) => {productName(event.target.value);}} />  

        <TextField 
        className="input-create"
        id="filled-basic" 
        label="Preço do Produto" 
        variant="filled"
        onChange={(event) => {productPrice(event.target.value);}} />  

        <Select
          variant="filled"
          className="selectMenu input-create"
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={twoCalls}
        >
          <MenuItem value="">
            <em>Selecione um</em>
          </MenuItem>
          <MenuItem value={'fruit'}>Fruta</MenuItem>
          <MenuItem value={'vegetable'}>Vegetal</MenuItem>
          <MenuItem value={'dairy'}>Laticínios</MenuItem>
        </Select>
        
        <Button
            className="btn-add"
            onClick={() => {addToList(); Refresh();}}
            variant="contained"
            startIcon={<SaveIcon />}
            style={{backgroundColor: "#76ff03", color: "#000"}}
            >
                Adicionar
        </Button>
        <Button 
            className="btn-products"
            href="/"
            variant="contained"
            startIcon={<ShoppingBasketIcon />}
            style={{backgroundColor: "#00b0ff", color: "#000"}}
            >
                Produtos
        </Button>
    </div>
    )
}

export default Create;