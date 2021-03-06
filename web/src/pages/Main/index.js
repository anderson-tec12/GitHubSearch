import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Container, Form, SubmitButton, List } from './styles';

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
    try {
      const { newRepo, repositories } = this.state;

      this.setState({ loading: true });
      e.preventDefault();

      const { data } = await api.get(`/repos/${newRepo}`);

      console.log(data);

      const info = {
        name: data.full_name,
        id: data.id,
      };

      this.setState({
        repositories: [...repositories, info],
        newRepo: '',
        loading: false,
      });

      document.querySelector('#inputSearch').focus();
    } catch (err) {
      this.setState({
        loading: false,
      });

      console.dir(err);
    }
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(oldState, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  render() {
    const { newRepo, loading, repositories } = this.state;

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

        <List>
          {repositories.map((repository) => (
            <li key={repository.id}>
              <span>{repository.name}</span>
              <a href="">Detalhes</a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
