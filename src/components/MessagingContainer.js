import {React} from 'react'
import {useCookies} from 'react-cookie'
import { Window,ChannelHeader,MessageList,MessageInput,Thread} from 'stream-chat-react'
import UserList from './UserList'

 function MessagingContainer({users}) {
    const [cookies, setCookies, removeCookies] = useCookies(['user'])

     const logout = () => {
         removeCookies('Name', cookies.Name)
         removeCookies('HashedPassword', cookies.HashedPassword)
         removeCookies('UserId', cookies.UserId)
         removeCookies('AuthToken', cookies.AuthToken)
         window.location.reload()
     }

    return(
        <div className='messaging-container'>
            <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
                <button className='standard-button'onClick={logout}>Log Out</button>
                <UserList users={users} />
            </Window>
            <Thread />
        </div>
    )
}

export default MessagingContainer;