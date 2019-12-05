import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { IUser, IRepo } from './react-app-env';
import openNewAuthWindow from './openWindow';
import RepoDetail from './RepoDetail';

const App: React.FC = () => {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [repos, setRepos] = useState<IRepo[]>([])
  const [currRepo, setCurrRepo] = useState<number>(0)

  useEffect( () => {
    if (Object.keys(user).length) {
      axios.get(`/api/${user.githubId}/repos`)
      .then(res => {
        setRepos(res.data)
      })
    }
  }, [user])

  function handleLogin(e: React.MouseEvent): void {
    e.preventDefault()
    let message: Promise<IUser> = openNewAuthWindow('/auth/github')
    message.then(ghUser => {
      setUser(ghUser)
    }).catch(err => console.log(err))
  }

  const content = Object.keys(user).length ? <p>User: {user.githubId}</p> : <p>No user</p>  
  const repoData = repos.map((repo, id) => <p key={id} onClick={() => setCurrRepo(id)}>{repo.name}</p> )

  return (
    <div className="App">
      <a href="/auth/github" onClick={handleLogin}>Login to Github</a>
      {content}
      {repoData}
      <RepoDetail repo={Object.keys(user).length ? repos[currRepo] : repos[0] }/>
    </div>
  );
}

export default App;
