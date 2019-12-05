import React from 'react';
import { RepoDetailProps } from './react-app-env';

const RepoDetail: React.FC<RepoDetailProps> = (props) => {
  let content; 
  if (Object.keys(props.repo).length) {
    content = (
      <div className="App">
        <h1>{props.repo.name}</h1>
        <p>{props.repo.owner.login}</p>
        <p>{props.repo.description}</p>
        <p>{props.repo.is_template}</p>
      </div>
    )
  } else {
    <div className="App">
      <p>No Data</p>
    </div>
  }

  return content;
}

export default RepoDetail;
