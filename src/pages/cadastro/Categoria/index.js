import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(key, value) {
    setValues({
      ...values,
      [key]: value,
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValue(name, value);
  }

  useEffect(() => {
    console.log('Mudou');
    const URL = 'http://localhost:8080/categorias';
    fetch(URL)
      .then(async (response) => {
        const resposta = await response.json();
        setCategorias([
          ...resposta,
        ]);
      });

    // setTimeout(() => {
    //   setCategorias([
    //     ...categorias,
    //     {
    //       id: 1,
    //       nome: 'Heavy Metal',
    //       descricao: 'Gênero heavy',
    //       cor: '#6bd1ff',
    //     },
    //     {
    //       id: 2,
    //       nome: 'Indie',
    //       descricao: 'Gênero indie',
    //       cor: '#d16bff',
    //     },
    //     {
    //       id: 3,
    //       nome: 'Punk Rock',
    //       descricao: 'Gênero punk',
    //       cor: '#ffd16c',
    //     },
    //   ]);
    // }, 3 * 1000);
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria :
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(info) {
        info.preventDefault();

        setCategorias([
          ...categorias,
          values,
        ]);

        setValues(valoresIniciais);
      }}
      >

        <FormField
          label="Nome da Categoria: "
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição: "
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor: "
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
      <div>
        Loading ...
      </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.nome}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
