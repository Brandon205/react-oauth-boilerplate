import { IUser } from './react-app-env';

// From https://gist.github.com/gauravtiwari/2ae9f44aee281c759fe5a66d5c2721a2
// By https://gist.github.com/gauravtiwari
// Also, from this article: https://medium.com/front-end-weekly/use-github-oauth-as-your-sso-seamlessly-with-react-3e2e3b358fa1
function openNewAuthWindow(myUrl:string): Promise<IUser> {
  const authWindow: Window = window.open(myUrl, '_blank') as Window
  // Listen for messages from auth window
  const authPromise: Promise<IUser> = new Promise((resolve, reject) => {
    // Add listeneron original window for message from second
    window.addEventListener('message', (msg) => {
      // Reject if not from our domain
      if (!msg.origin.includes(`${window.location.protocol}//${window.location.host}`)) {
        authWindow.close()
        reject('Not allowed')
      }
      // Try to resolve the data in some way
      if (msg.data.payload) {
        try {
          resolve(JSON.parse(msg.data.payload))
        }
        catch(err) {
          resolve(msg.data.payload)
        }
        finally {
          authWindow.close()
        }
      } else {
        // No msg.data.payload was present
        authWindow.close()
        reject('Probably Unauthorized')
      }
    }, false)
  })
  return authPromise
}

export default openNewAuthWindow;
