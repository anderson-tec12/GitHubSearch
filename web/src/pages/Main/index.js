import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  handleChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  submit = async (e) => {
    const { newRepo, repositories } = this.state;

    this.setState({ loading: true });
    e.preventDefault();

    const { data } = await api.get(`/repos/${newRepo}`);

    console.log(data);

    const info = {
      name: data.full_name,
    };

    this.setState({
      repositories: [...repositories, info],
      newRepo: '',
      loading: false,
    });

    document.querySelector('#inputSearch').focus();
  };

  render() {
    const { newRepo, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt /> Repositorios
        </h1>

        <Form onSubmit={this.submit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleChange}
            autoFocus
            id="inputSearch"
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
