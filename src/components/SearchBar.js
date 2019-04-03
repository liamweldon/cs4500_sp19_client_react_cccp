import React from 'react';
import { render } from 'react-dom';

const Result = ({results}) => {
  return results.map(serv => <div className="serviceRow" key={serv.id}>
    <div>
      <div className="row">
        <div className="col-5">
          <a href={"/admin/services/" + serv.id}>{serv.serviceName}</a>
        </div>
      </div>
    </div>
  </div>);
}

const Search = (props) => {
  const {
    nameQuery,
    zipQuery,
    search,
    service,
    eventHandlers
  } = props;

  return <div>
    <div className="input-group input-group-lg">
        <input
            placeholder="Search for providers"
            type="text"
            className="form-control"
            name="providerSearchTerm"
            value={nameQuery}
            onChange={eventHandlers.onNameQueryChange}/>
        <input
            placeholder="Zip code"
            type="text"
            className="form-control"
            name="zipSearchTerm"
            value={zipQuery}
            onChange={eventHandlers.onZipQueryChange}/>
        <div className="input-group-append">
            <button
                onClick={search}
                className="btn btn-primary"
                type="button">
                Search
            </button>
        </div>
    </div>
  </div>;
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.serviceService = this.props.service;
    this.state = {
      nameQuery: '',
      zipQuery: '',
      results: [],
      service: props.service
    }

    this.onNameQueryChange = this.onNameQueryChange.bind(this);
    this.onZipQueryChange = this.onZipQueryChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onNameQueryChange(e) {
    this.setState({nameQuery: e.target.value});
  }

  onZipQueryChange(e) {
    this.setState({zipQuery: e.target.value});
  }

  onSearch() {
    var nameQuery = this.state.nameQuery;
    var zipQuery = this.state.zipQuery;
    this.serviceService.findAllServices().then(services =>
      this.setState({results: services.filter(function (s) {
        return s.serviceName.toUpperCase().includes(nameQuery.toUpperCase())
      })})
    );
  }

  render() {
    const {results, searchQuery} = this.state;

    const eventHandlers = {
      onNameQueryChange: this.onNameQueryChange,
      onZipQueryChange: this.onZipQueryChange
    }

    return <div>
      <Search
        nameQuery={this.state.nameQuery}
        zipQuery={this.state.zipQuery}
        search={this.onSearch}
        eventHandlers={eventHandlers}
      />
      <Result results={results} />
    </div>;
  }
}

export default SearchBar
