
import React, { useEffect, useState } from 'react';
import {StreamChat} from 'stream-chat';
import MessagingContainer from './components/MessagingContainer'
import Auth from "./components/Auth"
import Video from './components/Video'
import {
  Chat,
  Channel
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';


const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance('kvjfwedgn6km');

const App = () => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(" ")
  const authToken = false

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: 'dave-matthews',
            name: 'Dave Matthews',
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGF2ZS1tYXR0aGV3cyJ9.JnFNbOrqM6eC7TLPeh0vZgCb7nxat4lHOoJQudeU8Zg',
        )

        const channel = await client.channel("gaming", "gaming-chat-demo", {
          name: "Gaming Chat Demo",
        })
        setChannel(channel)

        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();
  }, []);

  if (!clientReady) return null;

  return (
    <>
      {!authToken && <Auth/>}
      {authToken && <Chat client={client}>
        <Channel channel={channel}>
        <Video/>
        <MessagingContainer/>
        </Channel>
      </Chat>}
    </>
  )
}

export default App;